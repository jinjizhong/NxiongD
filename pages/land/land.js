function fabu() {
	mui.openWindow({
		url: "Release/Release.html",
		id: "Release.html"
	});
}

//function xiangqing() {
//	mui.openWindow({
//		url: "details/details.html",
//		id: "details.html"
//	});
//}

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
	"Type":'0',
	"Land_area": '',
	"Land_used": '',
	"orderby": 'Land_year',
	"desc": '0'
}
var detailed_data = {};
var page = 1;
mui.init({
	pullRefresh: {
		container: "#pullrefresh",
		down: {
			auto: true,
			style: 'circle',
			callback: function() {
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
						info = JSON.parse(item);
						message.shuju = info.rows;
						if(info.rows == '') {
							mui.toast('没有此类型数据，请重新选择');
						}
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						console.log(xhr + "----");
					}

				})
			}
		},
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: function() {
				detailed_data = {
					"DriverID": "1234567890",
					"UserID": "任务标识",
					"TaskGuid": "b4026263-704e-4e12-a64d-f79cb42962cc",
					"DataType": "LandList",
					"page": ++page,
					"rows": "10",
					"keywords": "",
					"": "A1234567890-",
					"": "A1234567890-",
					"Type":'0',
					"Land_area": '',
					"Land_used": '',
					"orderby": 'Land_year',
					"desc": '0'
				}
				var self = this;
				mui.ajax(serverUrl, {
					data: {
						"strJson": JSON.stringify(detailed_data)
					},
					async: true,
					dataType: 'json', //服务器返回json格式数据  
					type: 'POST', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；              
					success: function(item) {
						console.log(item + '=-====---');
						var info = JSON.parse(item);
						if(info.rows == null || info.rows == '') {
							mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
							mui.toast("没有更多数据了");
							//							mui('#pullrefresh').pullRefresh.scrollTo(1, 1, 100);
							//							mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
						}
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
						message.shuju = message.shuju.concat(info.rows);
						//						self.endPullupToRefresh(true);
					},
					error: function(xhr, type, errorThrown) {
						//异常处理；
						console.log(xhr + "----");
					}
				});
			}
		}
	}
});

var message = new Vue({
	el: '#pullrefresh',
	data: {
		shuju: [],
		haha: '',
		type: '0',
		isquyu: false,
		isleixing: false,
		iszhonghe: false,
		show:true,
		showTwo:true,
		showThree:true,
	},
	methods: {
		toNewsUrl: function(item, id) {
			mui.openWindow({
				url: 'details/details.html',
				id: 'details',
				extras: {
					title: item,
					message: id
				}
			})
		},
		diqu: function(e) {
			strData.Land_area = e,
			detailed_data.Land_area=e,
			this.isquyu = false;
			if(e) {
				document.getElementById('qu').innerText = e;
				this.show = true;
			} else {
				document.getElementById('toggle').innerHTML = '全部区域';
			}
			mui('#pullrefresh').pullRefresh().pulldownLoading();
		},
		typeL: function(e) {
			strData.Land_used = e,
			detailed_data.Land_used = e,
			this.isleixing = false;
			if(e) {
				document.getElementById('lei').innerHTML = e;
			} else {
				document.getElementById('leixing').innerHTML = '全部类型';
			}
			mui('#pullrefresh').pullRefresh().pulldownLoading();
		},
		desc: function(o,d){
			strData.orderby = o,
			strData.desc =d,
			detailed_data.orderby = o,
			detailed_data.desc =d,
			this.iszhonghe = false;
			mui('#pullrefresh').pullRefresh().pulldownLoading();
		},
		toggle: function(e) {
			this.isquyu = !this.isquyu;
			this.show = !this.show;
			this.showTwo = true;
			this.showThree = true;
			this.isleixing = false;
			this.iszhonghe = false;
		},
		leixing: function(e) {
			this.isleixing = !this.isleixing;
			this.showTwo = !this.showTwo;
			this.show = true;
			this.showThree = true;
			this.isquyu = false;
			this.iszhonghe = false;
		},
		zhonghe: function(e) {
			this.iszhonghe = !this.iszhonghe;
			this.showThree = !this.showThree;
			this.show = true;
			this.showTwo = true;
			this.isquyu = false;
			this.isleixing = false;
		}
	}
})

function shaixuan() {

}