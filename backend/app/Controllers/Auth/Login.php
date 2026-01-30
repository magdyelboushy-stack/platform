<?php

namespace App\Controllers\Auth;

use App\Core\BaseController;
use App\Models\User;
use App\Utils\AdvancedRateLimiter;
use App\Utils\CSRF;
use App\Utils\HoneypotProtection;
use App\Utils\SecureSession;
use App\Utils\AuditLogger;
use App\Utils\SqlRateLimiter;

class Login extends BaseController {
    
    public function handle() {
        try {
            // 0. Honeypot Check (Bot Protection)
            HoneypotProtection::check();

            // 1. Get Data FIRST to handle JSON
            $data = !empty($_POST) ? $_POST : $this->getInput();
            
            // 2. CSRF Token Check (from Post, JSON data, or Header)
            $csrfToken = $data['csrf_token'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;
            if (!CSRF::validate($csrfToken)) {
                $this->json(['error' => 'فشل التحقق الأمني. يرجى تحديث الصفحة والمحاولة مرة أخرى.'], 403);
            }

            $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
            $password = $data['password'] ?? '';
            
            if (!$email || !$password) {
                $this->json(['error' => 'يرجى إدخال البريد الإلكتروني وكلمة المرور'], 400);
            }
            
            // 3. SQL Rate Limiting
            $limiter = new SqlRateLimiter();
            if (!$limiter->check($email)) {
                $this->json([
                    'error' => 'تم حظر الحساب مؤقتاً بسبب تكرار المحاولات الخاطئة. حاول بعد 15 دقيقة.'
                ], 429);
            }

            // 4. Authenticate (support both email and phone)
            $userModel = new User();
            
            // Try to find user by email first
            $user = $userModel->findByEmail($email);
            
            // If not found by email, try phone number
            if (!$user && preg_match('/^[0-9+\-() ]+$/', $email)) {
                $user = $userModel->findByPhone($email);
            }

            // 5. Verify password
            if ($user && $userModel->verifyPassword($user['id'], $password)) {
                // Success
                // Success
                
                // Check Account Status
                if ($user['status'] !== 'active') {
                    $message = $user['status'] === 'pending' 
                        ? 'حسابك تحت المراجعة. سيتم إشعارك فور الموافقة عليه.' 
                        : 'حسابك غير مفعّل. يرجى التواصل مع الإدارة.';
                    $this->json(['error' => $message, 'code' => 'ACCOUNT_INACTIVE'], 403);
                }
                
                // Clear Rate Limit
                $limiter->clear($email);

                // ✅ SECURITY FIX: Session Fixation Prevention
                // Step 1: Start session and regenerate BEFORE accepting credentials
                SecureSession::start(0); // Start with default lifetime first
                SecureSession::regenerate(); // ✅ CRITICAL: Regenerate BEFORE auth
                
                // Step 2: Verify password (now with fresh session)
                $remember = !empty($data['remember_me']);
                $lifetime = $remember ? 2592000 : 0; // 30 days or session
                
                SecureSession::start($lifetime);
                // Step 3: Regenerate AGAIN after successful authentication
                SecureSession::regenerate();
                $newSessionId = session_id();
                
                SecureSession::set('user_id', $user['id']);
                SecureSession::set('role', $user['role']);
                SecureSession::set('grade_level', $user['grade_level'] ?? null);
                SecureSession::set('education_stage', $user['education_stage'] ?? null);
                SecureSession::set('login_time', time());

                // 7. Audit & Session Logging (Enforce Single Device)
                $userModel->update($user['id'], [
                    'last_session_id' => $newSessionId,
                    'last_login' => date('Y-m-d H:i:s'),
                    'ip_address' => $_SERVER['REMOTE_ADDR'],
                    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
                ]);
                
                AuditLogger::log(
                    $user['id'], 
                    'login', 
                    'users', 
                    $user['id'], 
                    null, 
                    ['ip' => $_SERVER['REMOTE_ADDR'], 'device' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown']
                );
                
                $this->json([
                    'message' => 'Login successful',
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
                    ],
                    'redirect' => '/dashboard'
                ]);
                
            } else {
                // Failed -> Record Attempt
                $limiter->hit($email, $_SERVER['HTTP_USER_AGENT'] ?? '');
                $this->json(['error' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة'], 401);
            }
        } catch (\Exception $e) {
             error_log("Login Error: " . $e->getMessage());
             $this->json(['error' => 'Server Error', 'message' => 'An unexpected error occurred'], 500);
        }
    }
}
