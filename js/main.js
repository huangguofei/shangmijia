//window.APIBASEURL = "http://192.168.1.124:8080";
window.APIBASEURL = "http://demo.sinsinet.com";
//window.APIBASEURL = "";
var loadOtherInfoUrl = APIBASEURL + "/smj/app/baseinfo/selectbaseinfo";
var loadCollectInfoUrl = APIBASEURL + "/smj/app/collectioncontroller/selectcollection";
var cancelCollectUrl = APIBASEURL + "/smj/app/collectioncontroller/deletecollection";
var storeCommentUrl = APIBASEURL + "/smj/app/ucommentcontroller/subinsertucomment";
var getPhoneCodeUrl = APIBASEURL + "/smj/web/seller/getCode";
var verifyPhoneCodeUrl = APIBASEURL + "/smj/app/usercontroller/setPhone";
var getPayInfoUrl = APIBASEURL + "/smj/pay";
//var showImgUrl = APIBASEURL+"/smj/app/shop/showImg?path=";
var showImgUrl = "http://demo.sinsinet.com" + "/smj/app/shop/showImg?path=";
var openLoginUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa5776b8fc59adea5&redirect_uri=http%3A%2F%2Fdemo.sinsinet.com%2Fsmj&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
window.storeType = ["半包", "清包", "泥工", "木工", "水电工", "监理", "其他"];
window.liveType = ["验房量房", "设计", "拆改", "水电", "泥工", "木工", "油漆", "完工", "软装", "入住"];
window.houseType = ["一居室", "二居室", "三居室", "三居室以上", "小平层", "别墅"];
window.decorationType = ["现代简约", "地中海风格", "田园风格", "简中风格", "新中式风格", "北欧风格", "日式风格", "东南亚风格", "混搭风格", "小美风格"];
window.serverTypeData = ["半包", "清包", "泥工", "木工", "水电工", "监理", "其他"];
window.goodatData = ["家居住宅", "别墅豪宅", "办公室", "酒店", "餐厅", "咖啡厅", "酒吧ktv", "商业展示", "医院",
	"幼儿园", "会所", "样板房", "售楼处", "文化空间", "运动空间"
];
window.materialData = ["灯饰照明", "卫浴用品", "厨房用品", "家具软装", "全屋定制", "生活电器", "墙地面", "建材五金", "其他"];
window.billType = ["设计费", "施工费", "建材购买", "电器", "家具", "软装配饰", "其他"];
window.orderSatus = ["拼团中", "待付款", "待付尾款", "待收货", "交易完成", "交易取消", "申请取消", "拼团失败"];
//获取企业服务
function loadStoreServerTypeCN(text) {
	var str = "";
	if(text) {
		text = text.split("");
		text = text.sort();
		for(var i in text) {
			str += storeType[text[i]];
			if(i != text.length - 1) {
				str += "，";
			}
		}
	}
	return str;
}
//获取企业类型
function loadStoreType(index) {
	if(index) {
		if(index == 15) {
			return "个";

		} else {
			return "企";
		}
	}
}

