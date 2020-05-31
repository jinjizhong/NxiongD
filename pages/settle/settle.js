mui.init();
var userAddress = null; 
var wvHeight=0;
function toAddress(){
	if(!userAddress) {
		setTimeout(function() {
			toAddress();
		}, 1000);
	}
	//触发子窗口变更新闻详情
	mui.fire(userAddress,'go_address',{	});
	setTimeout(function () {
		userAddress.show("slide-in-right", 300);
	},150);
}

//去结算
function submitSettle(){
	var valu =localStorage.getItem("UserInfo");
	var user=null;
	if(valu){
		 user=JSON.parse(valu);
	}else{
		mui.toast("请先登录")
		return;
	}
	if(JSON.stringify(personInfoBox.getAddressInfo)=='{}'){
		mui.toast("请选择收货地址");
		return;
	}	
	var jsonData={
		DataType:'AddOrder',
		userID:user.userinfo.Id,
		Address:{
		  Id:personInfoBox.orderinfo.Id,
		  Accept_name:personInfoBox.getAddressInfo.Accept_name,
          Address_area: personInfoBox.getAddressInfo.Address_area,
          Address_detail:personInfoBox.getAddressInfo.Address_detail,
          Telphone:personInfoBox.getAddressInfo.Telphone
		},
		Goods:personInfoBox.orderinfo,
		orderPrice:personInfoBox.sumPrice,
		Freight:personInfoBox.sumFreight,
		sumPrice:personInfoBox.sumPrice+personInfoBox.sumFreight,
		state:5,
		Invoice:"",
		Logistics:"",
		Description:""
	}
	console.log(JSON.stringify(jsonData.Goods));
	if(window.plus){
				mui.ajax(setUrl,{
					data:{
						"strJson":JSON.stringify(jsonData)
					},
					dataType:'json',//服务器返回json格式数据  
					type:'POST',//HTTP请求类型
					timeout:15000,//超时时间设置为10秒；              
					success:function(data){
						var end=JSON.parse(data);
						if(end.Success){
							   mui.openWindow({
							   		id:"pay.html",
							   		url:"../pay/pay.html",
							   		extras:{
							   			price:jsonData.sumPrice
							   		}
							   })
						}
					},
					error:function(xhr,type,errorThrown){
						mui.toast("请求失败 , 请查看网络设置后重新运行");
					}
				})
	}else{
		document.addEventListener("plusready",requestData,false);
	}
}

var personInfoBox=new Vue({
	el:'.mui-content',
	data:{
		getAddressInfo:{},
		orderinfo:{}
	},
	methods:{
		toAddress:toAddress,
		submitSettle:submitSettle
	},
	computed:{
		sumPrice:function(){
			    var sumPrice=0;
  				for(s in this.orderinfo){
  				  	      var goodsArr=this.orderinfo[s].goodsInfo;
  				  		  for(d in goodsArr){
  				  		  		sumPrice+=goodsArr[d].price*goodsArr[d].num;
  				  		  }
  				}
			  return sumPrice;
		},
		sumFreight:function(){
			var sum=0;
			for(index in this.orderinfo){
				sum+=this.orderinfo[index].shopInfo.postage;
			}
			return sum;
		}
	}
});

mui.plusReady(function() {
	var goods_Obj=plus.webview.currentWebview().goodsinfo;
	if(goods_Obj){
		personInfoBox.orderinfo=JSON.parse(goods_Obj);
		var valu =localStorage.getItem("UserInfo");
				if(valu){
						var user=JSON.parse(valu);
						if(user.address.length>0){
							for(ikey in user.address){
								if(user.address[ikey].In_use){
									var tagsArr=user.address[ikey].Tags.split(',');
									personInfoBox.getAddressInfo=user.address[ikey];
									break;
								}else if(user.address[ikey].Is_default){
									var tagsArr=user.address[ikey].Tags.split(',');
									personInfoBox.getAddressInfo=user.address[ikey];
									break;
								}else{
									var tagsArr=user.address[0].Tags.split(',');
									personInfoBox.getAddressInfo=user.address[0];
									break;
								}
							}
						}
				}
	}
//预加载地址页面
	userAddress = mui.preload({
		url: '../address/userAddress.html',
		id: 'go_address',
		styles: {
				"render": "always",
				"popGesture": "hide",
				"bounce": "vertical",
				"bounceBackground": "#efeff4",
		}
	});
	wvHeight=plus.android.invoke(plus.android.currentWebview(),"getHeight");
});

document.addEventListener('orderinfo', function(event) {
		        personInfoBox.orderinfo = event.detail.orderinfo;
				var valu =localStorage.getItem("UserInfo");
				if(valu){
						var user=JSON.parse(valu);
						for(ikey in user.address){
							if(user.address[ikey].In_use){
								var tagsArr=user.address[ikey].Tags.split(',');
								personInfoBox.getAddressInfo=user.address[ikey];
								break;
							}
						}
				}
});
document.addEventListener('change_useAddress', function(event) {
		personInfoBox.getAddressInfo = event.detail.inUseAddress;
});

function hideBottom(){
	var bottomx=document.getElementsByClassName("bottom-bar")[0];
	var webviewHeight=null;
	if(window.plus){
		 webviewHeight = plus.android.invoke(plus.android.currentWebview(),"getHeight");
	}
	if(webviewHeight<wvHeight){
		bottomx.style.position='static'
	}else{
		bottomx.style.position='fixed'
	}
}