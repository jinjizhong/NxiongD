function publish() {
	mui.openWindow({
		url: "Publish/Publish.html",
		id: "Publish.html"
	});
}

function fabu() {
	mui.openWindow({
		url: "Publish/Publish.html",
		id: "Release.html"
	});
}
mui.plusReady(function() {
	var ss = plus.webview.currentWebview().title;
	document.getElementById('headTitle').innerHTML = ss;
	var ic = plus.webview.currentWebview().ic;
	//这个是请求头的信息的
	var strData = {
		"DriverID": "1234567890",
		"UserID": "任务标识",
		"TaskGuid": "b4026263-704e-4e12-a64d-f79cb42962cc",
		"DataType": "LandList",
		"page": "1",
		"rows": "10",
		"keywords": "",
		"": "A1234567890-",
		"": "A1234567890-",
		"Type": "1",
		"Land_area": '',
		"Land_used": '',
		"orderby": 'Land_year',
		"desc": '0'
	}
	mui.ajax(serverUrl, {
		data: {
			"strJson": JSON.stringify(strData)
		},
		async: true,
		dataType: 'json', //服务器返回json格式数据  
		type: 'POST', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(item) {
			console.log(item);
			var info = JSON.parse(item);
			message1.info = info.rows;
			mui.hideLoading()
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr + "----");
		}
	});
})
//下面是点击上面的头进行显示相应的信息
var Data = {
	"DriverID": "1234567890",
	"UserID": "任务标识",
	"TaskGuid": "b4026263-704e-4e12-a64d-f79cb42962cc",
	"DataType": "LandList",
	"page": "1",
	"rows": "10",
	"keywords": "",
	"": "A1234567890-",
	"": "A1234567890-",
	"Type": "2",
	"Land_area": '',
	"Land_used": '',
	"orderby": 'Land_year',
	"desc": '0'
}
document.getElementById('zanshi').addEventListener('tap', function() {
	if(message2.info == '' || message2.info == null) {
		mui.ajax(serverUrl, {
			data: {
				"strJson": JSON.stringify(Data)
			},
			async: false,
			dataType: 'json', //服务器返回json格式数据  
			type: 'POST', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；              
			success: function(item) {
				var infohaha = JSON.parse(item);
				//							console.log(item);
				if(message2.info) {
					message2.info = infohaha.rows;
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr + "----");
			}
		});
	}
})

var message1 = new Vue({
	el: '#message1',
	data: {
		info: []
	},
	methods: {
		toUrl: function(item, message) {
			lvyouPage(item, message);
		}
	}
})
var message2 = new Vue({
	el: '#message2',
	data: {
		info: []
	},
	methods: {
		toUrl: function(item, message) {
			lvyouPage(item, message);
		}
	}
})
//下面是请求路径的
function lvyouPage(item, message) {
	mui.openWindow({
		url: 'detail/detail.html',
		id: 'detail',
		extras: {
			title: item,
			message: message
		}
	})
}
var page = 1;
(function($) {

	//阻尼系数
	var deceleration = mui.os.ios ? 0.0005 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			var page = 1;
			$(pullRefreshEl).pullToRefresh({
				down: {},
				up: {
					callback: function() {
						var shangData = {
							"DriverID": "1234567890",
							"UserID": "任务标识",
							"TaskGuid": "b4026263-704e-4e12-a64d-f79cb42962cc",
							"DataType": "LandList",
							"page": ++page,
							"rows": "10",
							"keywords": "",
							"": "A1234567890-",
							"": "A1234567890-",
							"Type": '',
							"Land_area": '',
							"Land_used": '',
							"orderby": 'Land_year',
							"desc": '0'
						};
						switch(index) {
							case 0:
								shangData.Type = 1;
								break;
							case 1:
								shangData.Type = 2;
								break;
							default:
						}
						if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
							plus.nativeUI.toast('似乎已断开与互联网的连接', {
								verticalAlign: 'top'
							});
							return;
						}
						var self = this;
						setTimeout(function() {
							mui.ajax(serverUrl, {
								data: {
									"strJson": JSON.stringify(shangData)
								},
								async: true,
								dataType: 'json', //服务器返回json格式数据  
								type: 'POST', //HTTP请求类型
								timeout: 10000, //超时时间设置为10秒；              
								success: function(item) {
									console.log(item + 'wocao');
									var info = JSON.parse(item);
									if(info.rows == null || info.rows == '') {
										self.endPullUpToRefresh(true);
//										self.PullRefresh.scrollTo(1, 1, 100);
									}
									switch(index) {
										case 0:
											message1.info = message1.info.concat(info.rows);
											break;
										case 1:
											message2.info = message2.info.concat(info.rows);
											break;
										default:
									}
									self.endPullUpToRefresh(false);
								},
								error: function(xhr, type, errorThrown) {
									//异常处理；
									console.log(xhr + "----");
								}
							});
						}, 1000);
					}
				}
			});
		});
	});
})(mui);