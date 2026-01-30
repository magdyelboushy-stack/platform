<?php
require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap Slim app or just the database
use App\Config\Database;

// Basic setup
$_ENV['APP_ENV'] = 'development';
$_ENV['DB_HOST'] = 'localhost';
$_ENV['DB_DATABASE'] = 'bacaloria_db';
$_ENV['DB_USERNAME'] = 'root';
$_ENV['DB_PASSWORD'] = '';

try {
    $db = Database::getInstance()->getConnection();
    
    echo "--- City Distribution Diagnostic ---\n";
    $stmt = $db->query("SELECT city, COUNT(*) as count FROM users WHERE role = 'student' AND status = 'active' GROUP BY city");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($results)) {
        echo "No data found for active students.\n";
    } else {
        foreach ($results as $row) {
            echo sprintf("City: [%s], Count: %d\n", $row['city'] ?? 'NULL', $row['count']);
        }
    }
    
    echo "\n--- Total Active Students ---\n";
    $stmt = $db->query("SELECT COUNT(*) as total FROM users WHERE role = 'student' AND status = 'active'");
    echo "Total: " . $stmt->fetchColumn() . "\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
