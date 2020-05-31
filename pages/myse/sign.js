mui.init();
function requestData(acount,pwd){
	if(window.plus){
		var w=plus.nativeUI.showWaiting("处理中，请等待...");
				mui.ajax(serverUrl,{
						data:{
						"strJson":"{'DriverID':'1234567890','UserID': '任务标识','TaskGuid': 'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'CheckUser','Mobile': '"+acount+"','Password': '"+pwd+"'}"
						},
						dataType:'json',//服务器返回json格式数据  
						type:'POST',//HTTP请求类型
						timeout:15000,//超时时间设置为10秒；              
						success:function(data){
						  if(data!="{}"){
						   		var getObj= JSON.parse(data);
						   		//console.log(getObj.userinfo.User_name);
						   	    localStorage.setItem("UserInfo",data);
						   	    w.close();
						   	    mui.toast("登录成功！");
						   	    setTimeout(function(){
						   	    	 plus.runtime.restart();
						   	    },600);
						   	   
						   }else{
						  		mui.toast("密码或者账号错误！");
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

function checkIsNull(){
	var acount=document.getElementById("acount").value,
	    pwd=document.getElementById("pwd").value;
	
}
document.getElementById('login_butt').addEventListener('tap', function(){
	    var acount=document.getElementById("acount").value,
	    pwd=document.getElementById("pwd").value;
	    if(!(acount&&pwd)){
	    	mui.toast("账号密码不能为空！");
	    	return; 
	    }
	    requestData(acount,pwd);
});
document.getElementById('zhuce').addEventListener('tap', function(){
	mui.openWindow({
		url : 'zhuce.html',
	    id  : 'zhuce.html'
	});
});
document.getElementById('zhaohui').addEventListener('tap', function(){
	mui.openWindow({
		url : '../myse/zhaohui.html',
	    id  : 'zhaohui.html'
	});
});