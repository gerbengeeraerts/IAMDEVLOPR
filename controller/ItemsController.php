<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'ItemDAO.php';

class ItemsController extends Controller {

	private $itemDAO;

	function __construct() {
		$this->itemDAO = new ItemDAO();
	}

	public function index() {

		


	}


}