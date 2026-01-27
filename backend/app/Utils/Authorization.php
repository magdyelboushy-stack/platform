<?php

namespace App\Utils;

/**
 * Authorization Manager
 * Solves IDOR vulnerabilities
 */
class Authorization {
    
    /**
     * Check access permission
     */
    public static function canAccess($currentUserId, $resourceUserId, $resourceType = 'user') {
        if (!$currentUserId) {
            throw new \Exception("Unauthorized: Please login");
        }
        
        // User can access their own data
        if ($currentUserId === $resourceUserId) {
            return true;
        }
        
        // Check Admin permissions
        if (self::isAdmin($currentUserId)) {
            return true;
        }
        
        // Check Teacher permissions (can only see enrolled students)
        if ($resourceType === 'student' && self::isTeacher($currentUserId)) {
            return self::isStudentEnrolled($currentUserId, $resourceUserId);
        }
        
        throw new \Exception("Unauthorized access denied");
    }
    
    /**
     * Check if user is admin
     */
    public static function isAdmin($userId) {
        $db = \App\Config\Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT role FROM users WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch();
        
        return $user && $user['role'] === 'admin';
    }
    
    /**
     * Check if user is teacher
     */
    public static function isTeacher($userId) {
        $db = \App\Config\Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT role FROM users WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch();
        
        return $user && $user['role'] === 'teacher';
    }
    
    /**
     * Check if student is enrolled in teacher's course
     */
    private static function isStudentEnrolled($teacherId, $studentId) {
        // Add course enrollment logic here
        // For now, return false to be safe
        return false;
    }
}
