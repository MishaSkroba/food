<?php
$_POST = json_decode(file_get_contents("php://input"), true); //с такой командой наш php сможет обрабатывать json.
echo var_dump($_POST);//команда показывает запросы ушедшие на сервер