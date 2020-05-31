//横向标签选项数据
var tags = new Vue({
	el: "#sliderSeg",
	data: {
		tags: [{
				name: '推荐',
				vhref: '#item1mobile',
				classobj: {
					"mui-control-item mui-active": true
				}
			},
			{
				name: '热点',
				vhref: '#item2mobile',
				classobj: {
					"mui-control-item": true
				}
			},
			{
				name: '农资',
				vhref: '#item3mobile',
				classobj: {
					"mui-control-item": true
				}
			},
			{
				name: '社会',
				vhref: '#item4mobile',
				classobj: {
					"mui-control-item": true
				}
			},
			{
				name: '政策',
				vhref: '#item5mobile',
				classobj: {
					"mui-control-item": true
				}
			},
			{
				name: '更多>>',
				vhref: '#item6mobile',
				classobj: {
					"mui-control-item": true
				}
			}
		]
	}
});

//热点新闻信息
new Vue({
	el: "#tb_news",
	data: {
		hots: [{
				title: '热烈祝贺“第三届优U团项目品牌招商会”取得圆满成功',
				img: 'http://www.zhongdoukeji.com/d/file/news/gsxw/2017-10-23/31007a8b2d230c4543dff5be60dc3988.png',
				time: '2017-10-23'
			},
			{
				title: '热烈祝贺“第三届优U团项目品牌招商会”取得圆满成功',
				img: 'http://www.zhongdoukeji.com/d/file/news/gsxw/2017-10-23/31007a8b2d230c4543dff5be60dc3988.png',
				time: '2017-10-23'
			}
		]
	}
});
//农资新闻信息
new Vue({
	el: "#item3mobile",
	data: {
		nongzi: [{
			title: "夏粮收购",
			author: "编辑：小恒",
			detail: "新麦价格不断上涨，农民卖粮收入怎样？",
			time: "2018-06-28"
		}, {
			title: "农产品价格",
			author: "编辑：小敏",
			detail: "成品价格较昨日略有下调，预计近期仍将维持小幅走低的趋势。",
			time: "2018-06-27"
		}]
	}
});
//社会新闻信息
new Vue({
	el: "#item4mobile",
	data: {
		societys: [{
			title: "幸福",
			img: 'http://www.zhongdoukeji.com/d/file/news/gsxw/2017-10-23/31007a8b2d230c4543dff5be60dc3988.png',
			detail: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？"
		}, {
			title: "快乐",
			img: 'http://www.zhongdoukeji.com/d/file/news/gsxw/2017-10-23/31007a8b2d230c4543dff5be60dc3988.png',
			detail: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？"
		}]
	}
});
//政策新闻信息
new Vue({
	el: "#item5mobile",
	data: {
		zhengce: [{
			content: "新麦价格不断上涨，农民卖粮收入怎样？农兄弟平台来帮忙，体验",
			img1: '../../img/logo/android/qdym1080.png',
			img2: '../../img/logo/android/qdym1080.png',
			img3: '../../img/logo/android/qdym1080.png',
			time: "2018-6-28"
		}, {
			content: "快乐",
			img1: '../../img/logo/android/qdym1080.png',
			img2: '../../img/logo/android/qdym1080.png',
			img3: '../../img/logo/android/qdym1080.png',
			time: "2018-6-28"
		}]
	}
});
/*
 * 农业资讯新闻列表
 */
var lastId = ''; //最新新闻的id
	minId = ''; //最新新闻的id 
var webview_detail = null; //详情页webview
var titleNView = { //详情页原生导航配置
	backgroundColor: '#f7f7f7', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#000000', //文字颜色
	type: 'transparent', //透明渐变样式
	autoBackButton: true, //自动绘制返回箭头
	splitLine: { //底部分割线
		color: '#cccccc'
	}
}

