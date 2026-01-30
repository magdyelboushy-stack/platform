<?php

return [
    'POST' => [
        // Auth Routes
        '/api/auth/register' => ['App\\Controllers\\Auth\\Register', 'handle'],
        '/api/auth/register-staff' => ['App\\Controllers\\Auth\\RegisterStaff', 'handle'],
        '/api/auth/login' => ['App\\Controllers\\Auth\\Login', 'handle'],
        '/api/auth/validate-step' => ['App\\Controllers\\Auth\\Validation', 'check'],
        '/api/auth/profile/update' => ['App\\Controllers\\Auth\\ProfileUpdate', 'handle'],
        '/api/auth/password/update' => ['App\\Controllers\\Auth\\PasswordUpdate', 'handle'],
        
        // Admin Requests
        '/api/admin/requests/{id}/approve' => ['App\\Controllers\\Admin\\RequestsController', 'approve'],
        '/api/admin/requests/{id}/reject' => ['App\\Controllers\\Admin\\RequestsController', 'reject'],
        
        // Assistant Management
        '/api/admin/assistants' => ['App\\Controllers\\Admin\\AssistantsController', 'create'],
        '/api/admin/assistants/{id}/update' => ['App\\Controllers\\Admin\\AssistantsController', 'update'],
        '/api/admin/assistants/{id}/delete' => ['App\\Controllers\\Admin\\AssistantsController', 'delete'],

        // Student Management
        '/api/admin/students/{id}/status' => ['App\\Controllers\\Admin\\StudentsController', 'updateStatus'],
        '/api/admin/students/{id}/update' => ['App\\Controllers\\Admin\\StudentsController', 'update'],
        '/api/admin/students/{id}/delete' => ['App\\Controllers\\Admin\\StudentsController', 'delete'],

        // Courses Management
        '/api/admin/courses' => ['App\\Controllers\\Admin\\CoursesController', 'store'],
        '/api/admin/courses/{id}/update' => ['App\\Controllers\\Admin\\CoursesController', 'update'],
        '/api/admin/courses/{id}/delete' => ['App\\Controllers\\Admin\\CoursesController', 'delete'],
        '/api/admin/courses/upload-thumbnail' => ['App\\Controllers\\Admin\\CourseUploadController', 'uploadThumbnail'],
        '/api/courses/{id}/enroll' => ['App\\Controllers\\CoursesController', 'enroll'],

        // Sections Management
        '/api/admin/courses/{courseId}/sections' => ['App\\Controllers\\Admin\\SectionsController', 'store'],
        '/api/admin/sections/{id}/update' => ['App\\Controllers\\Admin\\SectionsController', 'update'],
        '/api/admin/sections/{id}/delete' => ['App\\Controllers\\Admin\\SectionsController', 'delete'],

        // Lessons Management
        '/api/admin/sections/{sectionId}/lessons' => ['App\\Controllers\\Admin\\LessonsController', 'store'],
        '/api/admin/lessons/{id}/update' => ['App\\Controllers\\Admin\\LessonsController', 'update'],
        '/api/admin/lessons/{id}/delete' => ['App\\Controllers\\Admin\\LessonsController', 'delete'],

        // Progression
        '/api/lessons/{id}/complete' => ['App\\Controllers\\ProgressController', 'complete'],
        '/api/player/progress/{id}' => ['App\\Controllers\\ProgressController', 'updateTimestamp'],
        // VdoCipher
        '/api/videos/{id}/otp' => ['App\\Controllers\\VdoCipherController', 'getOTP'],
    ],
    'GET' => [
        '/api/csrf-token' => ['App\\Controllers\\Security\\CSRFController', 'getToken'],
        '/api/auth/me' => ['App\\Controllers\\Auth\\Me', 'handle'],
        '/api/files/{type}/{filename}' => ['App\\Controllers\\FileController', 'serve'],
        
        // Admin Requests
        '/api/admin/requests/pending' => ['App\\Controllers\\Admin\\RequestsController', 'listPending'],

        // Admin Students Management
        '/api/admin/students/active' => ['App\\Controllers\\Admin\\StudentsController', 'listActive'],
        '/api/admin/students/stats' => ['App\\Controllers\\Admin\\StudentsController', 'getStats'],

        // Assistant Management
        '/api/admin/assistants' => ['App\\Controllers\\Admin\\AssistantsController', 'index'],

        // Courses Management
        '/api/admin/courses' => ['App\\Controllers\\Admin\\CoursesController', 'index'],
        '/api/admin/courses/{id}' => ['App\\Controllers\\Admin\\CoursesController', 'show'],
        '/api/admin/courses/{id}/sections' => ['App\\Controllers\\Admin\\SectionsController', 'index'],

        // Public Lessons (If needed for direct preview check)
        '/api/sections/{sectionId}/lessons' => ['App\\Controllers\\Admin\\LessonsController', 'index'],
        
        // Public Course Routes
        '/api/courses' => ['App\\Controllers\\CoursesController', 'index'],
        '/api/courses/{id}' => ['App\\Controllers\\CoursesController', 'show'],
        '/api/student/courses' => ['App\\Controllers\\CoursesController', 'studentCourses'],
    ]
];
