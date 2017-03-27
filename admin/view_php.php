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
	// 查询数据库
	$strsql='SELECT * FROM `htmlList` limit 5';
 	
	$result = mysql_query($strsql);
	
	$arr = array();
	
	while($info = mysql_fetch_array($result,MYSQL_ASSOC)){
		$arr[] = $info;
	}
	
	echo json_encode($arr);
?>