//mui初始化，配置下拉刷新
mui.init({
	pullRefresh: {
		container: '#list',
		down: {
			style: 'circle',
			offset: '0px',
			auto: true,
			callback: pulldownRefresh
		},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
	}
});


		/**
			 *  下拉刷新获取最新列表 
			 */
			function pulldownRefresh() {

				if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
					plus.nativeUI.toast('似乎已断开与互联网的连接', {
						verticalAlign: 'top'
					});
					return;
				}

				var data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				}

				if(lastId) { //说明已有数据，目前处于下拉刷新，增加时间戳，触发服务端立即刷新，返回最新数据
					data.lastId = lastId;
					data.time = new Date().getTime() + "";
				}

				//请求顶部banner信息
				mui.getJSON("http://spider.dcloud.net.cn/api/banner/36kr", data, function(rsp) {
					news.banner = {
						guid: rsp.post_id,
						title: rsp.title,
						cover: rsp.cover,
						author: rsp.author_name,
						time: dateUtils.format(rsp.published_at)
					};
				});

				//请求最新列表信息流
				mui.getJSON("http://spider.dcloud.net.cn/api/news", data, function(rsp) {
					mui('#list').pullRefresh().endPulldownToRefresh();
					if(rsp && rsp.length > 0) {
						lastId = rsp[0].id; //保存最新消息的id，方便下拉刷新时使用
						
						if(!minId) {//首次拉取列表时保存最后一条消息的id，方便上拉加载时使用
							minId = rsp[rsp.length - 1].id; 										
						}
						news.items = convert(rsp).concat(news.items);
					}
				});

			}

			/**
			 * 上拉加载拉取历史列表 
			 */
			function pullupRefresh() {
				var data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				};

				if(minId) { //说明已有数据，目前处于上拉加载，传递当前minId 返回历史数据
					data.minId = minId;
					data.time = new Date().getTime() + "";
					data.pageSize = 10;
				}
				//请求历史列表信息流
				mui.getJSON("http://spider.dcloud.net.cn/api/news", data, function(rsp) {
					mui('#list').pullRefresh().endPullupToRefresh();
					if(rsp && rsp.length > 0) {
						minId = rsp[rsp.length - 1].id; //保存最后一条消息的id，上拉加载时使用
						news.items = news.items.concat(convert(rsp));
					}
				});
			}


mui.plusReady(function() {
	//预加载详情页
	webview_detail = mui.preload({
		url: 'news_detail.html',
		id: 'news_detail',
		styles: {
			"render": "always",
			"popGesture": "hide",
			"bounce": "vertical",
			"bounceBackground": "#efeff4",
			"titleNView": titleNView
		}
	});
});

var news = new Vue({
	el: '#news',
	data: {
		banner: {}, //顶部banner数据
		items: [] //列表信息流数据
	}
});

/**
 * 打开新闻详情
 * 
 * @param {Object} item 当前点击的新闻对象
 */
function open_detail(item) {
	//触发子窗口变更新闻详情
	mui.fire(webview_detail, 'get_detail', {
		guid: item.guid,
		title: item.title,
		author: item.author,
		time: item.time,
		cover: item.cover
	});

	//更改详情页原生导航条信息
	titleNView.titleText = item.title;
	webview_detail.setStyle({
		"titleNView": titleNView
	});
	setTimeout(function() {
		webview_detail.show("slide-in-right", 300);
	}, 150);
}

/**
 * 1、将服务端返回数据，转换成前端需要的格式
 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
 * 
 * @param {Array} items 
 */
function convert(items) {
	var newItems = [];
	items.forEach(function(item) {
		newItems.push({
			guid: item.post_id,
			title: item.title,
			author: item.author_name,
			cover: item.cover,
			time: dateUtils.format(item.published_at)
		});
	});
	return newItems;
}

/**
 * 格式化时间的辅助类，将一个时间转换成x小时前、y天前等
 */
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		mui.each(this.UNITS, function(unit, value) {
			if(milliseconds >= value) {
				humanize = Math.floor(milliseconds / value) + unit + '前';
				return false;
			}
			return true;
		});
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if(diff < this.UNITS['天']) {
			return this.humanize(diff);
		}

		var _format = function(number) {
			return(number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};