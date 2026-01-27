<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Utils\SecureSession;

class FileController extends BaseController {

    public function serve($params) {
        // 1. Auth Check (Must be logged in)
        SecureSession::start();
        if (!SecureSession::get('user_id')) {
            http_response_code(403);
            die('Access Denied');
        }

        // 2. Validate Params
        $type = $params['type'] ?? ''; // 'avatars' or 'documents'
        $filename = $params['filename'] ?? '';

        // Allow only specific types
        if (!in_array($type, ['avatars', 'documents'])) {
            http_response_code(400);
            die('Invalid file type');
        }

        // sanitize filename
        $filename = basename($filename);

        // 3. Resolve Path
        $path = __DIR__ . '/../../storage/' . $type . '/' . $filename;
        $realPath = realpath($path);

        // 4. Security Check (Normalized for Windows)
        $storageRoot = realpath(__DIR__ . '/../../storage/');
        $normalizedPath = str_replace('\\', '/', $realPath);
        $normalizedRoot = str_replace('\\', '/', $storageRoot);
        
        if (!$realPath || !file_exists($realPath) || strpos($normalizedPath, $normalizedRoot) !== 0) {
            error_log("File Auth Failure: Path: $normalizedPath, Expected Start: $normalizedRoot");
            http_response_code(404);
            die('File not found');
        }

        // 5. Authorization Logic (Optional Enhancement: Check if user owns the file)
        // For now, any logged-in user can view avatars (needed for profiles).
        // Documents ideally should be restricted to Owner/Admin.
        // We will keep it simple: Logged In = Access for now, can refine later.

        // 6. Serve File
        $mime = mime_content_type($realPath);
        header('Content-Type: ' . $mime);
        header('Content-Length: ' . filesize($realPath));
        // Cache control
        header('Cache-Control: private, max-age=86400'); 
        
        readfile($realPath);
        exit;
    }
}
