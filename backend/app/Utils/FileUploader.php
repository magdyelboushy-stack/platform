<?php

namespace App\Utils;

class FileUploader {
    private $targetDir;
    private $allowedTypes;
    private $allowedMimeTypes;
    private $maxSize;

    // Allowed MIME types per extension
    private const MIME_TYPES = [
        'jpg' => ['image/jpeg', 'image/pjpeg'],
        'jpeg' => ['image/jpeg', 'image/pjpeg'],
        'png' => ['image/png'],
        'pdf' => ['application/pdf'],
        'gif' => ['image/gif'],
    ];

    public function __construct($subDir = 'uploads', $allowedTypes = ['jpg', 'jpeg', 'png', 'pdf'], $maxSize = 5242880) {
        // Sanitize directory name to prevent Path Traversal
        $subDir = $this->sanitizeDirectoryName($subDir);
        
        // Secure Storage Path (Outside Public Root)
        $this->targetDir = realpath(__DIR__ . '/../../') . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . $subDir;
        $this->allowedTypes = array_map('strtolower', $allowedTypes);
        $this->maxSize = $maxSize;

        // Build allowed MIME types list
        $this->allowedMimeTypes = [];
        foreach ($this->allowedTypes as $type) {
            if (isset(self::MIME_TYPES[$type])) {
                $this->allowedMimeTypes = array_merge(
                    $this->allowedMimeTypes, 
                    self::MIME_TYPES[$type]
                );
            }
        }

        if (!is_dir($this->targetDir)) {
            mkdir($this->targetDir, 0755, true); // 0755 instead of 0777 for security
        }
    }

    public function upload($file, $filenamePrefix = '') {
        // 1. Check if file exists and no upload error
        if (!isset($file['name']) || $file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'error' => 'File upload error'];
        }

        // 2. Check file size
        if ($file['size'] > $this->maxSize) {
            return [
                'success' => false, 
                'error' => "File size too large. Max: " . ($this->maxSize / 1024 / 1024) . "MB"
            ];
        }

        // 3. Check actual file size
        if (filesize($file['tmp_name']) > $this->maxSize) {
            return ['success' => false, 'error' => 'Actual file size exceeds limit'];
        }

        // 4. Check extension
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, $this->allowedTypes)) {
            return [
                'success' => false, 
                'error' => "File type not allowed. Allowed: " . implode(', ', $this->allowedTypes)
            ];
        }

        // 5. Check true MIME Type (from file content)
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mimeType, $this->allowedMimeTypes)) {
            return [
                'success' => false, 
                'error' => 'Invalid file content (MIME type mismatch)'
            ];
        }

        // 6. Additional check for images
        if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
            $imageInfo = @getimagesize($file['tmp_name']);
            if ($imageInfo === false) {
                return ['success' => false, 'error' => 'File is not a valid image'];
            }

            // Check dimensions (DoS protection)
            list($width, $height) = $imageInfo;
            if ($width > 4096 || $height > 4096) {
                return ['success' => false, 'error' => 'Image dimensions too large (Max 4096x4096)'];
            }
            if ($width < 50 || $height < 50) {
                return ['success' => false, 'error' => 'Image dimensions too small'];
            }
        }

        // 7. Generate safe unique filename
        $filenamePrefix = $this->sanitizeFilename($filenamePrefix);
        $randomString = bin2hex(random_bytes(16)); // Better than uniqid
        $filename = $filenamePrefix . '_' . $randomString . '.' . $extension;

        // 8. Check final path (Path Traversal Protection)
        $targetPath = $this->targetDir . DIRECTORY_SEPARATOR . $filename;
        $realTargetPath = realpath(dirname($targetPath));
        $realTargetDir = realpath($this->targetDir);

        if ($realTargetPath !== $realTargetDir) {
            return ['success' => false, 'error' => 'Invalid upload path'];
        }

        // Symlink Protection
        if (is_link($targetPath)) {
            return ['success' => false, 'error' => 'Symlinks not allowed'];
        }

        // 9. Move file
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            // 10. Set secure permissions
            chmod($targetPath, 0644); // Read-only for others

            // 11. Return relative path
            $relativePath = basename($this->targetDir) . '/' . $filename;
            
            return [
                'success' => true, 
                'path' => $relativePath,
                'filename' => $filename,
                'size' => $file['size'],
                'mime_type' => $mimeType
            ];
        }

        return ['success' => false, 'error' => 'Failed to move uploaded file'];
    }

    /**
     * Sanitize directory name to prevent Path Traversal
     */
    private function sanitizeDirectoryName($dir) {
        $dir = str_replace(['..', '/', '\\', "\0"], '', $dir);
        $dir = preg_replace('/[^a-zA-Z0-9_-]/', '', $dir);
        return $dir ?: 'uploads';
    }

    /**
     * Sanitize filename prefix
     */
    private function sanitizeFilename($filename) {
        $filename = preg_replace('/[^a-zA-Z0-9_-]/', '', $filename);
        return substr($filename, 0, 50); // Limit length
    }

    /**
     * Delete file securely
     */
    public function delete($relativePath) {
        $fullPath = $this->targetDir . DIRECTORY_SEPARATOR . basename($relativePath);
        
        // Verify file is within allowed directory
        $realPath = realpath($fullPath);
        $realDir = realpath($this->targetDir);
        
        if ($realPath && strpos($realPath, $realDir) === 0 && is_file($realPath)) {
            return unlink($realPath);
        }
        
        return false;
    }
}