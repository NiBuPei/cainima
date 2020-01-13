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

$img = $_GET["img"];
$num = $_GET["num"];
$price = $_GET["price"];
$name = $_GET["name"];
$id = $_GET["id"];
// $img = "img";
// $num = "num";
// $price = "price";
// $name = "name";
// $id = "id";

$search = "SELECT *FROM gouwu WHERE id='$id' AND name='$name'";
$res = mysqli_query($con, $search);

$cnt = mysqli_affected_rows($con);
if ($cnt > 0) {
    $sql = "UPDATE gouwu set num=num+$num WHERE id='$id' and name='$name'";

} else {
    $sql = "INSERT INTO gouwu (img,num,price,name,id)VALUES('$img','$num','$price','$name','$id')";

}

$sqplist = mysqli_query($con, $sql);

$rows = mysqli_affected_rows($con);

$obj = array();
if ($rows) {
    // echo 1;
    $obj["code"] = '1';
    $obj["msg"] = "添加成功";
} else {
    // echo 0;
    $obj["code"] = '0';
    $obj["msg"] = "添加失败";
}
echo json_encode($obj);
