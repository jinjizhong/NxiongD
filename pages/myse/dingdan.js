mui.init({});
var webview_detail = null; //详情页webview
var order_detail = null;
var titleView = { //详情页原生导航配置
	backgroundColor: '#f7f7f7', //导航栏背景色
	titleText: '', //导航栏标题
	titleColor: '#000000', //文字颜色
	type: 'transparent', //透明渐变样式
	autoBackButton: true, //自动绘制返回箭头
	splitLine: { //底部分割线
		color: '#cccccc'
	}
}

function go_detail(item) {
	order_detail = mui.preload({
		url: 'dingdanxiangQ.html',
		id: 'order_detail'
	});
	mui.fire(order_detail, 'order_detail', {
		item: item
	})
	setTimeout(function() {
		order_detail.show("slide-in-right", 300);
	}, 150);
}

function zaigou() {
	webview_detail = mui.preload({
		url: '../tuiguang/tuig_detail.html',
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
var VUEdata = new Vue({
	el: ".mui-content",
	data: {
		allStates: ['待付款', '待收货', '已完成', '已取消'],
		orders:[]
	}
})

function requestData(){
		var valu =localStorage.getItem("UserInfo");
	    var user=JSON.parse(valu);
	    var  userID=user.userinfo.Id;
		var jsonData={
			DriverID:'1234567890',
			UserID: userID,
			TaskGuid: 'b4026263-704e-4e12-a64d-f79cb42962cc',
			DataType: 'OrderList',
			page: "1",
			rows: '100',
			State:''
		}
		console.log("55555"+JSON.stringify(jsonData));
		if(window.plus){
					mui.ajax(serverUrl,{
						data:{
							"strJson":JSON.stringify(jsonData)
						},
						dataType:'json',//服务器返回json格式数据  
						type:'POST',//HTTP请求类型
						timeout:15000,//超时时间设置为10秒；              
						success:function(returndata){
							console.log(returndata);
						   var obj=JSON.parse(returndata);
 						   var newData=recombineData(obj);
 						   VUEdata.orders=newData;
 						   console.log(JSON.stringify(VUEdata.orders));
							// console.log(JSON.stringify(newData));
						},
						error:function(xhr,type,errorThrown){
							mui.toast("请求失败 , 请查看网络设置后重新运行");
						}
					})
		}else{
			document.addEventListener("plusready",requestData,false);
		}
}


var deceleration = mui.os.ios ? 0.003 : 0.0009;
mui('.mui-scroll-wrapper').scroll({
	bounce: false,
	indicators: true, //是否显示滚动条
	deceleration: deceleration
});

function recombineData(data){
	var arr=[];
	for(var i=0;i<data.length;i++){
		var obj={
				id: data[i].OrderNo, 
				state: data[i].State, 
				sumPrice: data[i].SumPrice, 
				goodsInfo:[{
							shopInfo: {
											shopID: data[i].shopid,
											shopName: data[i].Shop_name,
											shopLink: data[i].Shop_img,
							},
							baseInfo:{
											goodsName:data[i].GoodsName,
											configstr: "",
											num: data[i].GoodsNum,
											currentprice: data[i].Price, //现价
											imgUrl: data[i].ImgUrls
							}
				}]
		}
			arr.push(obj);
	}
		return arr;
}
mui.ready(requestData);
