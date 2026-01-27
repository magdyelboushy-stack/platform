<?php
// backend/public/update_db_schema.php

require_once __DIR__ . '/../vendor/autoload.php';

// Load Env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

$config = [
    'host' => $_ENV['DB_HOST'] ?? 'localhost',
    'database' => $_ENV['DB_DATABASE'] ?? 'bacaloria_db',
    'username' => $_ENV['DB_USERNAME'] ?? 'root',
    'password' => $_ENV['DB_PASSWORD'] ?? '',
];

try {
    $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset=utf8mb4";
    $pdo = new PDO($dsn, $config['username'], $config['password']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<h1>Updating Database Schema</h1>";
    
    // Check if column exists
    $stmt = $pdo->prepare("SHOW COLUMNS FROM users LIKE 'education_stage'");
    $stmt->execute();
    
    if ($stmt->fetch()) {
        echo "<span style='color: orange'>⚠️ Column 'education_stage' already exists.</span><br>";
    } else {
        echo "Adding 'education_stage' column...<br>";
        $sql = "ALTER TABLE users ADD COLUMN education_stage ENUM('primary', 'prep', 'secondary') NULL AFTER grade_level";
        $pdo->exec($sql);
        echo "<span style='color: green'>✅ Column 'education_stage' added successfully.</span><br>";
    }
    
    // While we are here, let's allow larger packets if needed (though this is session based)
    // Actually, let's just confirm it worked.
    $stmt = $pdo->query("DESCRIBE users");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
    if (in_array('education_stage', $columns)) {
        echo "<h2>🎉 Schema Verification Passed!</h2>";
    }

} catch (PDOException $e) {
    echo "<h2 style='color: red'>❌ Error:</h2>";
    echo $e->getMessage();
}
