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

// $img = "img";
// $num = "num";
// $price = "price";
// $name = "name";
// $id = "id";

$sql = "SELECT * FROM jiesuan WHERE name";

$res = mysqli_query($con, $sql);

$list = array();

while ($data = mysqli_fetch_array($res)) {
    // echo json_encode($data);
    $temp = array();
    $temp['id'] = $data['id'];
    $temp['name'] = $data['name'];
    $temp['price'] = $data['price'];
    $temp['num'] = $data['num'];
    $temp['img'] = $data['img'];
    $temp['jinge'] = $data['jinge'];
    $temp['heji'] = $data['heji'];
    $list[] = $temp;
}
$obj = array();
$obj['code'] = "1";
$obj['msg'] = 'success';
$obj['data'] = $list;
echo json_encode($obj);
