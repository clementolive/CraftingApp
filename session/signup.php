<?php

include('db_connect.php');

$username = $_POST['user'];
$password = $_POST['pass'];

// This allows more precise debug. 
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// to prevent from mysqli injection
$username = stripcslashes($username);
$password = stripcslashes($password);
$username = mysqli_real_escape_string($con , $username);
$password = mysqli_real_escape_string($con , $password);

//Unlike login, we just check for an already existing username 
$sql = "select * from user where username = '$username' " ;
$result = mysqli_query($con , $sql);

$row = mysqli_fetch_array($result , MYSQLI_ASSOC);

$count = mysqli_num_rows($result);
if($count >= 1){
    echo "This username is already taken!<br>";
    header("Location: ./failed.php");
    exit;
}
else{
    //Insert username in DTB here 
    $sql = "INSERT INTO User (id, username, password)
     VALUES ('$LastId','$username','$password')";

    // This should redirect to login page 
    echo "<script>
        window.location.assign('./login.php');
    </script>";

}
?>

