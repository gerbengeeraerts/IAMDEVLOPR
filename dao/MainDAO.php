<?php
require_once WWW_ROOT. DS . 'dao'. DS . 'DAO.php';

class MainDAO extends DAO {

    // Example function
    public function selectAll() {
      $sql = "SELECT * FROM `table`";
      $stmt = $this->pdo->prepare($sql);
      $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}

?>
