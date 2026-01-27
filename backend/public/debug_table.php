<?php
// backend/public/debug_table.php

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
    
    echo "<h1>Table: users</h1>";
    
    // Describe Table
    $stmt = $pdo->query("DESCRIBE users");
    echo "<table border='1'><tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        foreach ($row as $val) echo "<td>$val</td>";
        echo "</tr>";
    }
    echo "</table>";

    // Show Triggers
    echo "<h1>Triggers</h1>";
    $stmt = $pdo->query("SHOW TRIGGERS");
    $triggers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (empty($triggers)) {
        echo "No triggers found.";
    } else {
        echo "<table border='1'><tr><th>Trigger</th><th>Event</th><th>Table</th><th>Statement</th></tr>";
        foreach ($triggers as $row) {
            echo "<tr>";
            echo "<td>" . $row['Trigger'] . "</td>";
            echo "<td>" . $row['Event'] . "</td>";
            echo "<td>" . $row['Table'] . "</td>";
            echo "<td>" . htmlspecialchars($row['Statement']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
