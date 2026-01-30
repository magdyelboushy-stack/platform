<?php

namespace App\Controllers\Admin;

use App\Core\BaseController;
use App\Models\User;
use App\Utils\SecureSession;
use App\Utils\AuditLogger;
use App\Utils\Validator;

class AssistantsController extends BaseController {
    protected $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    /**
     * Helper to verify if user has management permissions
     * Only Admin and Teacher roles allowed to manage assistants
     */
    protected function authorize() {
        if (!SecureSession::get('user_id')) {
            $this->json(['error' => 'يجب تسجيل الدخول'], 401);
        }

        $role = SecureSession::get('role');
        $allowedRoles = ['admin', 'teacher'];

        if (!in_array($role, $allowedRoles)) {
            $this->json(['error' => 'ليس لديك صلاحية لإدارة المساعدين'], 403);
        }
    }

    /**
     * List all assistants
     */
    public function index() {
        $this->authorize();

        try {
            $stmt = $this->userModel->getDb()->prepare(
                "SELECT id, name, email, phone, permissions, status, created_at, avatar
                 FROM users 
                 WHERE role = 'assistant'
                 ORDER BY created_at DESC"
            );
            $stmt->execute();
            $assistants = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Decode permissions JSON
            $formatted = array_map(function($a) {
                return [
                    'id' => $a['id'],
                    'name' => $a['name'],
                    'email' => $a['email'],
                    'phone' => $a['phone'],
                    'role' => 'مساعد', // Display label
                    'status' => $a['status'],
                    'permissions' => json_decode($a['permissions'] ?? '[]', true),
                    'createdAt' => $a['created_at'],
                    'avatar' => $a['avatar']
                ];
            }, $assistants);

            $this->json($formatted);
        } catch (\PDOException $e) {
            error_log("Assistants listing error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ في جلب قائمة المساعدين'], 500);
        }
    }

    /**
     * Create a new assistant
     */
    public function create() {
        $this->authorize();

        $data = $this->getInput();
        
        // Basic Validation
        if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['phone'])) {
            $this->json(['error' => 'جميع الحقول المطلوبة يجب ملؤها'], 400);
        }

        // Email Uniqueness Check
        if ($this->userModel->findByEmail($data['email'])) {
            $this->json(['error' => 'البريد الإلكتروني مستخدم بالفعل'], 409);
        }

        try {
            // Prepare Assistant Data
            $assistantData = [
                'name' => htmlspecialchars(strip_tags($data['name'])),
                'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
                'phone' => htmlspecialchars(strip_tags($data['phone'])),
                'password' => $data['password'], // Will be hashed in model
                'role' => 'assistant',
                'status' => 'active', // Auto-active
                'permissions' => json_encode($data['permissions'] ?? []),
                'avatar' => 'default_avatar.png'
            ];

            $newId = $this->userModel->create($assistantData);

            if ($newId) {
                AuditLogger::log(SecureSession::get('user_id'), 'create_assistant', 'users', $newId);
                $this->json(['message' => 'تم إضافة المساعد بنجاح', 'id' => $newId], 201);
            } else {
                $this->json(['error' => 'فشل إنشاء الحساب'], 500);
            }

        } catch (\Exception $e) {
            error_log("Create assistant error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ أثناء إضافة المساعد'], 500);
        }
    }

    /**
     * Update an assistant
     */
    public function update($params) {
        $this->authorize();
        $id = $params['id'] ?? null;
        $data = $this->getInput();

        if (!$id) {
            $this->json(['error' => 'رقم المعرف مفقود'], 400);
        }

        // Basic Validation
        if (empty($data['name']) || empty($data['email']) || empty($data['phone'])) {
            $this->json(['error' => 'جميع الحقول المطلوبة يجب ملؤها'], 400);
        }

        // SECURITY FIX: Verify target is actually an assistant (Prevent IDOR)
        $targetUser = $this->userModel->find($id);
        if (!$targetUser || $targetUser['role'] !== 'assistant') {
            $this->json(['error' => 'المستخدم غير موجود أو ليس مساعد'], 404);
        }

        // Email Uniqueness Check (Exclude current user)
        $existingUser = $this->userModel->findByEmail($data['email']);
        if ($existingUser && $existingUser['id'] != $id) {
            $this->json(['error' => 'البريد الإلكتروني مستخدم بالفعل'], 409);
        }

        try {
            // Prepare Update Data
            $updateData = [
                'name' => htmlspecialchars(strip_tags($data['name'])),
                'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
                'phone' => htmlspecialchars(strip_tags($data['phone'])),
                'permissions' => json_encode($data['permissions'] ?? []),
            ];

            // Only update password if provided (Model will hash it)
            if (!empty($data['password'])) {
                $updateData['password'] = $data['password'];
            }

            $this->userModel->update($id, $updateData);
            
            AuditLogger::log(SecureSession::get('user_id'), 'update_assistant', 'users', $id);
            $this->json(['message' => 'تم تحديث بيانات المساعد بنجاح']);

        } catch (\Exception $e) {
            error_log("Update assistant error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ أثناء تحديث المساعد'], 500);
        }
    }
    public function delete($params) {
        $this->authorize();
        $id = $params['id'] ?? null;

        if (!$id) {
            $this->json(['error' => 'رقم المعرف مفقود'], 400);
        }

        try {
            // Prevent deleting self (just in case)
            if ($id === SecureSession::get('user_id')) {
                $this->json(['error' => 'لا يمكن حذف حسابك الحالي'], 400);
            }

            // Ensure target is actually an assistant
            $targetUser = $this->userModel->find($id);
            if (!$targetUser || $targetUser['role'] !== 'assistant') {
                $this->json(['error' => 'المستخدم غير موجود أو ليس مساعد'], 404);
            }

            $result = $this->userModel->delete($id);

            if ($result) {
                AuditLogger::log(SecureSession::get('user_id'), 'delete_assistant', 'users', $id);
                $this->json(['message' => 'تم حذف المساعد بنجاح']);
            } else {
                $this->json(['error' => 'فشل حذف المساعد'], 500);
            }
        } catch (\Exception $e) {
            error_log("Delete assistant error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ أثناء الحذف'], 500);
        }
    }
}
