mui.init();

function checkFun(){
	return checkTelVal() && checkIsNull() && checkPWDLength() && checkRePWD();
}
function checkTelVal(){
	var tel=document.getElementById("user_tel").value;
	var exp=/^[1][3,4,5,7,8][0-9]{9}$/;
	var flag=exp.test(tel);
	if(!flag){
		mui.alert('请重新填写正确的手机号', '您输入的手机号码有误！', function() {
				document.getElementById("user_tel").value=""; 
				document.getElementById("user_tel").focus();
		});
	}
	return  flag;
}
function checkRePWD(){
	var user_pwd=document.getElementById("user_pwd").value,
    	  user_repwd= document.getElementById("user_repwd").value;
    	  	console.log(user_pwd+"-------------------------"+user_repwd);
	var flag=user_pwd==user_repwd;
	if(!flag){
		mui.alert('请确认后重新填写密码项', '两次输入的密码不匹配 !');
	}
	return  flag;
}
function checkIsNull(){
	var flag=true;
	var tel=document.getElementById("user_tel").value,
		verification=document.getElementById("user_Verification").value,       
		user_pwd=document.getElementById("user_pwd").value,
		user_repwd= document.getElementById("user_repwd").value;
		if(!tel){
			flag=false;
			mui.toast("密码不能为空! ");
		}else if(!verification){
			mui.toast('验证码不能为空! ');
			flag=false;
		}else if(!user_pwd){
			mui.toast('密码不能为空! ');
			flag=false;
		}else if(!user_repwd){
			mui.toast('确认密码不能为空! ');
			flag=false;
		}
		return flag
}
function register(){
	if(checkFun()){
		var tel=document.getElementById("user_tel").value,
			verification=document.getElementById("user_Verification").value,       
			user_pwd=document.getElementById("user_pwd").value;
			requestData(tel,user_pwd,verification);
	}else{
		mui.toast("注册失败");
	}
}
function requestData(acount,pwd,identify){
	if(window.plus){
		var w=plus.nativeUI.showWaiting("处理中，请等待...");
				mui.ajax(setUrl,{
						data:{
		"strJson":"{'TaskGuid':'86537836334','DriverID':'1234567890','UserID':'1234567890','DataType':'Register','Password':'"+pwd+"','Mobile':'"+acount+"' ,Identifying:'"+identify+"'}"
						},
						dataType:'json',//服务器返回json格式数据  
						type:'POST',//HTTP请求类型
						timeout:15000,//超时时间设置为10秒；              
						success:function(data){
							w.close();
							console.log(data);
							if(JSON.parse(data).Success==1){
								mui.toast("注册成功！")
								setTimeout(function(){
									plus.webview.currentWebview().hide("auto", 300);
								},300)
							}else{
								mui.toast(JSON.parse(data).FailMessage);
								setTimeout(function(){
									plus.webview.currentWebview().hide("auto", 300);
								},300)
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
function checkPWDLength(){
			var flag=true;
			var user_pwd=document.getElementById("user_pwd").value;
			if(user_pwd.length<6){
					mui.toast("密码至少为6位或6位以上的字符或者数字")
					flag=false;
			}
			return flag;
}
