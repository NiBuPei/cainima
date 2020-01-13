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

$key= $_GET['key'];
$order = $_GET['order'];
$sort = $_GET['sort'];

// $key = '90';
// $order = 'order';
// $sort = 'sort';
// $sql = "SELECT * FROM goodsinfo WHERE name";
$sql = "SELECT * FROM goodsinfo WHERE name LIKE '%${key}%' ORDER BY ${order} ${sort}";


$result = mysqli_query($con, $sql);
// echo json_encode(mysqli_fetch_array($result));

$list = array();

while ($data = mysqli_fetch_array($result)) {
    // echo json_encode($data);
    $temp = array();
    $temp['id'] = $data['id'];
    $temp['name'] = $data['name'];
    $temp['price'] = $data['price'];
    $temp['des'] = $data['des'];
    $temp['img'] = $data['img'];
    $list[] = $temp;
}

$obj = array();
$obj['code'] = "1";
$obj['msg'] = 'success';
$obj['data'] = $list;
echo json_encode($obj);
