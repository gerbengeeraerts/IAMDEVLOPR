<?php
require_once WWW_ROOT. DS . 'dao'. DS . 'DAO.php';

class ItemDAO extends DAO {

    public function selectAll() {
      $sql = "SELECT * FROM `kaka`";
      $stmt = $this->pdo->prepare($sql);
      $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}

?>