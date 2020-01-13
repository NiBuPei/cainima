<?php
header('Content-Type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin: *'); // 允许跨域访问

$host = 'b-ssj5ylkcpte7zo.bch.rds.gz.baidubce.com:3306';
$username = 'b_ssj5ylkcpte7zo';
$password = '1697415917';
$dbname = 'b_ssj5ylkcpte7zo';

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    die('数据库连接失败');
}

// 
$username = $_GET['username'];
$password = $_GET['password'];

// $username = 'username';
// $password = 'password';

$sql = "SELECT * FROM  userinfo WHERE username = '$username'";

$result = mysqli_query($conn, $sql);

$data = mysqli_fetch_array($result);

$obj = array();

if (!$data) { 
    $sql = "INSERT INTO userinfo(username , password) VALUES ('$username', '$password')";
    mysqli_query($conn, $sql);
    $rows = mysqli_affected_rows($conn);
    if ($rows > 0) {
        $obj['code'] = 1;
        $obj['data'] = true;
    }
} else {
    $obj['code'] = 0;
    $obj['msg'] = '用户名已存在';
    $obj['data'] = false;
}
echo json_encode($obj);
