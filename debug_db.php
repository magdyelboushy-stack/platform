<?php
require 'backend/vendor/autoload.php';

use App\Config\Database;
use Dotenv\Dotenv;

header('Content-Type: text/plain; charset=utf-8');

try {
    $dotenv = Dotenv::createImmutable('backend');
    $dotenv->safeLoad();

    $db = Database::getInstance()->getConnection();
    echo "--- Database Connection: SUCCESS ---\n\n";

    // 1. Check lesson_progress columns
    echo "Checking lesson_progress table:\n";
    $stmt = $db->query("DESCRIBE lesson_progress");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $hasWatchedSeconds = false;
    foreach ($columns as $column) {
        echo " - " . $column['Field'] . " (" . $column['Type'] . ")\n";
        if ($column['Field'] === 'watched_seconds') $hasWatchedSeconds = true;
    }

    if (!$hasWatchedSeconds) {
        echo "\n[CRITICAL] Column 'watched_seconds' is MISSING!\n";
        echo "Attempting to add column...\n";
        try {
            $db->exec("ALTER TABLE lesson_progress ADD COLUMN watched_seconds INT DEFAULT 0 AFTER completed");
            echo "[SUCCESS] Column 'watched_seconds' added successfully.\n";
        } catch (Exception $e) {
            echo "[ERROR] Failed to add column: " . $e->getMessage() . "\n";
        }
    } else {
        echo "\n[OK] Column 'watched_seconds' exists.\n";
    }

    // 2. Check enrollments table for progress_percent
    echo "\nChecking enrollments table:\n";
    $stmt = $db->query("DESCRIBE enrollments");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($columns as $column) {
       if ($column['Field'] === 'progress_percent') echo " - progress_percent: OK\n";
    }

    echo "\n--- Debugging Finished ---";

} catch (Exception $e) {
    echo "--- FATAL ERROR ---\n";
    echo $e->getMessage();
}
