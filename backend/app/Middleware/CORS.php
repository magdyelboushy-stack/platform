<?php

namespace App\Middleware;

/**
 * CORS Middleware
 * Manages Cross-Origin Resource Sharing
 */
class CORS {
    
    public static function apply() {
        $allowedOrigins = explode(',', $_ENV['ALLOWED_ORIGINS'] ?? '*');
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        
        // Allow specific origins
        if (in_array($origin, $allowedOrigins) || in_array('*', $allowedOrigins)) {
            header("Access-Control-Allow-Origin: " . ($origin ?: '*'));
        }
        
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Max-Age: 86400");
        
        // Handle OPTIONS requests (Preflight)
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
}
