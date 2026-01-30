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

    public function getDb() {
        return $this->db;
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function update($id, $data) {
        if (is_array($id)) {
            $id = $id['id'] ?? reset($id); // Fallback to extraction if array passed
        }

        $fields = "";
        $params = [];
        foreach ($data as $key => $value) {
            // Prevent setting ID in the SET clause
            if ($key === 'id') continue;
            $fields .= "{$key} = :{$key}, ";
            $params[$key] = $value;
        }
        $fields = rtrim($fields, ", ");

        $stmt = $this->db->prepare("UPDATE {$this->table} SET {$fields} WHERE id = :id");
        $params['id'] = $id;
        
        try {
            return $stmt->execute($params);
        } catch (\PDOException $e) {
            error_log("Model update error in [{$this->table}]: " . $e->getMessage());
            throw $e;
        }
    }

    public function create($data) {
        $keys = implode(", ", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));

        $stmt = $this->db->prepare("INSERT INTO {$this->table} ({$keys}) VALUES ({$placeholders})");
        if ($stmt->execute($data)) {
            return $this->db->lastInsertId();
        }
        return false;
    }
}