function changeTime(dateCode, format) { //yyyy-MM-dd hh-mm-ss
	if(dateCode) {
		var date = new Date(parseInt(dateCode));
		return date.format(format);
	}
}
Date.prototype.format = function(format) {
	if(!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	var o = {
		"M+": this.getMonth() + 1, //month  
		"d+": this.getDate(), //day  
		"h+": this.getHours(), //hour  
		"m+": this.getMinutes(), //minute  
		"s+": this.getSeconds(), //second  
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter  
		"S": this.getMilliseconds() //millisecond  
	}
	if(/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}
//获取 url 参数值
$.getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = w.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};
//获取url参数对象
$.getQueryObject = function(url) {
	url = url || window.location.href;
	var search = url.substring(url.lastIndexOf("?") + 1);
	var obj = {};
	var reg = /([^?&=]+)=([^?&=]*)/g;
	search.replace(reg, function(rs, $1, $2) {
		var name = decodeURIComponent($1);
		var val = decodeURIComponent($2);
		val = String(val);
		obj[name] = val;
		return rs;
	});
	return obj;
};
//对象转 url 参数
$.toQueryString = function(obj, full) {
	if(!obj) {
		return "";
	}
	var resQS = "";
	for(p in obj) {
		if(p) {
			resQS += "&" + p + "=" + encodeURIComponent(obj[p]);
		}
	}
	if(!resQS) {
		return "";
	}
	return(full ? "?" : "") + resQS.substring(1);
};
/*
 *ajax 扩展  
 * */
$.ajaxPost = function(url, data, successcallback, errorcallback) {
	$.ajaxBase("POST", url, data, successcallback, errorcallback);
};
$.ajaxPatch = function(url, data, successcallback, errorcallback) {
	$.ajaxBase("PATCH", url, data, successcallback, errorcallback);
};
$.ajaxGet = function(url, successcallback, errorcallback) {
	$.ajaxBase("GET", url, null, successcallback, errorcallback);
};
$.ajaxPut = function(url, data, successcallback, errorcallback) {
	$.ajaxBase("PUT", url, data, successcallback, errorcallback);
};
$.ajaxByAction = function(action, url, data, successcallback, errorcallback) {
	$.ajaxBase(action == "add" ? "POST" : "PUT", url, data, successcallback, errorcallback);
};
$.ajaxDelete = function(url, data, successcallback, errorcallback) {
	$.ajaxBase("DELETE", url, data, successcallback, errorcallback);
};
$.ajaxBase = function(type, url, data, successcallback, errorcallback) {
	//IE
	if(!$.support.cors)
		$.support.cors = true;

	//AJAX超时s，0-不超时
	var tmp_timeout = 30000;
	if(data) {
		//data.userId = getCookie("userId");
		data.tokenUser = getCookie("tokenUser");
	}
	if(type == "DELETE" || type == "PUT") {
		data._method = type;
	}
	if(type != "GET") {
		if(!data) {
			data = {
				_method: type
			};
		} else {
			data["_method"] = type;
		}
		if(data["timeout"] && !isNaN(data["timeout"])) {
			tmp_timeout = data["timeout"];
		}
	}

	$aj = $.ajax({
		type: (type == "GET" ? "GET" : "POST"),
		url: url,
		//30s
		timeout: tmp_timeout,
		data: data,
		//contentType: (type == "GET" ? "text/plain" : "application/json"),
		dataType: "json",
		complete: function(XMLHttpRequest, status) {
			if(status == 'timeout') {
				$.toast("请求超时。", "text");
				$aj.abort();
			}　　
		},
		success: function(response) {
			console.log(response)
			if(response.code > 0) {
				//$.processFailResponse(response);
			}
			if(successcallback)
				successcallback(response);

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest)
			if(errorcallback)
				errorcallback(textStatus, errorThrown);
			else {
				$.toast("服务器返回错误：" + textStatus, "text");
			}
		}
	});
};

function Controller(container, callback) {
	var models = {};
	var views = Array.prototype.slice.call(document.querySelectorAll((container || '') + ' [bind]'), 0);
	views.forEach(function(view) {
		var modelName = view.getAttribute('bind');
		//新增多级对象 data.user.name
		if(modelName.indexOf(".") > 0) {
			var modelNameArr = modelName.split(".");
			var modelObj = models[modelNameArr[0]];
			if(!modelObj) {
				models[modelNameArr[0]] = new Model();
				modelObj = models[modelNameArr[0]];
			}
			modelObj.bind(view);
		} else {
			(models[modelName] = models[modelName] || new Model()).bind(view);
		}
	});
	if(callback)
		callback.call(this, models);

	//return JSON object
	this.getJSON = function() {
		var resJson = {};
		for(var p in models) {
			if(p.indexOf("__") == 0) {
				continue;
			}
			if(typeof(models[p]) == "object") {
				resJson[p] = models[p]._value;
			}
		}
		return resJson;
	};

	//set value
	this.set = function(model, callback) {
		for(p in model) {
			if(!p || p == "") {
				continue;
			}
			if(!models[p]) {
				models[p] = models[p] || new Model();
			}
			models[p].set(model[p], callback);
		}
		if(callback) callback();
		return models;
	};
	//return models;
}
//清空提示
$.clearGritter = function() {
	$("#gritter-notice-wrapper").html("");
};

