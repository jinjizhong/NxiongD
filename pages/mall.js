mui.init({
  pullRefresh : {
	    container:"#list",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
	      color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
	      height:'50px',//可选,默认50px.下拉刷新控件的高度,
	      range:'100px', //可选 默认100px,控件可下拉拖拽的范围
	      offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
	      auto: true,//可选,默认false.首次加载自动上拉刷新一次
	      callback: requestData
	 	 }
   }
});
var info=null;
var types=null;
var webview_detail = null;//详情页webview
var attribute =[];
var param=JSON.stringify({
						DriverID:'1234567890',
						UserID: '任务标识',
						TaskGuid: 'b4026263-704e-4e12-a64d-f79cb42962cc',
						DataType: 'ClassList',
						Classid: 'AC'
});
function requestData(){
				mui.ajax(serverUrl,{
					data:{
						"strJson": param
					},
					dataType:'json',//服务器返回json格式数据  
					type:'POST',//HTTP请求类型
					timeout:8000,//超时时间设置为10秒；              
					success:function(data){
						if(data){
							info=JSON.parse(data);
						}
						if(types){
							types.$data=info;
						}else{ 
							types=new Vue({
								el:".mui-content",
								data:info,
								methods:{
									open_Url:function(e){
										open_Url(e);
									}
								}
							})
						}
						mui('#list').pullRefresh().endPulldown();
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
//						mui.toast("请求失败 , 请查看网络设置后重新运行");
						mui('#list').pullRefresh().endPulldown();
					 //mui.back();
//						document.getElementsByTagName("body")[0].innerHTML="<img src='../img/logo/android/qdym480.png'/>"
					}
				})
}

function open_Url(obj){
				mui.fire(webview_detail,'get_mess',{
                   obj:obj
				});
				//更改详情页原生导航条信息
				setTimeout(function () {
					webview_detail.show("slide-in-right", 300);
				},150);
}
mui.plusReady(function() {
	//预加载详情页
	webview_detail = mui.preload({
			url:"shop/goodslist/goodslist.html",
			id: 'ListPage',
			styles: {
						
			}
	});
});
//requestData();
//mui.ready(function(){
//	
//})
	mui.back = function() {
				plus.webview.currentWebview().hide("auto", 300);
//				var wobj= plus.webview.get.getLaunchWebview();
   			var wobj = plus.webview.getWebviewById("shop/goodslist/goodslist.html");
				//动画结束后，恢复默认值
				setTimeout(function() {
					window.scrollTo(0, 0);
					  wobj.reload(true); 
				}, 200);
	}