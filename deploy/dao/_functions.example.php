<?php

/**
 * This file includes some common example functions
 * for usage in the DAO's.
 * Copy/paste examples into exisiting files, but dont
 * include this file in your routers.
 */

 /**
  * QUERYING - READ
  */

 public function selectAll() {
   $sql = "SELECT * FROM `table`";
   $stmt = $this->pdo->prepare($sql);
   $stmt->execute();
   return $stmt->fetchAll(PDO::FETCH_ASSOC);
 }

 public function selectById($id) {
   $sql = "SELECT * FROM `table` WHERE `id` = :id";
   $stmt = $this->pdo->prepare($sql);
   $stmt->bindValue(':id', $id);
   $stmt->execute();
   return $stmt->fetch(PDO::FETCH_ASSOC);
 }

 /**
  * STORE - CREATE
  */

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)){
      $sql = "INSERT INTO `table` (`rowvalue`)
                VALUES (:rowvalue)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':rowvalue', $data['value']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

 /**
  * VALIDATION
  */

 public function getValidationErrors($data) {
   $errors = array();
   if(empty($data['value'])) {
     $errors['value'] = "Error Message";
   }
   return $errors;
 }

?>
