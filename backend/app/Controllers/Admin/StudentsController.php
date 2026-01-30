<?php

namespace App\Controllers\Admin;

use App\Core\BaseController;
use App\Models\User;
use App\Utils\SecureSession;
use App\Utils\AuditLogger;

class StudentsController extends BaseController {
    protected $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    /**
     * Helper to verify if user has management permissions
     */
    protected function authorize($requiredPermission = null) {
        $userId = SecureSession::get('user_id');
        if (!$userId) {
            $this->json(['error' => 'يجب تسجيل الدخول'], 401);
        }

        $role = SecureSession::get('role');
        $allowedRoles = ['admin', 'teacher', 'assistant'];

        if (!in_array($role, $allowedRoles)) {
            $this->json(['error' => 'ليس لديك صلاحية للقيام بهذا الإجراء'], 403);
        }

        // assistant check for specific permission
        if ($role === 'assistant' && $requiredPermission) {
            $user = $this->userModel->find($userId);
            $permissions = json_decode($user['permissions'] ?? '[]', true);
            if (!in_array($requiredPermission, $permissions)) {
                $this->json(['error' => 'ليس لديك صلاحية ' . $requiredPermission], 403);
            }
        }
    }

    /**
     * List all active students
     */
    public function listActive() {
        $this->authorize(); // Any staff can see the list

        try {
            $stmt = $this->userModel->getDb()->prepare(
                "SELECT id, name, email, phone, grade_level, education_stage, 
                        governorate, city, gender, birth_date, avatar, created_at,
                        guardian_name, parent_phone, status
                 FROM users 
                 WHERE role = 'student'
                 ORDER BY name ASC"
            );
            $stmt->execute();
            $students = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Format for frontend consistency
            $formatted = array_map(function($s) {
                return [
                    'id' => $s['id'],
                    'name' => $s['name'],
                    'email' => $s['email'],
                    'phone' => $s['phone'],
                    'gradeLevel' => $s['grade_level'],
                    'educationStage' => $s['education_stage'],
                    'governorate' => $s['governorate'],
                    'city' => $s['city'],
                    'gender' => $s['gender'],
                    'birthDate' => $s['birth_date'],
                    'avatar' => $s['avatar'],
                    'guardianName' => $s['guardian_name'],
                    'parentPhone' => $s['parent_phone'],
                    'status' => $s['status'], // Added status
                    'joinedAt' => date('Y-m-d', strtotime($s['created_at']))
                ];
            }, $students);

            $this->json($formatted);
        } catch (\PDOException $e) {
            error_log("Students listing error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ في جلب بيانات الطلاب'], 500);
        }
    }

    /**
     * Update student status
     */
    public function updateStatus($params) {
        $this->authorize('students');
        
        $id = $params['id'] ?? null;
        $data = $this->getInput();
        $status = $data['status'] ?? null;

        if (!$id || !$status) {
            $this->json(['error' => 'بيانات غير مكتملة'], 400);
        }

        if (!in_array($status, ['active', 'blocked', 'pending'])) {
            $this->json(['error' => 'حالة غير صالحة'], 400);
        }

        try {
            // Verify target is a student
            $target = $this->userModel->find($id);
            if (!$target || $target['role'] !== 'student') {
                $this->json(['error' => 'الطالب غير موجود'], 404);
            }

            $this->userModel->update($id, ['status' => $status]);
            
            AuditLogger::log(SecureSession::get('user_id'), 'update_student_status', 'users', $id, null, ['new_status' => $status]);
            
            $this->json(['message' => 'تم تحديث حالة الطالب بنجاح']);
        } catch (\Exception $e) {
            error_log("Update student status error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ أثناء تحديث الحالة'], 500);
        }
    }

    /**
     * Delete student
     */
    public function delete($params) {
        $this->authorize('students');
        
        $id = $params['id'] ?? null;

        if (!$id) {
            $this->json(['error' => 'رقم المعرف مفقود'], 400);
        }

        try {
            // Verify target is a student
            $target = $this->userModel->find($id);
            if (!$target || $target['role'] !== 'student') {
                $this->json(['error' => 'الطالب غير موجود'], 404);
            }

            $this->userModel->delete($id);
            
            AuditLogger::log(SecureSession::get('user_id'), 'delete_student', 'users', $id);
            
            $this->json(['message' => 'تم حذف حساب الطالب بنجاح']);
        } catch (\Exception $e) {
            error_log("Delete student error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ أثناء الحذف'], 500);
        }
    }

    /**
     * Update student profile data
     */
    public function update($params) {
        $this->authorize('students');
        
        $id = $params['id'] ?? null;
        $data = $this->getInput();

        if (!$id) {
            $this->json(['error' => 'رقم المعرف مفقود'], 400);
        }

        try {
            // Verify target is a student
            $target = $this->userModel->find($id);
            if (!$target || $target['role'] !== 'student') {
                $this->json(['error' => 'الطالب غير موجود'], 404);
            }

            // Security: Prevent updating role/status via this endpoint
            unset($data['role']);
            unset($data['status']);
            unset($data['password']);

            $this->userModel->update($id, $data);
            
            AuditLogger::log(SecureSession::get('user_id'), 'update_student_profile', 'users', $id, null, $data);
            
            $this->json(['message' => 'تم تحديث بيانات الطالب بنجاح']);
        } catch (\Exception $e) {
            error_log("Update student profile error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ أثناء تحديث البيانات'], 500);
        }
    }

    /**
     * Get statistics for gender distribution and stages
     */
    public function getStats() {
        $this->authorize();

        try {
            $db = $this->userModel->getDb();

            // Gender Distribution
            $genderStmt = $db->prepare(
                "SELECT gender, COUNT(*) as count 
                 FROM users 
                 WHERE role = 'student' AND status = 'active'
                 GROUP BY gender"
            );
            $genderStmt->execute();
            $genderData = $genderStmt->fetchAll(\PDO::FETCH_ASSOC);

            // Stage Distribution
            $stageStmt = $db->prepare(
                "SELECT education_stage, COUNT(*) as count 
                 FROM users 
                 WHERE role = 'student' AND status = 'active'
                 GROUP BY education_stage"
            );
            $stageStmt->execute();
            $stageData = $stageStmt->fetchAll(\PDO::FETCH_ASSOC);

            // Governorate Distribution (New)
            $govStmt = $db->prepare(
                "SELECT governorate, COUNT(*) as count 
                 FROM users 
                 WHERE role = 'student' AND status = 'active'
                 GROUP BY governorate
                 ORDER BY count DESC
                 LIMIT 5"
            );
            $govStmt->execute();
            $govData = $govStmt->fetchAll(\PDO::FETCH_ASSOC);

            // City Distribution (New)
            $cityStmt = $db->prepare(
                "SELECT city, COUNT(*) as count 
                 FROM users 
                 WHERE role = 'student' AND status = 'active'
                 GROUP BY city
                 ORDER BY count DESC
                 LIMIT 5"
            );
            $cityStmt->execute();
            $cityData = $cityStmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->json([
                'gender' => $genderData,
                'stages' => $stageData,
                'governorates' => $govData,
                'cities' => $cityData,
                'total' => array_sum(array_column($genderData, 'count'))
            ]);
        } catch (\PDOException $e) {
            error_log("Students stats error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ في جلب الإحصائيات'], 500);
        }
    }
}
