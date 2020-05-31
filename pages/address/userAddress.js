var  editAddress = null;
var  titleNView = {
	 backgroundColor: '#FFFAFA', //导航栏背景色
	 titleText: '', //导航栏标题
	 titleColor: '#000000', //文字颜色
	 type: 'transparent', //透明渐变样式
	 autoBackButton: true, //自动绘制返回箭头
	 splitLine: { //底部分割线
		 color: '#cccccc'
	}
}
//预加载详情页
function go_editAddress(obj) {
	if(!editAddress) {
		setTimeout(function() {
			go_editAddress();
		}, 100);
	}
	//触发子窗口变更新闻详情
	mui.fire(editAddress, 'go_editAddress', {obj:obj});
	setTimeout(function() {
		editAddress.show("slide-in-right", 300);
	}, 150);
}

function changeInUse(data){
	for(akey in receipt.addres_arr){
		if(receipt.addres_arr[akey].Id==data.Id){
			receipt.addres_arr[akey].In_use=true;
		}else{
			receipt.addres_arr[akey].In_use=false;
		}
	}
	var currWV=plus.webview.currentWebview();
	if(!(currWV.formPageName=="myself")){
			var wv=plus.webview.getWebviewById("go_settle");
			if(wv){
				mui.fire(wv, 'change_useAddress', {inUseAddress:data});
				setTimeout(function() {
					wv.show("slide-in-right", 300);
				}, 150);
			}else{
				console.log("沒找到settle.html的wv");
			}
	}
}
function requestData(){
				var valu =localStorage.getItem("UserInfo");
			    var userID="";
			    if(valu){
					   var user=JSON.parse(valu);
					   userID=user.userinfo.Id;
				}
			    var sendData={
			    	DriverID:'1234567890',
			           UserID: '任务标识',
			           TaskGuid: 'b4026263-704e-4e12-a64d-f79cb42962cc',
			           DataType: 'MyAddres',
			           page: '1',
			           rows: '10',
			           keywords: '',
			           User: userID
			    }
				mui.ajax(serverUrl,{
						data:{"strJson":JSON.stringify(sendData)},     
						dataType:'json',//服务器返回json格式数据  
						type:'POST',//HTTP请求类型
						timeout:15000,//超时时间设置为10秒；              
						success:function(data){
						    var  get_arr= JSON.parse(data);
						    receipt.addres_arr=get_arr;
							mui('#list').pullRefresh().endPulldown();
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							console.log("请求失败 , 请查看网络设置后重新运行");
							mui.toast("请求失败 , 请查看网络设置后重新运行");
							mui('#list').pullRefresh().endPulldown();
						}
				})
}
			
var receipt=new Vue({
	el:".mui-content",
	data:{
			addres_arr:[]
	},methods: {
			go_editAddress: function(item){
				go_editAddress(item)
			},
			changeInUse:function(item){
				changeInUse(item);
			}
	}
})

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
mui.plusReady(function() {
	//预加载详情页
	editAddress = mui.preload({
		url: 'editAddress/editAddress.html',
		id: 'go_editAddress',
		styles: {
			"render": "always",
			"popGesture": "hide",
			"bounce": "vertical",
			"bounceBackground": "#efeff4"
		}
	});
});

