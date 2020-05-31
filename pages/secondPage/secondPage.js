mui.plusReady(function() {
	var ss = plus.webview.currentWebview().title;
	document.getElementById('headTitle').innerHTML = ss;
	var ic = plus.webview.currentWebview().ic;
	if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('似乎已断开与互联网的连接\n将于3秒后回到主页面', {
			verticalAlign: 'top'
		});
		setTimeout(function() {
			mui.back();
		}, 3000)
		return;
	}
	//这个是请求头的信息的
	mui.ajax(serverUrl, {
		data: {
			//									"strJson": "{'DriverID':'1234567890','UserID': '任务标识','TaskGuid': 'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'NewList','page': '2','rows': '10','keywords': '','Classid': 'AC'}"
			"strJson": "{'DriverID':'1234567890','UserID': '任务标识','TaskGuid': 'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'ClassNewsList','Classid': '" + ic + "'}"
		},
		async: true,
		dataType: 'json', //服务器返回json格式数据  
		type: 'POST', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(item) {
			var info = JSON.parse(item);
			title.info = info;
			var arrayId = new Array(5)
			var j = 0;
			arrayId[0] = info[0].id;
			mui.ajax(serverUrl, {
				data: {
					"strJson": "{'DriverID':'1234567890','UserID': '任务标识','TaskGuid': 'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'NewList','page': '1','rows': '10','keywords': '','Classid': '" + arrayId[0] + " '}"
				},
				async: false,
				dataType: 'json', //服务器返回json格式数据  
				type: 'POST', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；              
				success: function(item) {
					var infohaha = JSON.parse(item);
					message1.info = infohaha.rows;
					//关闭遮罩层
					mui.hideLoading();
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(xhr + "----");
				}
			});
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr + "----");
		}
	});
})

//下面是点击上面的头进行显示相应的头
var a = null;
var title = new Vue({
	el: '#title',
	data: {
		info: [],
	},
	methods: {
		loading: function(id, index) {
			var infohaha;
			var shuju;
			switch(index) {
				case 0:
					break;
				case 1:
					if(message2.info == '' || message2.info == null) {
						qingqiu(id, index);
						message2.info = a;
					}
					break;
				case 2:
					if(message3.info == '' || message3.info == null) {
						qingqiu(id, index);
						message3.info = a;
					}
					break;
				case 3:
					if(message4.info == '' || message4.info == null) {
						qingqiu(id, index);
						message4.info = a;
					}
					break;
				case 4:
					if(message5.info == '' || message5.info == null) {
						qingqiu(id, index);
						message5.info = a;
					}
					break;
				default:

			}
		}
	}
})

function qingqiu(id, index) {
	mui.ajax(serverUrl, {
		data: {
			"strJson": "{'DriverID':'1234567890','UserID': '任务标识','TaskGuid': 'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'NewList','page': '1','rows': '10','keywords': '','Classid': '" + id + "'}"
		},
		async: false,
		dataType: 'json', //服务器返回json格式数据  
		type: 'POST', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；              
		success: function(item) {
			infohaha = JSON.parse(item);
			a = infohaha.rows;
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr + "----");
		}
	});
}
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
var message3 = new Vue({
	el: '#message3',
	data: {
		info: []
	},
	methods: {
		toUrl: function(item, message) {
			lvyouPage(item, message);
		}
	}
})
var message4 = new Vue({
	el: '#message4',
	data: {
		info: []
	},
	methods: {
		toUrl: function(item, message) {
			lvyouPage(item, message);
		}
	}
})
var message5 = new Vue({
	el: '#message5',
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
		url: 'pinglun/lvyouPage.html',
		id: 'lvyouPage',
		extras: {
			title: item,
			message: message
		}
	})
}

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
					height: 50,
					auto: false,
					contentrefresh: "正在加载...",
					contentnomore: '没有更多数据了',
					callback: function() {
						if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
							plus.nativeUI.toast('似乎已断开与互联网的连接\n将于3秒后回到主页面', {
								verticalAlign: 'top'
							});
							setTimeout(function() {
								mui.back();
							}, 3000)
							return;
						}
						var self = this;
						setTimeout(function() {
							var id = '';
							for(i = 0; i <= index; i++) {
								id = document.getElementById('title').children[i].id;
							}
							mui.ajax(serverUrl, {
								data: {
									"strJson": "{'DriverID':'1234567890','UserID': '任务标识','TaskGuid': 'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'NewList','page': '" + (++page) + "','rows': '10','keywords': '','Classid': '" + id + "'}"
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
										self.PullRefresh().disablePullupToRefresh();
									}
									switch(index) {
										case 0:
											message1.info = message1.info.concat(info.rows);
											break;
										case 1:
											message2.info = message2.info.concat(info.rows);
											break;
										case 2:
											message3.info = message3.info.concat(info.rows);
											break;
										case 3:
											message4.info = message4.info.concat(info.rows);
											break;
										case 4:
											message5.info = message5.info.concat(info.rows);
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