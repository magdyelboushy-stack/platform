<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Utils\DatabaseSessionHandler;

try {
    echo "Testing DatabaseSessionHandler...\n";
    $handler = new DatabaseSessionHandler();
    
    $id = 'test_session_' . time();
    $data = 'test_data';
    
    // Simulate Guest Session (No User ID)
    $_SESSION['user_id'] = null; 
    
    echo "Attempting write ($id)...\n";
    $result = $handler->write($id, $data);
    
    if ($result) {
        echo "Write Success!\n";
    } else {
        echo "Write Failed (Check logs)\n";
    }

    echo "Attempting read...\n";
    $readParams = $handler->read($id);
    echo "Read Result: " . $readParams . "\n";
    
    echo "Attempting destroy...\n";
    $handler->destroy($id);
    echo "Destroy Success.\n";

} catch (Exception $e) {
    echo "Fatal Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
