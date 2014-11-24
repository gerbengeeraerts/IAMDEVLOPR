<?php

class Controller {

	public $route;
	protected $viewVars = array();

	public function filter() {
		call_user_func(array($this, $this->route['action']));
	}

	public function render() {
		$this->createViewVarWithContent();
		$this->renderInLayout();
		$this->cleanupSessionMessages();
	}

	public function set($variableName, $value) {
		$this->viewVars[$variableName] = $value;
	}

	public function redirect($url) {
		header("Location: {$url}");
		exit();
	}

	private function createViewVarWithContent() {
		extract($this->viewVars, EXTR_OVERWRITE);
		ob_start();
		require WWW_ROOT . 'view' . DS . strtolower($this->route['controller']) . DS . $this->route['action'] . '.php';
		$content = ob_get_clean();
		$this->set('content', $content);
	}

	private function renderInLayout() {
		extract($this->viewVars, EXTR_OVERWRITE);
		include WWW_ROOT . 'view' . DS . 'layout.php';
	}

	private function cleanupSessionMessages() {
		unset($_SESSION['info']);
		unset($_SESSION['error']);
		unset($_SESSION['meta']);
	}

}