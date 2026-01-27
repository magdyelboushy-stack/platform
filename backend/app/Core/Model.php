<?php

namespace App\Core;

use App\Config\Database;
use PDO;

class Model {
    protected $table;
    protected $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function find($id) {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }
    
    public function findBy($column, $value) {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE {$column} = :value LIMIT 1");
        $stmt->bindParam(':value', $value);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function exists($column, $value) {
        return (bool) $this->findBy($column, $value);
    }
}
