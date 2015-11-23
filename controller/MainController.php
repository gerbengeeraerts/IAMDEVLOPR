<?php

require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'MainDAO.php';

class MainController extends Controller {

	private $mainDAO;

	function __construct() {
		$this->mainDAO = new MainDAO();
	}

	public function index() {

	}
	
}
