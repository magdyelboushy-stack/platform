<?php

return [
    'POST' => [
        // Auth Routes
        '/api/auth/register' => ['App\\Controllers\\Auth\\Register', 'handle'],
        '/api/auth/login' => ['App\\Controllers\\Auth\\Login', 'handle'],
        '/api/auth/validate-step' => ['App\\Controllers\\Auth\\Validation', 'check'], // Step Validation
        '/api/auth/profile/update' => ['App\\Controllers\\Auth\\ProfileUpdate', 'handle'],
        '/api/auth/password/update' => ['App\\Controllers\\Auth\\PasswordUpdate', 'handle'],
        // Add more routes here
    ],
    'GET' => [
        '/api/csrf-token' => ['App\\Controllers\\Security\\CSRFController', 'getToken'],
        '/api/auth/me' => ['App\\Controllers\\Auth\\Me', 'handle'],
        '/api/files/{type}/{filename}' => ['App\\Controllers\\FileController', 'serve'], // Secure File Route
        // '/api/courses' => ['App\\Controllers\\Courses\\ListCourses', 'handle'],
    ]
];
