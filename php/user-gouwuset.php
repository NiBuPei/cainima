<?php
header('Content-Type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin: *');

$host = 'b-ssj5ylkcpte7zo.bch.rds.gz.baidubce.com:3306';
$username = 'b_ssj5ylkcpte7zo';
$password = '1697415917';
$dbname = 'b_ssj5ylkcpte7zo';

$con = mysqli_connect($host, $username, $password, $dbname);

if (!$con) {
    die('数据库连接失败');
}


$id = $_GET["id"];
$name = $_GET['name'];

$sql = "DELETE FROM gouwu WHERE id='$id' AND name='$name'";

$res = mysqli_query($con, $sql);

// $data = mysqli_fetch_array($res);

$rows = mysqli_affected_rows($con);

$obj = array();
if ($rows){
    // echo 1;
    $obj["code"] = '1';
    $obj["msg"] = "删除成功";
} else {
    // echo 0;
    $obj["code"] = '0';
    $obj["msg"] = "删除失败";
}
echo json_encode($obj);