function Model(value) {
	this._value = typeof value === 'undefined' ? '' : value;
	this._listeners = [];
}
Model.prototype.set = function(value) {
	var self = this;
	self._value = value;
	//setTimeout(function() {
	self._listeners.forEach(function(listener) {
		listener.call(self, value);
	});
	//});
};
Model.prototype.watch = function(listener) {
	this._listeners.push(listener);
};
Model.prototype.bind = function(node) {
	this.watch(function(value) {
		var bindName = node.getAttribute("bind");
		//新增多级对象 data.user.name
		if(bindName.indexOf(".") > 0) {
			var bindNameArr = bindName.split(".");
			for(var i = 1; i < bindNameArr.length; i++) {
				if(!value) {
					break;
				}
				value = value[bindNameArr[i]];
			}
		}
		//设置值到页面     
		var tagName = node.tagName;
		if(tagName == "INPUT" || tagName == "SELECT") {
			var typeName = node.getAttribute("type");
			if(typeName == "checkbox") {
				node.checked = value;
			} else if(typeName == "radio") {
				var radioes = document.getElementsByName(node.name);
				for(var i = 0; i < radioes.length; i++) {
					radioes[i].checked = (radioes[i].value == value);
				}
			} else {
				node.value = value;
			}
		} else {
			node.innerHTML = value;
		}
	});

	//listen change event
	var mPrototype = this;
	if(node) {
		mPrototype._value = node.value;
		node.onchange = function() {
			var typeName = this.getAttribute("type");
			var currNodeIsCheckbox = typeName == "checkbox";
			var bindName = this.getAttribute("bind");
			var newValue = currNodeIsCheckbox ? this.checked : this.value;

			//新增多级对象 data.user.name
			if(bindName.indexOf(".") > 0) {
				mPrototype._value = mPrototype._value || {};
				var oldValue = mPrototype._value;
				var bindNameArr = bindName.split(".");
				if(bindNameArr.length == 2) {
					oldValue[bindNameArr[1]] = newValue;
				} else if(bindNameArr.length == 3) {
					oldValue[bindNameArr[1]][bindNameArr[2]] = newValue;
				}
			} else {
				mPrototype._value = newValue;
			}
		}
		//		node.addEventListener("change", function() {
		//			var typeName = this.getAttribute("type");
		//			if (typeName == "checkbox") {
		//				mPrototype._value = this.checked;
		//			} else
		//				mPrototype._value = this.value;
		//				
		//				alert(this.value);
		//		});
	}
};
//表单输入验证
function inputValidateForGritter(container, positionclass) {
	container = container || "body";
	var inputRes = true;
	$(container + " [nulltip]," + container + " [valitype]").each(function() {
		var cValue = $(this).val();
		//ie
		if($(this).attr("placeholder") == cValue)
			cValue = null;
		if(!cValue) {
			var nulltip = $(this).attr("nulltip");
			if(!nulltip)
				return true;

			$.clearGritter();
			$.alert("{N} 不能为空，请输入。".replace(/{N}/g, nulltip));
			$(this).focus();
			inputRes = false;
			return false;
		} else {
			var nulltip = $(this).attr("nulltip");
			var valitype = $(this).attr("valitype");
			var tipTxt = "";
			if(valitype == "mobile") {
				inputRes = mobileValidate(cValue);
				tipTxt = "手机号码格式有误，请检查，<br>（如：13883000000）";
			} else if(valitype == "email") {
				inputRes = emailValidate(cValue);
				tipTxt = "邮箱格式有误，请检查，<br>（如：name@baidu.com）";
			} else if(valitype == "password") {
				var rangeArr = $(this).attr("valirange").split('-');
				if(cValue.length > parseInt(rangeArr[1]) || cValue.length < parseInt(rangeArr[0])) {
					inputRes = false;
				}
				tipTxt = $(this).attr("valitip");
			} else if(valitype == "url") {
				inputRes = urlValidate(cValue);
				tipTxt = "网络地址有误，请检查，<br>（如：http://t.cn）";
			} else if(valitype == "tel") {
				inputRes = telValidate(cValue);
				tipTxt = nulltip + "号码有误，请检查，<br>（如：023-8666666、98988888）";
			}
			if(!inputRes) {
				$.clearGritter();
				$.toast(tipTxt, "text");
				//				$.showErrorGritter(tipTxt, {
				//					time: 3000,
				//					position: positionclass
				//				});
				$(this).focus();
				return false;
			}
		}
	});
	return inputRes;
}

