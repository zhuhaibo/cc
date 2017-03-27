<?php
	$error_msg = array();
	$error_msg["value"] = "唯一校验失败！";
	if($_POST["value"] == "www.www.www"){
		$error_code = true;
	}else {
		$error_code = false;
	}
	echo json_encode(
		array(
			'error_code' => $error_code,
			'error_msg' => $error_msg,
		)
	);
?>