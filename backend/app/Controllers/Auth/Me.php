<?php

namespace App\Controllers\Auth;

use App\Core\BaseController;
use App\Models\User;
use App\Utils\SecureSession;

class Me extends BaseController {
    
    public function handle() {
        try {
            SecureSession::start();
            $userId = SecureSession::get('user_id');
            
            if (!$userId) {
                $this->json(['error' => 'Unauthenticated'], 401);
            }

            $userModel = new User();
            $user = $userModel->find($userId);

            if (!$user) {
                $this->json(['error' => 'User not found'], 404);
            }

            $this->json([
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role'],
                    'avatar' => $user['avatar'] ?? null,
                    'grade_level' => $user['grade_level'] ?? null,
                    'education_stage' => $user['education_stage'] ?? null,
                    'phone' => $user['phone'] ?? null,
                    'parent_phone' => $user['parent_phone'] ?? null,
                    'status' => $user['status'],
                    'permissions' => isset($user['permissions']) ? json_decode($user['permissions'] ?? '[]', true) : [],
                ]
            ]);
            
        } catch (\Exception $e) {
            $this->json(['error' => 'Server Error'], 500);
        }
    }
}
