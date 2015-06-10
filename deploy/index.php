<?php
session_start();

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

$routes = array(
    'home' => array(
        'controller' => 'Main',
        'action' => 'index',
    ),
);

if(empty($_GET['p'])) {
    $_GET['p'] = 'home';
}
if(empty($routes[$_GET['p']])) {
    header('Location: index.php');
    exit();
}

$route = $routes[$_GET['p']];
$controllerName = $route['controller'] . 'Controller';

require_once WWW_ROOT . 'controller' . DS . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();
$controllerObj->render();
