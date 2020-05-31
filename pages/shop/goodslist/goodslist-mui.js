//var records=0;
var uploadObj=null;
var isFirstRefresh=true;
var rows=[];
var webview_detail = null;//详情页webview
var titleNView = {
    backgroundColor: '#FFFAFA',//导航栏背景色
    titleText: '', //导航栏标题
    buttons:[
 	   {text:'详情',fontSize:"11px",onclick:linkDetail},
       {text:'评价',fontSize:"11px",onclick:linkEvaluate}
    ],
    titleColor: '#000000',//文字颜色
    type:'transparent',//透明渐变样式
    autoBackButton: true ,//自动绘制返回箭头
    splitLine:{//底部分割线
        color:'#cccccc'
    }
}
//下一级--详情页的锚链接跳转
function linkDetail(){
	if(webview_detail){
		webview_detail.evalJS("window.location.href = '#advertisementDetail'");
	}
}
function linkEvaluate(){
	if(webview_detail){
		webview_detail.evalJS("window.location.href = '#evaluate'");
	}
}
//打开详情页
function open_Url(e){
				mui.fire(webview_detail,'get_detail',{
					goodsInfo:e
				});
			//更改详情页原生导航条信息
				titleNView.titleText = e.goodsName;
				webview_detail.setStyle({
					"titleNView":titleNView
				});
				setTimeout(function () {
					webview_detail.show("slide-in-right", 300);
				},150);
}

function showTypes(){
	mui.openWindow({
//		id:"typesPage",
//		url:"../../test/type.html"
		id:"typesPage",
			url:"../../test/type.html"
	})	
}
//請求數據
function requestData(e,pageNo){
		var valu =localStorage.getItem("UserInfo");
		var jsonData={
			DriverID:'1234567890',
			UserID: '任务标识',
			TaskGuid: 'b4026263-704e-4e12-a64d-f79cb42962cc',
			DataType: 'ShopList',
			page: pageNo,
			rows: '10',
			keywords: '',
			Classid:e
		}
		if(window.plus){
					mui.ajax(serverUrl,{
					data:{
						"strJson":JSON.stringify(jsonData)
					},
					dataType:'json',//服务器返回json格式数据  
					type:'POST',//HTTP请求类型
					timeout:15000,//超时时间设置为10秒；              
					success:function(data){
						var goods=JSON.parse(data);
						if(goods&&goods.rows.length!=0){
							 listinfo.pageNo+=1;
							//listinfo.records+=goods.records;
						   	 listinfo.rows=listinfo.rows.concat(goods.rows);
							 uploadObj.endPullupToRefresh(false);
						}else{
						  uploadObj.endPullupToRefresh(true);
						}
					},
					error:function(xhr,type,errorThrown){
						mui.toast("请求失败 , 请查看网络设置后重新运行");
						uploadObj.endPullupToRefresh(true);
					}
					})
		}else{
			document.addEventListener("plusready",requestData,false);
		}
}
function requestShopData(e,pageNo){
		var jsonData={
			DriverID:'1234567890',
			UserID: '任务标识',
			TaskGuid: 'b4026263-704e-4e12-a64d-f79cb42962cc',
			DataType: 'Shop2List',
			page: pageNo,
			rows: '5',
			keywords: '',
			Classid:e
		}
		if(window.plus){
					mui.ajax(serverUrl,{
					data:{
						"strJson":JSON.stringify(jsonData)
					},
					dataType:'json',//服务器返回json格式数据  
					type:'POST',//HTTP请求类型
					timeout:15000,//超时时间设置为10秒；              
					success:function(data){
						var shops=JSON.parse(data).rows;
						if(shops&&shops.length!=0){
							 listinfo.shopPageNo+=1;
						   	 listinfo.shop_rows=listinfo.shop_rows.concat(shops);
							 uploadObj.endPullupToRefresh(false);
						}else{
						     uploadObj.endPullupToRefresh(true);
						}
					},
					error:function(xhr,type,errorThrown){
						mui.toast("请求失败 , 请查看网络设置后重新运行");
						  uploadObj.endPullupToRefresh(true);
					}
					})
		}else{
			document.addEventListener("plusready",requestData,false);
		}
}
mui.init({
	pullRefresh : {
	    container:"#list",
	    up : {
//	      height:95,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      callback :function(){
	        uploadObj=this;
	        if(isFirstRefresh){
	        	requestData(listinfo.typeID,listinfo.pageNo);
	        	requestShopData(listinfo.typeID,listinfo.pageNo);
	        }else{
		        if(listinfo.listType==1){
		        	requestData(listinfo.typeID,listinfo.pageNo);
		        }else{
		        	requestShopData(listinfo.typeID,listinfo.shopPageNo);
		        }
	        }
	      }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
    }
});
mui.plusReady(function() {
	//预加载详情页
	webview_detail = mui.preload({
			url:"../goodsdetail/goodsdetail.html",
			id: 'DetailsPage',
			styles: {
				"titleNView": titleNView
			}
	});
//	requestData	(listinfo.typeID,listinfo.pageNo);
});

function chooseClass(){
	mui.openWindow({
			id:"mall.html",
			url:"../../mall.html"
	})
}
	

