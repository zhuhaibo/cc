<?php
	// 连接到数据库 start
	$mysql_server_name="localhost"; //数据库服务器名称
	$mysql_username="zhuhaibo"; // 连接数据库用户名
	$mysql_password=""; // 连接数据库密码
	$mysql_database="base"; // 数据库的名字
	$conn=mysql_connect($mysql_server_name, $mysql_username,$mysql_password); //连接数据库
	mysql_query("set names 'utf8'"); //数据库输出编码
	mysql_select_db($mysql_database); //打开数据库
	// 连接到数据库 end
	
	// 获取post数据
	$navName = addslashes($_POST["navName"]);
	$navMaodian = addslashes($_POST["navMaodian"]);
	$viewcode = addslashes($_POST["viewCode"]);
	$htmlCode = addslashes($_POST["htmlCode"]);
	
	// 插入表数据
	$strsql="insert into `htmlList` values ('','".$navName."','".$navMaodian."','".$viewcode."','".$htmlCode."')";
 	
	$result = mysql_query($strsql);
	
	echo json_encode($result);
?>