function setCookie(name, value) {
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	if(expires != null) {
		var LargeExpDate = new Date();
		LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
	}
	document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}

function getCookie(name) {
	//	var search = name + "="
	//	if(document.cookie.length > 0) {
	//		offset = document.cookie.indexOf(search)
	//		if(offset != -1) {
	//			offset += search.length
	//			end = document.cookie.indexOf(";", offset)
	//			if(end == -1) end = document.cookie.length
	//			return unescape(document.cookie.substring(offset, end))
	//		} else return ""
	//	}
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function deleteCookie(name) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
	delCookie([name]);
	setCookie(name, "", expdate);
}
//清除全部cookie
function clearCookie() {
	deleteCookie("data");
	delAllCookie();
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
	}
}

function delAllCookie() {
	var myDate = new Date();
	myDate.setTime(-1000); //设置时间    
	var data = document.cookie;
	var dataArray = data.split("; ");
	for(var i = 0; i < dataArray.length; i++) {
		var varName = dataArray[i].split("=");
		document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
	}

}
//删除cookies 
function delCookie(data) {
	if(data) {
		for(var i in data) {
			var name = data[i];
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = getCookie(name);
			if(cval != null)
				document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	}
}
//获取全部cookie
function getAllCookie() {
	var cookie = document.cookie.split(";");
	var cookieData = {};
	for(var i in cookie) {
		cookieData[cookie[i].split("=")[0].replace(" ", "")] = unescape(cookie[i].split("=")[1]);
	}
	console.log(cookieData);
	return cookieData;
}
//存登录信息
function savaLoginInfo(data) {
	for(var i in data.data.user) {
		if(i == "token") {
			setCookie("tokenUser", data.data.user[i]);
			continue;
		}
		setCookie(i, data.data.user[i]);
	}
}

function savecookie(data) {
	if(data) {
		for(var i in data) {
			setCookie(i, data[i]);
		}
	}
}
//进度条动画
function progressAnimation() {
	$(".weui-progress").each(function(i, el) {
		var width = 0;
		var max = $(this).data("max");
		var index = $(this).data("index");
		var maxWidth = index / max * 100;
		if(max <= index)
			maxWidth = 100;
		var set = setInterval(function() {
			if(width > maxWidth) {
				clearInterval(set);
			} else {
				$(el).find(".weui-progress__inner-bar").width(width + "%");
				width++;
			}
		}, 10);
	});
}
//返回差团人数
function loadGroupNum(num, max) {
	num = parseInt(num);
	max = parseInt(max);
	if(max <= num) {
		console.log(max - num)
		return 0;
	} else {
		return max - num;
	}
}
//返回星级
function showLevel(level) {
	var levelStr = "";
	var str1 = "<img src=\"img/wujiaoxing3.png\">";
	var str2 = "<img src=\"img/wujiaoxing1.png\">";
	var str3 = "<img src=\"img/wujiaoxing2.png\">";
	if(level) {
		var a = parseInt(level);
		var b = (level % 1 > 0 ? 1 : 0);
		var c = 5 - (a + b);
		for(var i = 0; i < a; i++) {
			levelStr += str1;
		}
		levelStr += (b == 1 ? str2 : "");
		for(var i = 0; i < c; i++) {
			levelStr += str3;
		}
	} else {
		levelStr = str3 + str3 + str3 + str3 + str3;
	}
	return levelStr;
}

function loginJudge() {
	if(!getCookie("userId")) {
		$.confirm("当前未登录,是否登录?", "登录提醒", function() {
			window.location.href = openLoginUrl;
		}, function() {
			window.location.href = 'main.html';
		});
	} else {
		return true;
	}
}

function loadOtherInfo() {
	$.ajaxGet(loadOtherInfoUrl, function(res) {
		if(res.status == 0) {
			console.log(res);
			for(var i in res.data.baseInfo) {
				sessionStorage.setItem(i, res.data.baseInfo[i]);
			}
		}
	});
}

function loadCollectInfo(id) { //加载收藏信息
	var data = sessionStorage.collectData;
	if(data) {
		var data = JSON.parse(data);
		for(var i in data) {
			var d = data[i].gpid || data[i].ntid || data[i].spid;
			if(d == id) {
				return data[i];
			}
		}
		return false;
	}
}

function collectData() {
	if(!getCookie("userId"))
		return false;
	$.ajaxGet(loadCollectInfoUrl + "?userId=" + getCookie("userId") + "&tokenUser=" + getCookie("tokenUser"), function(res) {
		if(res.status == 0) {
			console.log(res);
			sessionStorage.setItem("collectData", JSON.stringify(res.data));
		} else {
			$.alert("加载收藏失败");
		}
	});
}

function cancelCollect(id, callback) {
	if(id) {
		$.ajaxDelete(cancelCollectUrl, {
			collectionId: id,
			userId: getCookie("userId"),
			tokenUser: getCookie("tokenUser")
		}, function(res) {
			if(res.status == 0) {
				$.toast("取消收藏成功!");
				callback && callback();
				collectData();
			} else {
				$.alert("取消收藏失败");
			}
		});
	}
}
//加载评论信息
function showComment(data) {
	console.log(data)
	var str = "";
	if(data) {
		for(var i in data) {
			var d = data[i];
			var name = (d.isAnonyMous == 10 ? "匿名用户" : d.userName);
			str += "<p class=\"color-66 comment-body\" data-noteid='" + d.noteId + "' data-userid='" + d.userId +
				"' data-id='" + d.uCommentId + "'><span class=\"send-name\">" + name + "</span>：" + d.content + "</p>";
			var childrenData = d.uComment.concat(d.sComment);
			for(var j in childrenData) {
				var b = childrenData[j];
				var _name = b.isAnonyMous == 10 ? "匿名用户" : (b.username || b.shopname);
				str += "<p class=\"color-66\"><span class=\"send-name\">" + _name +
					"</span>回复<span class=\"send-name\">" + name + "</span>：" + b.content + "</p>";
			}
		}
	}
	return str;
}
//显示图片
function loadImg(src, callback) {
	if(src) {
		$.ajaxGet(showImgUrl + "?path=" + src, function(res) {
			if(res.status == 0) {
				callback(res);
			} else {
				//$.alert("获取图片路径失败:" + res.msg);
			}
		});
	}
}

function commentEvent() {
	$(".comment-body").unbind("tap").tap(function() {
		if(!loginJudge())
			return false;
		var _this = this;
		$.commentPage({
			title: '回复' + $(this).children(".send-name").text(),
			input: '说点什么',
			empty: false, // 是否允许为空
			onOK: function(input, isSelect) {
				console.log(arguments);
				postReplyData(input, isSelect ? 10 : 11);
			},
			onCancel: function() {}
		});

		function postReplyData(input, index) {
			var data = {
				noteId: $(_this).data("noteid"),
				cuserId: getCookie("userId"),
				tokenUser: getCookie("tokenUser"),
				content: input,
				buserId: $(_this).data("userid"),
				aUcommentId: $(_this).data("id"),
				isAnonyMous: index
			}
			console.log(data)
			$.ajaxPost(storeCommentUrl, data, function(res) {
				if(res.status == 0) {
					$(".handle-list[data-id=" + $(this).data("noteid") + "] .comment i").text(res.data[0].cu);
					$(_this).after("<p class=\"color-66\"><span class=\"send-name\">" + (index == 10 ? "匿名用户" : getCookie("username")) + "</span>回复<span class='send-name'>" +
						$(_this).children(".send-name").text() + "</span>：" + input + "</p>");
					$.toast("回复成功");
				} else {
					$.alert("回复失败");
				}
			});
		}
	});
}

function liveHandle() {
	commentEvent();
	$(".handle-list .praise").unbind("tap").tap(function() {
		if(!loginJudge())
			return false;
		var _this = this;
		$.ajaxPost(APIBASEURL + "/smj/app/messagecontroller/inserthelp", {
			"userId": getCookie("userId"),
			"tokenUser": getCookie("tokenUser"),
			"noteId": $(this).parent().data("id")
		}, function(res) {
			if(res.status == 0) {
				$(_this).find("i").text(res.data[0].zan);
				$.toast('点赞成功');
			} else {
				$.alert("点赞失败");
			}
		});
	});
	$(".handle-list .collect").unbind("tap").tap(function() {
		if(!loginJudge())
			return false;
		var _this = this;
		var collectionId = $(this).parent().attr("collectid");
		if(collectionId) {
			$.ajaxDelete(cancelCollectUrl, {
				"userId": getCookie("userId"),
				"tokenUser": getCookie("tokenUser"),
				"collectionId": collectionId
			}, function(res) {
				if(res.status == 0) {
					$(_this).parents(".live").remove();
					$.toast('取消收藏成功');
					//					$(_this).find("i").text();
					$(_this).children("img").attr("src", "img/shoucang2.png");
					$(_this).parent().removeAttr("collectid");
					collectData();
				} else {
					$.alert("取消收藏失败");
				}
			});
			return false;
		}
		$.ajaxPost(APIBASEURL + "/smj/app/collectioncontroller/insertnote", {
			"userId": getCookie("userId"),
			"tokenUser": getCookie("tokenUser"),
			"noteId": $(this).parent().data("id")
		}, function(res) {
			if(res.status == 0) {
				$(_this).find("i").text(res.data.collectionCount[0].cl);
				$.toast('收藏成功');
				$(_this).children("img").attr("src", "img/soucang3.png");
				$(_this).parent().attr("collectid", res.data.collectionId);
				collectData();
			} else {
				$.alert("收藏失败");
			}
		});
	});
	$(".handle-list .comment").unbind("tap").tap(function() {
		replyOrComment("com", $(this).parent().data("id"));
	})
}

function replyOrComment(type, id, name) {
	if(!loginJudge())
		return false;
	if(type == "com") {
		$.commentPage({
			title: '评论',
			input: '说点什么',
			empty: false, // 是否允许为空
			onOK: function(input, isSelect) {
				console.log(arguments);
				postData(input, isSelect ? 10 : 11);
			},
			onCancel: function() {
				//点击取消
			}
		});

		function postData(input, isAnonyMous) {
			console.log(arguments)
			$.ajaxPost(APIBASEURL + "/smj/app/ucommentcontroller/insertucomment", {
				"userId": getCookie("userId"),
				"tokenUser": getCookie("tokenUser"),
				"noteId": id,
				"content": input,
				"isAnonyMous": isAnonyMous
			}, function(res) {
				if(res.status == 0) {
					$(".handle-list[data-id=" + id + "] .comment i").text(res.data.listsum[0].cu);
					$(".handle-list[data-id=" + id + "]").next().append("<p class=\"color-66 comment-body\" data-noteid='" + res.data.noteId + "' data-userid='" +
						getCookie("userId") + "' data-id='" + res.data.ucId + "'><span class=\"send-name\">" +
						(isAnonyMous == 10 ? "匿名用户" : getCookie("username")) + "</span>：" + input + "</p>");
					$.toast("评论成功");
					commentEvent();
				} else {
					$.alert("评论失败");
				}
			});
		}
	} else {
		$.commentPage({
			title: '回复',
			//text: '内容文案',
			input: '说点什么',
			empty: false, // 是否允许为空
			onOK: function(input, isSelect) {
				console.log(arguments);
				postData(input, isSelect ? 10 : 11);
			},
			onCancel: function() {
				//点击取消
			}
		});
	}
}

function viewDeclare() { //查看申明
	var str = "<article class=\"group-shopping-rule page-box\">" +
		"<div class=\"page-bg\"></div>" +
		"<div class=\"page-content\">" +
		"<h2 class=\"text-center\">免责声明</h2>" +
		"<div class=\"text-left statement-content color-66\" style=\"margin: 1rem .5rem 0.5rem .5rem;overflow: auto;\">" + sessionStorage.declaim + "</div>" +
		"<input type=\"button\" class=\"weui-btn page-btn\" value=\"确定\" onclick=\"$('.group-shopping-rule').remove();\" />" +
		"</div></article>";
	$("body").append(str);
	$(".statement-content").css("max-height", $(window).outerHeight(true) - 250);
	$(".page-bg").tap(function() {
		$('.group-shopping-rule').remove();
	});
}

function setPayInfo(data, type) {
	console.log(arguments);
	if(data) {
		data.tokenUser = getCookie("tokenUser");
		data.total_fee = data.total_fee * 100;
		data.body = "尚米家-" + data.body;
		$.ajaxPost(getPayInfoUrl, data, function(res) {
			//			if(res.status == 0) {
			var datas = {
				"appId": res.appId, //公众号名称，由商户传入     
				"timeStamp": res.timeStamp, //时间戳，自1970年以来的秒数     
				"nonceStr": res.nonce_str, //随机串     
				"package": res.Package,
				"signType": res.signType, //微信签名方式：     
				"paySign": res.paySign, //微信签名 
				"orderId": data.orderId
			}
			payMany(datas, type);
			//			} else {
			//				$.alert("生成订单失败:" + res.msg);
			//			}
		});
	}
}

function payMany(data, type) {
	if(data)
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', data,
			function(res) {
				if(res.err_msg == "get_brand_wcpay_request:ok") {
					//支付成功后的跳转页面
					$.toast("支付成功" + data.orderId);
					location.href = APIBASEURL + "/smj/smj/offered-succed.html?type=" + type + "&id=" + data.orderId;
				} else {
					if(confirm("支付失败，是否重新支付?")) {
						payMany(data, type);
					}
				} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			}
		);
}

