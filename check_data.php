<?php
require 'backend/vendor/autoload.php';

use App\Config\Database;
use Dotenv\Dotenv;

try {
    $dotenv = Dotenv\Dotenv::createImmutable('backend');
    $dotenv->safeLoad();

    $db = Database::getInstance()->getConnection();

    echo "=== RECENT ENROLLMENTS ===\n";
    $stmt = $db->query("SELECT e.*, u.name as user_name, c.title as course_title 
                        FROM enrollments e 
                        JOIN users u ON e.user_id = u.id 
                        JOIN courses c ON e.course_id = c.id 
                        ORDER BY e.enrolled_at DESC LIMIT 5");
    $enrolls = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($enrolls);

    echo "\n=== RECENT LESSON PROGRESS ===\n";
    $stmt = $db->query("SELECT lp.*, u.name as user_name, l.title as lesson_title 
                        FROM lesson_progress lp 
                        JOIN users u ON lp.user_id = u.id 
                        JOIN lessons l ON lp.lesson_id = l.id 
                        ORDER BY lp.completed_at DESC, lp.id DESC LIMIT 5");
    $progress = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($progress);

} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
