<?php
header('Content-Type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin: *'); // 允许跨域访问

$host = 'b-ssj5ylkcpte7zo.bch.rds.gz.baidubce.com:3306';
$username = 'b_ssj5ylkcpte7zo';
$password = '1697415917';
$dbname = 'b_ssj5ylkcpte7zo';


$conn = mysqli_connect($host, $username, $password, $dbname);

if(!$conn) {
  die('数据库连接失败');
}

// 登录逻辑

$username = $_GET['username'];
$password = $_GET['password'];

// $username = 'username';
// $password = 'password';
$sql = "SELECT * FROM userinfo WHERE username = '$username'";

$result = mysqli_query($conn, $sql);

$data = mysqli_fetch_array($result);



$obj = array();

if($data) {
  if($password === $data['password']) {
    $obj['code'] = 1;
    $obj['data'] = true;
  } else {
    $obj['code'] = 0;
    $obj['msg'] = '用户名或密码错误';
    $obj['data'] = false;
  }

} else {
  $obj['code'] = 0;
  $obj['msg'] = '用户名或密码错误';
  $obj['data'] = false;
}

echo json_encode($obj);


