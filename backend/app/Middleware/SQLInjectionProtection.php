<?php

namespace App\Middleware;

/**
 * SQL Injection Protection
 * Additional protection against SQL Injection
 */
class SQLInjectionProtection {
    
    private static $patterns = [
        '/(\s|^)(union|select|insert|update|delete|drop|create|alter|exec|execute|script|javascript|eval)(\s|$)/i',
        '/(\s|^)(and|or)(\s+)\d+(\s*)=(\s*)\d+/i',
        "/(\'|\")(\s*)(union|select|insert|update|delete)/i",
        '/\/\*.*?\*\//s',
        '/--.*$/m',
        '/#.*$/m',
        '/;(\s*)$/m'
    ];
    
    public static function check($data) {
        if (is_array($data)) {
            foreach ($data as $value) {
                if (!self::check($value)) {
                    return false;
                }
            }
            return true;
        }
        
        if (!is_string($data)) {
            return true;
        }
        
        foreach (self::$patterns as $pattern) {
            if (preg_match($pattern, $data)) {
                error_log("Potential SQL Injection detected: " . $data);
                return false;
            }
        }
        
        return true;
    }
    
    public static function sanitize($data) {
        if (is_array($data)) {
            return array_map([self::class, 'sanitize'], $data);
        }
        
        if (!is_string($data)) {
            return $data;
        }
        
        // Remove dangerous SQL keywords
        $data = preg_replace(self::$patterns, '', $data);
        
        return $data;
    }
}
