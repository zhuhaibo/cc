<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>base</title>
		<link href="../css/base.css" rel="stylesheet" type="text/css"/>
		<script src="../js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/jQueryBase.js" type="text/javascript" charset="utf-8"></script>
	    <!-- 配置文件 -->
	    <script type="text/javascript" src="utf8-php/ueditor.config.js"></script>
	    <!-- 编辑器源码文件 -->
	    <script type="text/javascript" src="utf8-php/ueditor.all.js"></script>
	    <!-- 实例化编辑器 -->
	    <script type="text/javascript">
			$(function(){
				// uEditor 实例化
				var htmlCodeEditor = UE.getEditor('htmlCode',{
        			elementPathEnabled:false, // 取消显示元素路径
					scaleEnabled:true, // 高度不拉伸
				});
				
			 	// Form 校验
			    $.ckForm("#ckForm","#ckFormBtn",{json:{
			    	"trues":/^(.){1,30}$/i,
			    }},function(){
					// 获取 html 代码 / 获取 demo 代码
					var navName = $("#navName").val(),
					navMaodian = $("#navMaodian").val(),
					viewCode = $("#viewCode").val(),
					htmlCode = htmlCodeEditor.getContent();
					// 数组
					var dataArr = {"navName":navName,"navMaodian":navMaodian,"viewCode":viewCode,"htmlCode":htmlCode};
					// ajax 提交
					$.baseAjax({
						url:"add_php.php",
	                    data: dataArr
					},function(msg){
						if(msg){
							$.alert(["添加成功！"]);
						}
					});
			    });
			});
	    </script>
	</head>
	<body style="background:#eee;">
		<div class="adminDiv" style="width:1200px;margin:20px auto;">
			<h1>添加模块</h1>
			<ul id="ckForm" class="ckForm">
			    <li>
			        <span>名称</span>
			        <input id="navName" type="text" value="" has="trues" />
			    </li>
			    <li>
			        <span>锚点</span>
			        <input id="navMaodian" type="text" value="" has="trues" />
			    </li>
				<li>
					<span>预览触发事件</span>
					<input id="viewCode" type="text" value="" />
				</li>
				<li>
					<span>html代码</span>
					<textarea id="htmlCode" class="fl" style="width:1000px;height:150px;"></textarea>
					<div class="clear"></div>
				</li>
			    <center class="mt20"><a href="javascript:;" id="ckFormBtn" class="btn">确定</a></center>
			</ul>
		</div>
	</body>
</html>

