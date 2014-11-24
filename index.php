<?php
session_start();

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

    function KortString($str, $chars){ //korte string afgeknipt
        if (strlen(strip_tags($str)) >= $chars) {
            return substr(strip_tags($str), 0, $chars). "...";
        }else{
            return strip_tags($str);
        }
    }
    
    function DatumSplitter($datetime){ // YYYY/MM/DD => DD/MM/YYYY
        $e = explode(' ', $datetime);
        $d = explode('-', $e[0]);
        return $d[2].'/'.$d[1].'/'.$d[0];
    }

    function Afronder($b){
        $b = round($b, 2);
        $b = sprintf("%01.2f", $b);
        //$b = number_format($b, 2, '.', ' ');
        return $b;
    }

    function AddBtw($zbtw, $btw){ //bereken en voeg btw toe
        $b = 0;
        $b = $b + ($btw*($zbtw/100));
        $b = $zbtw + $b;
        $b = Afronder($b);
        return $b;
    }

$routes = array(
    'home' => array(
        'controller' => 'Items',
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