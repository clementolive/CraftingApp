<!-- login.php -->
<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$host = "localhost";
$user = "root";
$password = "";
$db_name = "users";

$con = mysqli_connect($host , $user , $password , $db_name);

if(mysqli_connect_errno()){
    die("Failed to connect with MySQL :".mysqli_connect_errno());
}
?>