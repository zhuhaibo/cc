/*	//JavaScript Document	
 * 
 * ----基于jQuery封装的一些常用的小方法----

 * 	作者：朱海博

 *	Div 模拟Select菜单	
 *	用法：
 *		$(obj).divSelect(); 		// obj 支持id  class
 *	参数：
 *		$(obj).divSelect(2);   // 默认选中第二个
 * 
 * */
$.fn.divSelect = function(selectid){
	if(selectid){
		var $this = $(this),
		$span = $this.find("span"),
		$input = $this.find(".div-input");
		$this.find("li a").each(function() {
			var oVal = $(this);
			if(oVal.attr("selectid") == selectid){
				$span.text(oVal.text());
				$input.val(selectid);
			}
		});
	}
	return this.each(function(index){
		var $this = $(this),
		$span = $this.find("span"),
		$list = $this.find("ul"),
		$input = $this.find(".div-input");
		$this.on("click","span",function(){
			$list.is(":hidden") ? $list.slideDown("fast") : $list.slideUp("fast");
			return false
		});
		$list.on("click","a",function(){
			var $this = $(this);
			$span.text($this.text());
			$input.val($this.attr("selectid"));
			$list.hide();
			return false
		});
		// 鼠标hover时，显示 em 的提示信息
		$this.hover(function(){
			$this.siblings("em").removeClass("red").show();
		},function(){
			$this.siblings("em").hide();
		});
		$(document).on("click.select"+index,function(){
			$list.hide();
		});
	});
};
/**
 *	元素居中
 *	用法：
 *		$(id).center();  元素id
 *	参数：
 * 
 */
$.fn.center=function(){
	var $this = $(this),
	mlpx = $this.width()/2,
	mtpx = $this.height()/2;
	$this.css({
		"margin-left":"-"+mlpx+"px",
		"margin-top":"-"+mtpx+"px"
	});
};
/**
 *	锚点定位
 *	用法：
 *		$(id).maoDian();  
 *	参数：
 * 
 */
$.fn.maoDian=function(){
	var pageYpx = $(this).attr("href"),
	pageYs = $(pageYpx).offset().top;
	$('html,body').animate({
		scrollTop: pageYs+'px'
	},500);
};

/**
 * errorTop 发现错误，滚动到当前报错位置
 * 
 * 用法：
 * $(id).errorTop();
 */
$.fn.errorTop=function(){
	var pageYs = $(this).offset().top,
	windowHeight = $(document).height();
	console.log(windowHeight+":"+pageYs);
	$('html,body').animate({
		scrollTop: pageYs+'px'
	},1);
};
/* 
 * jQuery 扩展方法
 * 
 * */
