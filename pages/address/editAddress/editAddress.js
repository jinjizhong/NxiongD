mui.init();
var wvHeight=0;
var valu= localStorage.getItem("UserInfo");
function setVal(name,value){
	if(name=="name"){
		vm.info.Accept_name=value;
	}
	if(name=="tel"){
		vm.info.Telphone=value;
	}
	if(name=="detailAddr"){
		vm.info.Address_detail=value;
	}
}
function addTag(){
	var btnArray = ['取消', '确定'];
	mui.prompt('请输入新的标签名称', '例：公司、家', '新的标签', btnArray, function(e) {
		if (e.index == 1) {
			var arr=vm.info.Tags;
			var flag=true;
			  for(m in arr){
			  		if(e.value==arr[m]){
			  			flag=false;
			  			mui.alert('该标签现已存在！', '提示', function() {});
			  		}
			  } 
			  if(e.value.length>5){
			  		mui.alert('标签最多填写5个字', '提示', function() {});
			  		flag=false;
			  }
			  if(flag){
			  	vm.info.Tags.push(e.value);
			  }
		} 
	})
}
function chooseArea(){
		var isDefault=vm.info.Is_default;
					var _getParam = function(obj, param) {
						return obj[param] || '';
					};
				    var cityPicker3 = new mui.PopPicker({
						layer: 3
					});
					cityPicker3.setData(cityData3);
					cityPicker3.show(function(items) {
					vm.info.Address_area = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
					});
}
function showMap() {
				if(!userMap) {
					setTimeout(function() {
						showMap();
					}, 100);
				}
				//触发子窗口变更新闻详情
				mui.fire(userMap, 'mapInfo', {
						
				});
				setTimeout(function() {
					userMap.show("slide-in-right", 300);
				}, 150);
}	

function requestData(new_AdrObj){
	if(window.plus){
		var w=plus.nativeUI.showWaiting("处理中，请等待...");
				mui.ajax(setUrl,{
						data:{
						"strJson":JSON.stringify(new_AdrObj)
						},
						dataType:'json',//服务器返回json格式数据  
						type:'POST',//HTTP请求类型
						timeout:15000,//超时时间设置为10秒；              
						success:function(data){
							console.log(data);
							var end=JSON.parse(data);
							if(end.Success){
								delete  new_AdrObj["TaskGuid"];
								delete  new_AdrObj["DriverID"];
								delete  new_AdrObj["UserID"];
								delete  new_AdrObj["DataType"];
								if(valu){
							    	var user=JSON.parse(valu);
									user.address.push(new_AdrObj);
									localStorage.setItem("UserInfo",JSON.stringify(user));
								}
								mui.toast("操作成功");
								plus.webview.currentWebview().hide("auto", 300);
								var wobj = plus.webview.getWebviewById("go_address");   
           						wobj.reload(true);
								w.close();
							}else{
								mui.toast("操作失败");
								w.close();
							}
						},
						error:function(xhr,type,errorThrown){
							mui.toast("请求失败 , 请查看网络设置后重新运行");
							w.close();
						}
				})
	}else{
		document.addEventListener("plusready",requestData,false);
	}
}


var vm=new Vue({
	el:'.mui-content',
	data:{
		info:{
				Id:'',
				In_use:false,
				Is_default:false,
				Accept_name:"",
				Telphone:"",
				Tags:[],
				Address_area:"",
				Address_detail:""
		}
	}
})
	
mui.plusReady(function() {
	userMap = mui.preload({
		url: '../map/map.html',
		id: 'show_map'
	});
	wvHeight=plus.android.invoke(plus.android.currentWebview(),"getHeight");
});

document.addEventListener('go_editAddress', function(event) {
		var obj = event.detail.obj;
		if(obj.Id){
			vm.info=obj;
		}else{
			vm.info={
				Id:'',
				In_use:false,
				Is_default:false,
				Accept_name:"",
				Telphone:"",
				Tags:[],
				Address_area:"",
				Address_detail:""
			}
		}
})

document.addEventListener('addresVal', function(event) {
		vm.info.Address_detail=event.detail.detailAddress;
})
document.getElementById("defaultSwitch").addEventListener('toggle', function(event) {
			vm.info.Is_default=	event.detail.isActive;
});
document.getElementById("saveAndUse").addEventListener("tap",function(event){
		var name=document.getElementById("user_getName").value;
		var  tel=document.getElementById("user_getID").value;
		var Area=document.getElementById("user_getArea").value;
		var detail=document.getElementById("user_getDetail").value;
		if(!checkData(name.trim(),tel.trim(),Area.trim(),detail.trim())){
			return;
		}
		var valu =localStorage.getItem("UserInfo");
		var userID="";
		var userHead="";
		if(valu){
				var user=JSON.parse(valu);
			    userID=user.userinfo.Id;
			    userHead=user.userinfo.HeadUrl;
		}
		var tags=vm.info.Tags+"";
		var isDefault=vm.info.Is_default;
		console.log("isDefaule--"+isDefault);
		var obj={
				TaskGuid:"86537836334",
				DriverID:"1234567890",
				UserID:"1234567890",
				DataType:"MyAddres",
				User_id:userID,
				User_head:userHead,
				Accept_name:name,
				Address_area:Area,
				Address_detail:detail,
				Tags:tags,
				Telphone:tel,
				Post_code:"",
				Is_default:isDefault,
				In_use:false
		}
		requestData(obj);
})

function checkData(name,tel,Area,detail){
	var flag=true;
     if(!name){
     	mui.toast("请填写收货人姓名");
     	flag=false;
     }else
     if(!tel){
     	mui.toast("请填写收货人联系电话");
     	flag=false;
     }else
     if(!Area){
     	mui.toast("请选择地址所在区域");
     	flag=false;
     }else
    if(!detail){
     	mui.toast("请填写详细地址");
     	flag=false;
     }
    if(tel){
		var exp=/^[1][3,4,5,7,8][0-9]{9}$/;
	   if(!exp.test(tel)){
	   	mui.toast("您填写的手机号码不正确");
	   	flag=false;
	   } 
	}
    if(detail.length>30){
    	mui.toast("详细地址不得超过30个字");
	   	flag=false;
    }
    return flag;                
}
function hideBottom(){
	var bottomx=document.getElementById("saveAndUse");
	if(plus&&plus.ready){
			var webviewHeight = plus.android.invoke(plus.android.currentWebview(),"getHeight");
	}
	if(webviewHeight<wvHeight){
		bottomx.style.position='static'
	}else{
		bottomx.style.position='fixed'
	}
}
