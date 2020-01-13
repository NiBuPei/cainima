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

$id = $_GET['id'];

$sql = "SELECT * from goodsinfo WHERE id = $id";

$result = mysqli_query($con, $sql);

$data = mysqli_fetch_array($result);

if ($data) {
    $temp = array();
    $temp['id'] = $data['id'];
    $temp['name'] = $data['name'];
    $temp['price'] = $data['price'];
    $temp['des'] = $data['des'];
    $temp['img'] = $data['img'];
    $temp['img2'] = $data['img2'];
    $temp['img3'] = $data['img3'];
    $temp['img4'] = $data['img4'];
}
$obj = array();
$obj['code'] = 1;
$obj['msg'] = 'success';
$obj['data'] = $temp;
echo json_encode($obj);