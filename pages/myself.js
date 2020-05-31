mui.init();
var shares = {};
var webview_detail = null; //详情页webview
var titleNView = { //详情页原生导航配置
	backgroundColor: '', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#000000', //文字颜色
	type: 'transparent', //透明渐变样式
	autoBackButton: true, //自动绘制返回箭头
	splitLine: { //底部分割线
		color: '#cccccc'
	}
}
var titleView = { //详情页原生导航配置
	backgroundColor: '', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#000000', //文字颜色
	type: 'transparent', //透明渐变样式
	autoBackButton: true, //自动绘制返回箭头
}
var vm=new Vue({
	el:".mui-content",
	data:{
		isLogin:false,
		userData:{}
	}
});
function zhuye() {
	webview_detail = mui.preload({
		url: 'myse/Merchant.html',
		id: 'tuig_detail',
		styles: {
			"titleNView": titleView
		}
	});
	//触发子窗口变更新闻详情
	mui.fire(webview_detail, 'get_detail', {});
	setTimeout(function() {
		webview_detail.show("slide-in-right", 300);
	}, 150);
};
function out_sign(){
				var btnArray = ['取消', '确定'];
				mui.confirm('您确定要退出当前账号吗？', '', btnArray, function(e) {
					if (e.index == 1) {
							localStorage.removeItem('UserInfo');
							plus.runtime.restart();
					} 
				})
}
function open_detail() {
				//若详情页尚未预加载完成，则延时等待再执行
				if(!webview_detail) {
					setTimeout(function() {
						open_detail();
					}, 100);
				}
				//登录
				mui.fire(webview_detail, 'login', {});
				//更改详情页原生导航条信息
				webview_detail.setStyle({
					"titleNView": titleNView
				});
				setTimeout(function () {
					webview_detail.show("slide-in-right", 300);
				},150);
}
function getItem(){
//		 localStorage.removeItem('UserInfo');
	  	var valu =localStorage.getItem("UserInfo");
		if(valu){
			 var val=JSON.parse(valu);
			 vm.isLogin=true;
			 vm.userData=val.userinfo;  document.getElementById("userName").innerText=val.userinfo.Mobile.substr(0,3)+"****"+val.userinfo.Mobile.substr(7);
val.userinfo.HeadUrl && (document.getElementById("userImg").src=val.userinfo.HeadUrl);
val.userinfo.User_name && (document.getElementById("userName").innerText=val.userinfo.User_name);
val.userinfo.ServerOrders&&(document.getElementById("zhibao").innerHTML=val.userinfo.ServerOrders+"<br />植保订单");
val.userinfo.GoodOrders&&(document.getElementById("dingdan").innerHTML=val.userinfo.GoodOrders+"<br />商品订单");
		}
}
function shareMessage(share, ex) {
	var msg = {
		extra: {
			scene: ex
		}
	};
	msg.href = "http://fir.im/b1nk";
	msg.title = "农兄弟平台";
	msg.content = "农兄弟下载链接";
	if (~share.id.indexOf('weibo')) {
		msg.content += "；体验地址：http://fir.im/b1nk";
	}
	msg.thumbs = ["_www/images/logo.png"];
	share.send(msg, function() {
		console.log("分享到\"" + share.description + "\"成功！ ");
	}, function(e) {
		console.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
	});
}
mui.plusReady(function() {
	webview_detail = mui.preload({
					url: 'myse/sign.html',
					id: 'sign.html',
					styles: {
						"render": "always",
						"popGesture": "hide",
						"bounce": "vertical",
						"bounceBackground": "#ad7c64",
						"titleNView": titleNView
					}
	});
	
	plus.share.getServices(function(s) {
		if (s && s.length > 0) {
			for (var i = 0; i < s.length; i++) {
				var t = s[i];
				shares[t.id] = t;
			}
		}
	}, function() {
		console.log("获取分享服务列表失败");
	});
getItem();
});
document.getElementById('shanghu').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'myse/shanghu.html',
		    id  : 'shanghu.html'
		});
	}else{
		open_detail();
	}
});
document.getElementById('shiming').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'myse/renzheng.html',
		    id  : 'renzheng.html'
		});
	}else{
		open_detail();
	}
});
document.getElementById('fabu').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'myse/driver_fabu.html',
		    id  : 'driver_fabu.html'
		});
	}else{
		open_detail();
	}
});
document.getElementById('dizhi').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'address/userAddress.html',
		    id  : 'dizhi.html',
		    extras:{
		    	formPageName:'myself'
		    }
		})
	}else{
		open_detail();
	}
});
document.getElementById('set').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'myse/set.html',
		    id  : 'set.html'
		})
	}else{
		open_detail();
	}
});
document.getElementById('information').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'myse/information.html',
		    id  : 'information.html'
		});
	}else{
		open_detail();
	}
});
document.getElementById('zhibao').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'myse/zhibao.html',
		    id  : 'zhibao.html'
		})
	}else{
		open_detail();
	}
});
document.getElementById('dingdan').addEventListener('tap', function(){
	if(vm.isLogin){
		mui.openWindow({
			url : 'myse/dingdan.html',
		    id  : 'dingdan.html'
		});
	}else{
		open_detail();
	}
});

//分享链接点击事件
document.getElementById("share").addEventListener('tap', function() {
	var ids = [{
			id: "weixin",
			ex: "WXSceneSession"
		}, {
			id: "weixin",
			ex: "WXSceneTimeline"
		}, {
			id: "sinaweibo"
		}, {
			id: "qq"
		}],
		bts = [{
			title: "发送给微信好友"
		}, {
			title: "分享到微信朋友圈"
		}, {
			title: "分享到新浪微博"
		}, {
			title: "分享到QQ"
		}];
	plus.nativeUI.actionSheet({
		cancel: "取消",
		buttons: bts
	}, function(e) {
		var i = e.index;
		if (i > 0) {
			var s_id = ids[i - 1].id;
			var share = shares[s_id];
			if (share) {
				if (share.authenticated) {
					shareMessage(share, ids[i - 1].ex);
				} else {
					share.authorize(function() {
						shareMessage(share, ids[i - 1].ex);
					}, function(e) {
						console.log("认证授权失败：" + e.code + " - " + e.message);
					});
				}
			} else {
				mui.toast("无法获取分享服务，请检查manifest.json中分享插件参数配置，并重新打包")
			}
		}
	});
});

document.getElementById("telephone").addEventListener('tap',function(){
    var btnArray=['拨打','取消'];
    var phone="0517-83996828";
    mui.confirm('是否拨打：'+phone,'欢迎电话咨询',btnArray,function(e){
        if(e.index == 0){
            plus.device.dial(phone,false);
        }
    });
});

document.getElementById('erweiM').addEventListener('tap', function(){
	mui.openWindow({
		url : 'myse/erweiM.html',
	    id  : 'erweiM.html'
		});
});



