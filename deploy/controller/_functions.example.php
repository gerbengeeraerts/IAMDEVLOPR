<?php

/**
 * This file includes some common example functions
 * for usage in the DAO's.
 * Copy/paste examples into exisiting files, but dont
 * include this file in your routers.
 */

	/**
	 * USER HANDLING
	 */

	public function logout() {
		unset($_SESSION['user']);
		$this->redirect('index.php?p=home');
	}

?>