var altArr=[];// div 模拟 alert 弹窗，记录obj( alert id )的全局变量!
(function($){
    $.extend({
    		/**
		 *	金额－每隔3位数，增加逗号
		 *	用法：
		 *		$.jinE("1000");  // 返回格式化后的字符串1,000
		 *	参数：
		 * 
		 */
        jinE:function(nStr){
        		if(!isNaN(Number(nStr))){
	        		var rgx = /(\d+)(\d{3})/;
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
			 	x2 = x.length > 1 ? '.' + x[1] : '';
			 	while (rgx.test(x1)) {
				  	x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
			 	return x1 + x2;
        		}else {
        			return "格式错误！";
        		}
        },
        /**
		 *	加载中动画
		 *	用法：
		 *		$.loadingStart();  
		 *	参数：
		 * 
		 */
		loadingStart(){
			if($(".divAppendHtml").length == 0)$("body").append('<!-- js生成代码 --><div class="divAppendHtml"></div>');
			if($(".loadImg").length == 0)$(".divAppendHtml").append('<div class="loading"><div class="loadImg"></div><div class="load_img"><img src="images/loading.gif" /></div></div>');
			$(".loading").show().find("div.load_img").show().center();
		},
		loadingEnd(){
			$(".loading").hide();
		},
		/*
		 * 
		 * Cookie 操作
		 *
		 * * 1.设置Cookie
		 * 用法：$.SetCookie ("name", "value");
		 * 
		 * * 2.获取Cookie
		 * 用法：$.getCookie("name");
		 * 
		 * * 3.删除Cookie
		 * 用法：$.delCookie("name");
		 *
		 * */
		setCookie(name,value){//两个参数，一个是cookie的名子，一个是值
		    var Days = 30; //此 cookie 将被保存 30 天
		    var exp  = new Date();    //new Date("December 31, 9998");
		    exp.setTime(exp.getTime() + Days*24*60*60*1000);
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		},
		getCookie(name){//取cookies函数
		    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		     if(arr != null) return unescape(arr[2]); return null;
		},
		delCookie(name){//删除cookie
		    var exp = new Date();
		    exp.setTime(exp.getTime() - 1);
		    var cval=$.getCookie(name);
		    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		},
		
		/**
		 * cite 提示窗口
		 * 
		 * 用法：
		 * $.citeFn(this,e);
		 */
		citeFn(_this,e){
			var citeW = _this.offset().left+_this.width()+10-$(window).scrollLeft(),
			citeTop = _this.offset().top - $(window).scrollTop();
			if(_this.hasClass("btn")){
				citeTop = citeTop+7;
				citeW = citeW+35;
				// cite 离开后隐藏提示窗口
				
			}
			_this.siblings("cite").css({"position":"fixed","left":citeW,"top":citeTop}).show();
			var icociteH  = (_this.siblings("cite").height()+16)/2-10,
			CiteHtml = '<div class="citeico" style="top:'+icociteH+'px"></div>';
			_this.siblings("cite").append(CiteHtml);
			var citeH = _this.siblings("cite").height()+16,
			newCiteH = citeTop - citeH/2;
			newCiteH = newCiteH + _this.height()/2;
			_this.siblings("cite").css("top",newCiteH);
			var windwidth = $(window).width(),
			pageX = e.pageX,
			citeWidth = _this.siblings("cite").width()+26,
			fwindw = pageX+citeWidth;
		},
		/**
		 * cite 提示窗口
		 * 
		 * 用法：
		 * 		$.cite("#cite");
		 * 		支持多个元素
		 * 		$.cite("#cite,#cite2,#cite3 ... ");
		 */
		cite(obj){
			$(obj).hover(function(e){
				$.citeFn($(this),e);
			},function(){
				$(this).siblings("cite").hide();
			});
		},
		/*
		 	ajax
		 	
		 	用法：
		 	
		 	$.baseAjax({
		 		async = true, 					// 同步异步	（可不写）
		 		type = "post",					// 请求方式  （可不写）
				dataType = "json",				// 数据类型  （可不写）
				url:"test.php", 					// 地址
				data: {"value":$(this).val()}	// 传参
			},function(msg){ 
				// 返回值
				console.log(msg);
			});
		 * */
		baseAjax(json,callback){
			function ajaxJoinParams(post_param){
				var json_params = '';
				$.each( post_param, function(i,n){
					if( json_params ){
						json_params = json_params + '&' + i + '=' + n
					} else {
						json_params = i + '=' + n;
					}
				});
				return json_params;
			}
			var url = json.url,
			type = json.type || "POST",
			dataType = json.dataType || "json",
			data = json.data,
			async = json.async || true;
			$.ajax({
				async:async,
		        url: url,
		    	type: type,  
		       	dataType: "json",
		       	data:data,
		        beforeSend: $.loadingStart(),
		        success: function (msg) {
		        	$.loadingEnd();
					if(msg){
						msg = {"error_code":true,"error_msg":msg};
					}else {
						msg = {"error_code":false,"error_msg":""};
					}
					callback && callback(msg);
		        },
		        error: function(XMLHttpRequest,textStatus,errorThrown){
		        		// XMLHttpRequest.responseText		//	Html 代码
		        		// XMLHttpRequest.status				//	200/404/505
		        		// XMLHttpRequest.readyState			//	1/2/3/4
		        		// textStatus 						//	error
		        		$.loadingEnd();
		        		var errorArr = {"error_code":XMLHttpRequest.status,"error_msg":XMLHttpRequest.statusText};
		        		callback && callback(errorArr);
		        }
		    });
		},
		/**
		 * 校验表单
		 * 
		 * 用法：
			$.ckForm({"元素ID或者class名称(.class & #id)","提交按钮的ID或者class名称","json":{
				//正则表达式集合,key = 元素的 <input type='text' has="phone" value='' /> has属性值
				"phone":/^1([3|5|6|7|8])\d{9}$/,
			},},function(){
				alert("校验成功");
			});
		 * 
		 * */
		ckForm(form_id,submit_id,jsons,callback){
			var json = jsons.json,
			alertCheck = jsons.alertCheck,
			topErrorDiv="";
			// 提交按钮事件
			function checkTo(){
				var submitType=true;
				function checkForm(has,_this,value){
					if(has){
						if(json){
							$.each(json, function(k,v){
								if(k == has){
									if(!v.test(value)){
										submitType = false;
										if(topErrorDiv == ""){
											topErrorDiv = _this;
										}
										var emTxt = _this.siblings("span").html(),ems = _this.siblings("em");
										if(ems.html() == undefined){
											_this.after('<em class="red" style="display:block;">请输入'+emTxt+'</em>');
											topErrorDiv.errorTop();
										}else {
											ems.addClass("red").show();
											topErrorDiv.errorTop();
										}
									}else {
										if(topErrorDiv == ""){
											topErrorDiv = _this;
										}
										_this.siblings("em").hide().removeClass("red");	
										topErrorDiv = "";
										if(_this.hasClass("onlyError")){
											topErrorDiv.siblings("em").show().addClass("red");
											submitType = false;
											if(topErrorDiv == ""){
												topErrorDiv = _this;
											}
											topErrorDiv.errorTop();
										}
									}
								}else {
									// 如果has属性和正则不匹配 判断是什么元素
									// 如果是 select 元素，设置值不可为 “0”
									if(has == "select"){
										if(value == 0){
											if(topErrorDiv == ""){
												topErrorDiv = _this;
											}
											submitType = false;
											var emTxt = _this.siblings("span").html(),ems = _this.siblings("em");
											if(ems.html() == undefined){
												_this.after('<em class="red" style="display:block;">请输入'+emTxt+'</em>');
												topErrorDiv.errorTop();
											}else {
												ems.addClass("red").show();
												topErrorDiv.errorTop();
											}
										}else {
											_this.siblings("em").hide().removeClass("red");
										}
									}
								}
							});
						}
					}
				}
				// 正则校验 input  select textarea 
				$(form_id+" input,"+form_id+" select,"+form_id+" textarea").each(function(){
					var _this = $(this),
					has = _this.attr("has"),
					value = _this.val().replace(/^ +| +$/g,'');
					if(has == undefined){
						has = false;
					}
					checkForm(has,_this,value);
				});
				// 正则校验 div 模拟 select
				$(form_id+" .divSelect").each(function(){
					var _this = $(this),
					has = _this.attr("has"),
					value = _this.find("cite").html(),
					valueID = _this.find("input").val();
					checkForm(has,_this,valueID);
				});
				// 信息是否通过校验
				if(submitType){
					callback & callback();
				}else{
					return false;// error!
				}
			}
			// 二次校验
			$(form_id+" input[type='text']").die().live("blur",function(){
				var _this = $(this),
				only = _this.attr("only"),
				url = _this.attr("url"),
				has = _this.attr("has"),
				value = _this.val().replace(/^ +| +$/g,'');
				_this.val(_this.val().replace(/^ +| +$/g,''));
				// 唯一校验
				if(only && value !=""){
					// 遍历正则
					$.each(json, function(k,v){
						// 是否需要校验
							if(k == has){
								// 正则是否匹配
								if(v.test(value)){
									// 进行二次校验
									$.post(url,{"value":value},function(msg){
										if(!msg.error_code){
											_this.addClass("onlyError")
											.attr("em",_this.siblings("em").html())
											.siblings("em")
											.addClass("red")
											.html(msg.error_msg.value)
											.show();
											//console.log("唯一校验失败！");
										}else {
											_this.removeClass("onlyError");
											//console.log("唯一校验成功！");
										}
									},"json");
								}
							}
					});
				}
			});
			$(form_id+" input,"+form_id+" select,"+form_id+" textarea,"+form_id+" .divSelect").die();
			// 鼠标hover时，显示输入框的提示信息
			$(form_id+" input,"+form_id+" select,"+form_id+" textarea,"+form_id+" .divSelect").one().live("mouseover",function(e){
				// 判断是否有 “cite” 提示标签
				var _this = $(this),
				$cite = _this.siblings("cite").html();
				// 是否有 cite 提示
				if($cite){
					$.citeFn(_this,e);
				}else {
					var emTxt = _this.attr("em");
					if(emTxt){
						_this.siblings("em").html(emTxt).removeClass("red").show();
					}else {
						_this.siblings("em").removeClass("red").show();	
					}
				}
			});
			$(form_id+" input,"+form_id+" select,"+form_id+" textarea,"+form_id+" .divSelect").one().live("mouseleave",function(e){
				var _this = $(this),
				$cite = _this.siblings("cite").html();
				if($cite){
					_this.siblings("cite").attr("style","").find("div.citeico").remove();
					_this.siblings("cite").hide();
				}
				_this.siblings("em").hide();
			});
			$(submit_id).die().live("click",function(){
				checkTo();
			});
		},
		/**
		 *	div 模拟alert 弹窗
		 *	用法：（obj 存在）
		 * 
                
		 * 		第一种用法：
		 		$.alert(['#id', {
                    "phone": /^1([3|5|6|7|8])\d{9}$/, // 表单正则
                }],function(){
                    // ("这里是回调！");
                });
		  		第二种用法：不需要 id class 自动生成带有提示内容的 alert 模拟窗。
		  		$.alert("提示信息",function(obj){
		            // ("这里是回调！");
		            
		        });
		  		第三种用法：不需要 id class 自动生成带有、标题、提示内容、按钮文字的 alert 模拟窗。
		  		$.alert(["标题","内容（333）","按钮名称"],function(obj){
		            // ("这里是回调！");
		            
		        });
         *
		 * 
		 *	用法： （obj 不存在＝纯文字提示内容alert）
		 * 
		 * 
		 */
		alert(jsons,callback){
			// 初始化alert弹窗下的chForm表单数据
			var obj = jsons[0],// 元素 id 是否存在
			json = jsons[1],// 元素 正则 是否存在
			oDiv,oBtn,oBtnClose,
			$obj = $(obj).html(),
			ifForm = $(obj+" .ckForm").html();
			if(ifForm){
				$(obj+" .ckForm input[type!='hidden'],"+obj+" .ckForm select").each(function(){
					var _this = $(this),
					noEmpty = _this.attr("noEmpty");
					if(!noEmpty){
						_this.val("");
					}
					_this.siblings("em").hide();
				});
				$(obj+" .ckForm .divSelect").each(function(){
					var _this = $(this),
					noEmpty = _this.attr("noEmpty");
					if(!noEmpty){
						_this.find("span").html("请选择");
						_this.find("input[type='hidden']").val("");
					}
					_this.siblings("em").hide();
				});
			}
			// 每触发一次本方法，记录触发元素
			altArr.push(obj); 
			// alert弹窗的 确定／关闭 点击事件
			function oBtns(oDiv,oBtn,oBtnClose){
				// 关闭窗口设置
				function setAltArr(){
					altArr.pop();
					if(altArr.length == 0){
						$(oDiv+",.load").hide(); // 关闭弹窗与遮罩层
					}else {
						$(oDiv).hide();
					}
				}
				// 是否回调
				function ifCallback(){
					setAltArr();
					callback && callback();
				}
				if(json){
					var formID,formBtn;
					formID = oDiv+" .ckForm";
					formBtn = oDiv+" a.alert_btn_yes";
					$.ckForm(formID,formBtn,{"json":json,"alertCheck":"alertCheck"},function(){
						ifCallback();
					});
					oBtn.one().live("click",function(){
						ifalertlength(); // 设置alert弹窗层级
					});
				}else {
					
					oBtn.die().live("click",function(){
						ifCallback();
						ifalertlength(); // 设置alert弹窗层级
					});
				}
				oBtnClose.die().live("click",function(){
					setAltArr();
					ifalertlength(); // 设置alert弹窗层级
				});
			}
			// load 遮罩层是否已存在页面中
			if($(".divAppendHtml").length == 0)$("body").append('<!-- js生成代码 --><div class="divAppendHtml"></div>');
			if($(".load").length == 0)$(".divAppendHtml").append('<div class="load"></div>');
			$(".load").show();
			//  显示对应 alert 弹窗
			if($obj != undefined){
				oDiv = obj,
				oBtnClose = $(oDiv).find("span.alert_btn_no"),
				oBtn = $(oDiv).find("a.alert_btn_yes");
				oBtns(oDiv,oBtn,oBtnClose);
				$(oDiv).attr("style","").center();
				$(oDiv).show();
			}else {
				// 显示（生成）公用 alert 弹窗
				var oAlertHtml = '<div id="alert" class="alert">';
						oAlertHtml += '<div class="alert_title">';
							oAlertHtml += '<div class="fl">提示</div>';						
							oAlertHtml += '<span class="pic alert_btn_no"></span>';
						oAlertHtml += '</div>';
						oAlertHtml += '<div class="alert_cont">';
						oAlertHtml += obj;
						oAlertHtml += '</div>';
							oAlertHtml += '<div class="alert_btn_box">';
								oAlertHtml += '<a class="btn alert_btn_yes" href="javascript:;">确定</a>';
							oAlertHtml += '</div>';
					oAlertHtml += '</div>';
				// 判断公用 alert 是否存在，如果已存在，不再插入Html代码。
				if($("#alert").length == 0){
					// 不存在,直接插入提示信息
					$("body").append(oAlertHtml);
				}else {
					// 已存在, 重置 提示信息
					$("#alert").find("div.alert_cont").html(obj);
				}
				// 显示弹窗，并居中
				$("#alert").attr("style","").center();
				$("#alert").show();
				// 判断obj是string（提示信息）还是Array（数组）   ｜   判断id不存在时，是第二种 $.alert() 提示方式，还是第三种
				if(obj.constructor == Array){
					//如果obj是数组（第三种 $.alert() 使用方式） ，遍历数组，插入对应提示内容
					$("#alert .alert_title div").html(obj[0]);
					$("#alert .alert_cont").html(obj[1]);
					$("#alert .alert_btn_yes").html(obj[2]);
				}else {
					//如果obj是字符串（第二种 $.alert() 使用方式） ，直接吧obj（字符串）插入提示内容中
					$("#alert .alert_title div").html("提示");
					$("#alert .alert_cont").html(obj);
					$("#alert .alert_btn_yes").html("确定");
				}
				oDiv = "#alert",
				oBtn = $("#alert .alert_btn_yes"),
				oBtnClose = $("#alert .alert_btn_no");
				oBtns(oDiv,oBtn,oBtnClose);
			}
			// 判断目前有几个弹窗
			if(altArr.length != 1){
				ifalertlength(); // 设置alert弹窗层级
			}
			// 设置下一个弹窗的层级
			function ifalertlength(){
				if(altArr.length > 1){
					$(".alert").css("z-index","1000");
					var objHtml = $(altArr[altArr.length-1]).html();
					if(objHtml == undefined){
						$("#alert").css("z-index","2000");
					}else {
						$(altArr[altArr.length-1]).css("z-index","2000");
					}	
				}else {
					$(".alert").css("z-index","2000");
				}
			}
			//拖拽 
			var id;
			if($obj != undefined){
				id = obj;
			}else {
				id = "#alert";
			}
			var _move=false;//移动标记 
			var _x,_y;//鼠标离控件左上角的相对位置 
			$(id+" .alert_title").mousedown(function(e){
				_move=true; 
				_x=e.pageX-parseInt($(id).css("left")); 
				_y=e.pageY-parseInt($(id).css("top")); 
				$(id).css("opacity","0.8");//点击开始拖动并透明显示 
			}); 
			$(document).mousemove(function(e){
				if(_move){ 
					var x=e.pageX-_x;//移动时鼠标位置计算控件左上角的绝对位置 
					var y=e.pageY-_y; 
					$(id).css({top:y,left:x});//控件新位置 
					return false;
				} 
			}).mouseup(function(){ 
				_move=false; 
				$(id).css("opacity","1");//松开鼠标后停止移动并恢复成不透明 
			}); 
		},
		
		
    });
})(jQuery);
