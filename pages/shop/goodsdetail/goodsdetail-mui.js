mui.init();
window.onload=function(){
	var slider_auto = mui("#slider");
	slider_auto.slider({
		interval: 2000
	});
}
var webview_detail = null;//详情页webview
var attribute =[];
var titleNView = {
    backgroundColor: '#FFFAFA',//导航栏背景色
    titleText: '', //导航栏标题
    titleColor: '#000000',//文字颜色
    type:'transparent',//透明渐变样式
    autoBackButton: true,//自动绘制返回箭头
    splitLine:{//底部分割线
        color:'#cccccc'
    }
}
mui.plusReady(function() {
	//预加载详情页
	webview_detail = mui.preload({
		    url:"../../../pages/shopcar.html",
			id: 'shopCars',
			styles: {
				"titleNView": titleNView
			}
	});
});

//請求數據
function requestData(e){
	console.log(e);
	if(window.plus){
		var w=plus.nativeUI.showWaiting("处理中，请等待...");
				mui.ajax(getUrl,{
				data:{
					"strJson":"{'DriverID':'1234567890','UserID': '1234567890','TaskGuid': '86537836334','DataType': 'GoodInfo','Id': '"+e+"'}"
				},
				dataType:'json',//服务器返回json格式数据  
				type:'POST',//HTTP请求类型
				timeout:15000,//超时时间设置为10秒；              
				success:function(data){
				console.log("----"+data);
				var getData=JSON.parse(data);
				goods.goodsinfo.id=getData.Id;
				goods.goodsinfo.belongType=getData.Class_id;
				goods.goodsinfo.belongShopID=getData.BelongShopID;
				goods.goodsinfo.goodsName=getData.GoodsName;
				goods.goodsinfo.currentprice=getData.Now_price;
				goods.goodsinfo.oldprice=getData.Old_price;
				goods.goodsinfo.sellNum=getData.SellNum;
				goods.goodsinfo.postage=getData.PostMoney;
				goods.goodsinfo.unit=getData.Unit;
				goods.goodsinfo.goodsnum=1;
				goods.goodsinfo.stock=getData.Stock_num;
				goods.goodsinfo.imgUrls=[getData.Image1,getData.Image2,getData.Image3];
				document.getElementById("advertisementDetail_content").innerHTML=getData.Spec_text;
				//console.log(getData.Spec_text);
				w.close();
				},error:function(xhr,type,errorThrown){
					//异常处理；
					console.log("请求失败 , 请查看网络设置后重新运行");
					mui.toast("请求失败 , 请查看网络设置后重新运行");
					w.close();
					//mui.back();
				}
				})
	}else{
		document.addEventListener("plusready",requestData,false);
	}
}

function recombineData(data){
	var arr=[];
    var obj={
				checked:false,
				//店铺信息
				shopInfo:{
					id:data.belongShopID,
					name:data.belongShopName,
					shopUrl:"",
					postage:data.postage,
					activity:[{
							name:"换购",
							title:"购满一件，即可享受换购优惠",
					        linktext:"去换购",
					        linkurl:"#"
					}]
				},
				//商品信息
				goodsInfo:[
							{
								imgUrls:[{id:0,src:data.imgUrls[0]},{id:1,src:data.imgUrls[1]},{id:2,src:data.imgUrls[2]}],
								title:data.goodsName,
								configstr:'',
								discounts:["农商城优惠价"],
								price:data.currentprice,
								num:data.goodsnum,
								stock:data.stock 
							}
				]
	}
    arr.push(obj);
	return arr;
}

function open_Url(e){	
	var shopCarTab = plus.webview.getWebviewById("shopcar.html");
	var main = shopCarTab.parent();
	plus.webview.currentWebview().hide('auto',300)
	mui.fire(main,'go_shopCar');
}

function buyNow(){
	var jsonUser=localStorage.getItem("UserInfo");
	if(jsonUser){
		var send_obj=recombineData(goods.goodsinfo);
		mui.openWindow({
			url:"../../settle/settle.html",
			id:"settle.html",
			extras:{
				goodsinfo:JSON.stringify(send_obj)
			}
		})
	}else{
		mui.toast("请先登录");
	}
}

function addToCar(item,userID){
	var dataObj={
		TaskGuid:'86537836334',
		DriverID:'1234567890',
		DataType:'AddCar',
		GoodsID:item.id,
		GoodsNum:item.goodsnum,
		Goods_spec:item.configstr,
		UserID:userID,
		ShopID:item.belongShopID
	}
	//console.log(JSON.stringify(dataObj));
	if(window.plus){
				var w=plus.nativeUI.showWaiting("处理中，请等待...");
				mui.ajax(setUrl,{
						data:{
							"strJson":JSON.stringify(dataObj)
						},
						dataType:'json',//服务器返回json格式数据  
						type:'POST',//HTTP请求类型
						timeout:15000,//超时时间设置为10秒；              
						success:function(data){
							w.close();
							if(JSON.parse(data).Success){
								mui.toast("添加成功！");
							}else{
								mui.toast("添加失败 , 请重新操作！");
							}
						},
						error:function(xhr,type,errorThrown){
							mui.toast("请求失败 , 请查看网络设置后重新运行");
							w.close();
						}
				})
	}
}

document.addEventListener("get_detail",function(e){
	  requestData(e.detail.goodsInfo.Id)
})

mui.back = function() {
	plus.webview.currentWebview().hide("auto", 300);
	//动画结束后，恢复默认值
	setTimeout(function() {
		window.scrollTo(0, 0);
//		vm.resetData();
	}, 300);
}