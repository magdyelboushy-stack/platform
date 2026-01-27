<?php

namespace App\Core;

class Router {
    private $routes = [];

    public function __construct() {
        $this->loadRoutes();
    }

    private function loadRoutes() {
        // Load routes from a routes file or define them here
        // For now, we will define them manually in a routes file ideally, 
        // but for this implementation we can map them here or load from app/Config/routes.php
        $this->routes = require __DIR__ . '/../Config/routes.php';
    }

    public function dispatch() {
        // Global OPTIONS Handling for CORS Preflight
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }

        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $requestUri = str_replace('\\', '/', $requestUri);
        $method = $_SERVER['REQUEST_METHOD'];

        // Determine effective URI (Strip base path if necessary)
        $uri = $requestUri;
        $scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']);
        $basePath = dirname($scriptName);
        if ($basePath !== '/' && $basePath !== '.' && !empty($basePath)) {
            if (strpos($requestUri, $basePath) === 0) {
                $uri = substr($requestUri, strlen($basePath));
            }
        }
        if (empty($uri)) $uri = '/';
        if ($uri[0] !== '/') $uri = '/' . $uri;

        // Logging
        $logFile = __DIR__ . '/../../routing.log';
        $logMsg = date('[Y-m-d H:i:s] ') . "$method $uri (Raw: $requestUri, Script: $scriptName)\n";
        @file_put_contents($logFile, $logMsg, FILE_APPEND);

        if (isset($_ENV['DEBUG']) && $_ENV['DEBUG'] === 'true') {
            error_log("Router Dispatch: $method $uri (Raw: $requestUri)");
        }

        // --- HARD-CODED AVATAR FALLBACK (Priority) ---
        if ($method === 'GET' && strpos($uri, 'avatar_') !== false) {
             $filename = basename($uri);
             if (strpos($filename, 'avatar_') === 0 && preg_match('/\.(jpg|jpeg|png)$/i', $filename)) {
                  $controller = new \App\Controllers\FileController();
                  $controller->serve(['type' => 'avatars', 'filename' => $filename]);
                  return;
             }
        }

        // Global Security
        \App\Middleware\SessionMiddleware::check();

        // 1. Try Exact Match
        if (isset($this->routes[$method][$uri])) {
            $handler = $this->routes[$method][$uri];
            $controllerClass = $handler[0];
            $action = $handler[1];
            $controller = new $controllerClass();
            $controller->$action([]);
            return;
        }

        // 2. Try Dynamic Regex Match
        if (isset($this->routes[$method])) {
            foreach ($this->routes[$method] as $route => $handler) {
                if (strpos($route, '{') === false) continue;

                $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $route);
                $pattern = '#^' . $pattern . '$#';

                if (preg_match($pattern, $uri, $matches)) {
                    $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                    $controllerClass = $handler[0];
                    $action = $handler[1];
                    $controller = new $controllerClass();
                    $controller->$action($params);
                    return;
                }
            }
        }

        // 3. Final 404
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'Not Found',
            'message' => "The resource '$uri' could not be resolved.",
            'debug' => [
                'uri' => $uri,
                'raw' => $requestUri,
                'method' => $method,
                'script' => $scriptName
            ]
        ]);
    }
}
