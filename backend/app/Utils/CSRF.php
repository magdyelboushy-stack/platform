<?php

namespace App\Utils;

/**
 * CSRF Protection
 * Prevents Cross-Site Request Forgery
 */
class CSRF {
    private const TOKEN_LENGTH = 32;
    private const SESSION_KEY = 'csrf_token';
    
    /**
     * Generate new CSRF Token
     */
    public static function generate() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $token = bin2hex(random_bytes(self::TOKEN_LENGTH));
        $_SESSION[self::SESSION_KEY] = $token;
        
        return $token;
    }
    
    /**
     * Get current Token
     */
    public static function get() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION[self::SESSION_KEY])) {
            return self::generate();
        }
        
        return $_SESSION[self::SESSION_KEY];
    }
    
    /**
     * Validate Token
     */
    public static function validate($token) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION[self::SESSION_KEY])) {
            return false;
        }
        
        // Use hash_equals to prevent timing attacks
        return hash_equals($_SESSION[self::SESSION_KEY], $token);
    }
    
    /**
     * Generate HTML input field
     */
    public static function field() {
        $token = self::get();
        return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars($token) . '">';
    }
    
    /**
     * Generate meta tag
     */
    public static function metaTag() {
        $token = self::get();
        return '<meta name="csrf-token" content="' . htmlspecialchars($token) . '">';
    }
}
