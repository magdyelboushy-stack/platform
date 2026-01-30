<?php

namespace App\Controllers\Admin;

use App\Core\BaseController;
use App\Models\Course;
use App\Utils\SecureSession;
use App\Utils\AuditLogger;

class CoursesController extends BaseController {
    private $courseModel;

    public function __construct() {
        $this->courseModel = new Course();
    }

    /**
     * Check authorization
     */
    private function authorize() {
        $role = SecureSession::get('role');
        if (!in_array($role, ['admin', 'teacher', 'assistant'])) {
            error_log("AUTH_403: Access denied for role: " . ($role ?: 'NULL'));
            $this->json(['error' => 'غير مصرح'], 403);
        }
    }

    /**
     * List all courses
     */
    public function index() {
        $this->authorize();

        try {
            $filters = [];
            $role = SecureSession::get('role');

            // Teachers only see their own courses
            if ($role === 'teacher') {
                $filters['teacher_id'] = SecureSession::get('user_id');
            }

            $courses = $this->courseModel->getAll($filters);

            // Format for frontend
            $formatted = array_map(function($c) {
                return [
                    'id' => $c['id'],
                    'title' => $c['title'],
                    'description' => $c['description'],
                    'thumbnail' => $c['thumbnail'],
                    'price' => (float) $c['price'],
                    'educationStage' => $c['education_stage'],
                    'gradeLevel' => $c['grade_level'],
                    'status' => $c['status'],
                    'teacherName' => $c['teacher_name'],
                    'enrollmentCount' => (int) $c['enrollment_count'],
                    'createdAt' => $c['created_at']
                ];
            }, $courses);

            $this->json($formatted);
        } catch (\Exception $e) {
            error_log("Courses list error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ في جلب الكورسات'], 500);
        }
    }

    /**
     * Create a new course
     */
    public function store() {
        $this->authorize();

        $input = $this->getInput();

        // Validate required fields
        $required = ['title', 'education_stage', 'grade_level'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                $this->json(['error' => "الحقل $field مطلوب"], 400);
            }
        }

        try {
            $data = [
                'title' => trim($input['title']),
                'description' => $input['description'] ?? '',
                'price' => $input['price'] ?? 0,
                'education_stage' => $input['education_stage'],
                'grade_level' => $input['grade_level'],
                'status' => $input['status'] ?? 'draft',
                'teacher_id' => SecureSession::get('user_id')
            ];

            $courseId = $this->courseModel->create($data);

            AuditLogger::log(
                SecureSession::get('user_id'),
                'create_course',
                'courses',
                $courseId
            );

            $this->json([
                'message' => 'تم إنشاء الكورس بنجاح',
                'id' => $courseId
            ], 201);
        } catch (\Exception $e) {
            error_log("Course creation error: " . $e->getMessage());
            $this->json(['error' => 'فشل إنشاء الكورس'], 500);
        }
    }

    /**
     * Get single course with content
     */
    public function show($params) {
        $this->authorize();

        $id = $params['id'] ?? null;
        if (!$id) {
            $this->json(['error' => 'معرف الكورس مطلوب'], 400);
        }

        try {
            $course = $this->courseModel->getWithContent($id);

            if (!$course) {
                $this->json(['error' => 'الكورس غير موجود'], 404);
            }

            $this->json($course);
        } catch (\Exception $e) {
            error_log("Course show error: " . $e->getMessage());
            $this->json(['error' => 'حدث خطأ'], 500);
        }
    }

    /**
     * Update course
     */
    public function update($params) {
        $this->authorize();

        $id = $params['id'] ?? null;
        if (!$id) {
            $this->json(['error' => 'معرف الكورس مطلوب'], 400);
        }

        $input = $this->getInput();

        try {
            $data = [];
            $allowed = ['title', 'description', 'thumbnail', 'intro_video_url', 'price', 'education_stage', 'grade_level', 'status'];

            foreach ($allowed as $field) {
                if (isset($input[$field])) {
                    $data[$field] = $input[$field];
                }
            }

            if (empty($data)) {
                $this->json(['error' => 'لا توجد بيانات للتحديث'], 400);
            }

            $this->courseModel->update($id, $data);

            AuditLogger::log(
                SecureSession::get('user_id'),
                'update_course',
                'courses',
                $id
            );

            $this->json(['message' => 'تم تحديث الكورس بنجاح']);
        } catch (\Exception $e) {
            error_log("Course update error: " . $e->getMessage());
            $this->json(['error' => 'فشل تحديث الكورس'], 500);
        }
    }

    /**
     * Delete course
     */
    public function delete($params) {
        $this->authorize();

        $id = $params['id'] ?? null;
        if (!$id) {
            $this->json(['error' => 'معرف الكورس مطلوب'], 400);
        }

        try {
            $this->courseModel->delete($id);

            AuditLogger::log(
                SecureSession::get('user_id'),
                'delete_course',
                'courses',
                $id
            );

            $this->json(['message' => 'تم حذف الكورس بنجاح']);
        } catch (\Exception $e) {
            error_log("Course delete error: " . $e->getMessage());
            $this->json(['error' => 'فشل حذف الكورس'], 500);
        }
    }
}