function pay() {
	if(typeof WeixinJSBridge == "undefined") {
		if(document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if(document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}
}

function manyChange(many) {
	if(many) {
		return many * 100;
	}
}
$.commentPage = function(options) {
	var o = "<div class=\"weui-mask comment-page weui-mask--visible\"></div>" +
		"<div class=\"weui-dialog comment-page weui-dialog--visible\"><div class=\"weui-dialog__hd\">" +
		"<strong class=\"weui-dialog__title\">" + options.title + "</strong></div><div class=\"weui-dialog__bd\">" +
		"<p class=\"weui-prompt-text\"></p><input type=\"text\" class=\"weui-input weui-prompt-input\" " +
		"id=\"weui-prompt-input\" placeholder=\"" + options.input + "\"></div><div style='margin-top:0' class='weui-cells text-left weui-cells_checkbox'>" +
		"<label class=\"weui-cell weui-check__label\" for=\"s11\"><div class=\"weui-cell__hd\">" +
		"<input type=\"checkbox\" class=\"weui-check\" name=\"checkbox1\" id=\"s11\" checked=\"checked\">" +
		"<i class=\"weui-icon-checked\"></i>" +
		"</div>" +
		" <div class=\"weui-cell__bd\">是否匿名</div>" +
		"</label></div><div class=\"weui-dialog__ft\">" +
		"<a href=\"javascript:;\" class=\"weui-dialog__btn default btn_cancel\">取消</a><a href=\"javascript:;\"" +
		"class=\"weui-dialog__btn primary btn_ok\">确定</a></div></div>";
	$("body").append(o);
	$(".btn_ok").tap(function() {
		var content = $("#weui-prompt-input").val();
		var isSelect = $(".comment-page .weui-check").is(":checked");
		if(!options.empty)
			if(!content)
				return false;
		options.onOK(content, isSelect);
		$(".comment-page").remove();
	});
	$(".btn_cancel").tap(function() {
		options.onCancel();
		$(".comment-page").remove();
	});
}

function preloadimages(arr) {
	var newimages = [],
		loadedimages = 0
	var postaction = function() {} //此处增加了一个postaction函数
	var arr = (typeof arr != "object") ? [arr] : arr

	function imageloadpost() {
		loadedimages++
		if(loadedimages == arr.length) {
			postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
		}
	}
	for(var i = 0; i < arr.length; i++) {
		newimages[i] = new Image()
		newimages[i].src = arr[i]
		newimages[i].onload = function() {
			imageloadpost()
		}
		newimages[i].onerror = function() {
			imageloadpost()
		}
	}
	return { //此处返回一个空白对象的done方法
		done: function(f) {
			postaction = f || postaction
		}
	}
}

function groupStatusShow(downPay, price, status) {
	console.log(arguments)
	if(downPay == 0 && price == 0 && status == 3) {
		return "已报名";
	} else if(downPay == 0 && price == 0 && status == 5) {
		return "拼团失败";
	} else if(downPay == 0 && price == 0 && status == 4) {
		return "拼团成功";
	} else if(downPay == 0 && price != 0 && status == 2) {
		return "拼团中";
	} else if(downPay != 0 && price != 0 && status == 2) {
		return "待收货";
	}
}

function outLogin() {
	var outLoginUrl = APIBASEURL + "/smj/app/usercontroller/out";
	$.ajaxPost(outLoginUrl, {
		"tokenUser": getCookie("tokenUser")
	}, function(res) {
		if(res.status == 0) {
			$.toast("退出成功");
			clearCookie();
			sessionStorage.setItem("outlogin", "true");
			window.location.href = 'main.html';
		} else {
			$.alert("退出失败");
		}
	});
}

function chgdivimgwh(obj) {
	var width = $(obj).parent().outerWidth();
	var height = $(obj).parent().outerHeight();
	console.log("width:" + width + ",height:" + height);
	var image = new Image();
	image.src = obj.src; //获取图像路径
	var width1 = image.width; //获取图像宽度
	var height1 = image.height; //获取图像高度
	var a1 = height1 / width1;
	var a2 = height / width;
	if(a1 > a2) {
		obj.width = width;
		obj.height = height1 * width / width1;
		//		obj.style.marginTop = '-' + Math.round((obj.height - height) / 2) + 'px';
	} else {
		obj.height = height;
		obj.width = width1 * height / height1;
		//		obj.style.marginLeft = '-' + Math.round((obj.width - width) / 2) + 'px';
	}
}