<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Utils\SecureSession;
use App\Config\Database;

class ProgressController extends BaseController {
    
    /**
     * Mark a lesson as completed for the current user
     */
    public function complete($params) {
        SecureSession::start();
        $userId = SecureSession::get('user_id');
        $lessonId = $params['id'] ?? null;

        if (!$userId) {
            $this->json(['error' => 'يجب تسجيل الدخول أولاً'], 401);
        }

        try {
            $db = Database::getInstance()->getConnection();

            // 1. Verify access: must be enrolled OR it's a matching free course
            // Get course info for this lesson
            $sql = "SELECT c.id, c.price, c.education_stage, c.grade_level 
                    FROM courses c 
                    JOIN course_sections s ON c.id = s.course_id 
                    JOIN lessons l ON s.id = l.section_id 
                    WHERE l.id = :lid";
            $stmt = $db->prepare($sql);
            $stmt->execute(['lid' => $lessonId]);
            $course = $stmt->fetch(\PDO::FETCH_ASSOC);

            if (!$course) {
                $this->json(['error' => 'الدرس غير موجود'], 404);
            }

            $userRole = SecureSession::get('role');
            $userStage = strtolower(SecureSession::get('education_stage') ?? '');
            $userGrade = \App\Utils\GradeNormalizer::normalize(SecureSession::get('grade_level'));

            $courseStage = strtolower($course['education_stage'] ?? '');
            $courseGrade = \App\Utils\GradeNormalizer::normalize($course['grade_level']);

            $isAllowed = false;
            if ($userRole === 'admin' || $userRole === 'teacher' || $userRole === 'assistant') {
                $isAllowed = true;
            } else {
                // Check if it's a free matching course
                if ((float)$course['price'] <= 0 && $userStage === $courseStage && $userGrade === $courseGrade) {
                    $isAllowed = true;
                } else {
                    // Check enrollment table
                    $stmt = $db->prepare("SELECT id FROM enrollments WHERE user_id = :u AND course_id = :c AND status = 'active'");
                    $stmt->execute(['u' => $userId, 'c' => $course['id']]);
                    if ($stmt->fetch()) {
                        $isAllowed = true;
                    }
                }
            }

            if (!$isAllowed) {
                $this->json(['error' => 'غير مصرح لك بالوصول لهذا المحتوى. يرجى التأكد من الاشتراك أو أن الكورس مخصص لصفك الدراسي.'], 403);
            }
            
            // 2. Record progress
            $id = $this->generateUuid();
            $now = date('Y-m-d H:i:s');

            $sql = "INSERT INTO lesson_progress (id, user_id, lesson_id, completed, completed_at) 
                    VALUES (:id, :uid, :lid, 1, :now)
                    ON DUPLICATE KEY UPDATE completed = 1, completed_at = :now2";
            
            $stmt = $db->prepare($sql);
            $stmt->execute([
                'id' => $id,
                'uid' => $userId,
                'lid' => $lessonId,
                'now' => $now,
                'now2' => $now
            ]);

            // 3. Recalculate overall course progress
            $courseId = $course['id'];
            
            // Total lessons in course
            $stmt = $db->prepare("SELECT COUNT(*) FROM lessons l JOIN course_sections s ON l.section_id = s.id WHERE s.course_id = :cid");
            $stmt->execute(['cid' => $courseId]);
            $totalLessons = (int) $stmt->fetchColumn();

            if ($totalLessons > 0) {
                // Completed lessons by this user in this course
                $stmt = $db->prepare("SELECT COUNT(DISTINCT lp.lesson_id) 
                                     FROM lesson_progress lp 
                                     JOIN lessons l ON lp.lesson_id = l.id 
                                     JOIN course_sections s ON l.section_id = s.id 
                                     WHERE lp.user_id = :uid AND s.course_id = :cid AND lp.completed = 1");
                $stmt->execute(['uid' => $userId, 'cid' => $courseId]);
                $completedCount = (int) $stmt->fetchColumn();

                $percent = round(($completedCount / $totalLessons) * 100);

                // Update enrollments table
                $stmt = $db->prepare("UPDATE enrollments SET progress_percent = :p, last_accessed_at = :now WHERE user_id = :uid AND course_id = :cid");
                $stmt->execute([
                    'p' => $percent,
                    'now' => $now,
                    'uid' => $userId,
                    'cid' => $courseId
                ]);
            }

            $this->json([
                'message' => 'تم إكمال الدرس بنجاح',
                'progressProgress' => $percent ?? 0
            ]);
        } catch (\Exception $e) {
            error_log("Progress update error: " . $e->getMessage());
            $this->json(['error' => 'فشل تحديث التقدم'], 500);
        }
    }

    /**
     * Update current playback timestamp
     */
    public function updateTimestamp($params) {
        SecureSession::start();
        $userId = SecureSession::get('user_id');
        $lessonId = $params['id'] ?? null;
        $seconds = (int) ($_POST['seconds'] ?? 0);

        if (!$userId || !$lessonId) {
            $this->json(['error' => 'Unauthorized or missing data'], 401);
        }

        try {
            $db = Database::getInstance()->getConnection();
            $id = $this->generateUuid();

            $sql = "INSERT INTO lesson_progress (id, user_id, lesson_id, watched_seconds) 
                    VALUES (:id, :uid, :lid, :sec)
                    ON DUPLICATE KEY UPDATE watched_seconds = :sec2";
            
            $stmt = $db->prepare($sql);
            $stmt->execute([
                'id' => $id,
                'uid' => $userId,
                'lid' => $lessonId,
                'sec' => $seconds,
                'sec2' => $seconds
            ]);

            $this->json(['status' => 'success']);
        } catch (\Exception $e) {
            $this->json(['error' => $e->getMessage()], 500);
        }
    }

    private function generateUuid() {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
