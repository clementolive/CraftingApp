<?php

include('db_connect.php');

$username = $_POST['user'];
$password = $_POST['pass'];

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// to prevent from mysqli injection
$username = stripcslashes($username);
$password = stripcslashes($password);
$username = mysqli_real_escape_string($con , $username);
$password = mysqli_real_escape_string($con , $password);

$sql = "select * from user where username = '$username' and password = '$password'" ;
$result = mysqli_query($con , $sql);

$row = mysqli_fetch_array($result , MYSQLI_ASSOC);

$count = mysqli_num_rows($result);
if($count == 1){
    echo "<script>
        window.location.assign('./success.php');
    </script>";
}
else{
    header("Location: ./failed.php");
    exit;
}
?>