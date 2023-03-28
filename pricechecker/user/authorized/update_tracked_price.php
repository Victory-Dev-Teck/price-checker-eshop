<?php
require_once "../include/connection.php";

$email = "";
$name = "";
$response = array();
if(isset($_GET['email']) && $_GET['currentPrice'] && $_GET['oldPrice']){
    $email = mysqli_real_escape_string($con, $_GET['email']);
    $price = mysqli_real_escape_string($con, $_GET['currentPrice']);
    $oldPrice = mysqli_real_escape_string($con, $_GET['oldPrice']);
    $strQuery = "update`tracked_products` set `current_price`='$price', `old_price`='$oldPrice' where `user_email`='$email'";
    $response['error'] = $strQuery;
    $query=mysqli_query($con,$strQuery);

    if(!$query){
        $response['status'] = 'failed';
        $response['error'] = mysqli_error($con).$strQuery;
    }else{
        $response['status'] = 'ok';
        $response['error'] = '';
    }
}
else{
    $response['status'] = 'fail';
    $response['error'] = "Cannot parse the parameters!";
}
//return result
echo json_encode($response);
?>
