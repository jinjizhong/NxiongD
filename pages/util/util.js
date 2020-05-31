	//请求地址
	var serverUrl =	'http://175k65903h.iask.in:51504/api/ServerTransform';//数据请求
	var setUrl ='http://175k65903h.iask.in:51504/api/ServerSetData';//订单提交
	var getUrl='http://175k65903h.iask.in:51504/api/GetData';//获取详情
	var uplodeFile='http://175k65903h.iask.in:51504/api/UploadFile';//图片上传
	//测试环境   151012fp30.iask.in
//	var serverUrl =	'http://151012fp30.iask.in/api/ServerTransform';//数据请求
//	var setUrl ='http://151012fp30.iask.in/api/ServerSetData';//订单提交
//	var getUrl='http://151012fp30.iask.in/api/GetData';//获取详情
//	var uplodeFile='http://151012fp30.iask.in/api/UploadFile';//图片上传
	//上传文件  传入文件路径
	function updatefile(filename,sss)
	{
		var image=new Image();
		image.onload=function()
		{
			//获取图片的base64
			var imgData=getBase64Image(image);
					var n=500000;//截取长度
					var id=guid();//生成唯一ID
					//var imgLength=Math.ceil(imgData.length/10000);
				
				for(var i=0;i<imgData.length/n;i++){
						//setTimeout()
						var aa=imgData.slice(n*i, n*(i+1));
						
 							if(i>imgData.length/n-1){
   								
   								var data={ 
										"FileID":id,  
									    "Base64":aa,  
									    "IsEnd":"1",   
										"Index":i
									};
									mui.ajax(uplodeFile, {
										data: {
											'strJson':JSON.stringify(data)
										},
										dataType: 'json',
										async: false, 
										type: 'POST',
										timeout: 10000,
										
										success:sss,
										error: function(ee){
											succes='0';
											alert("上传失败！请检查网络");
										}
									});
   								
							} else{
								var data={ 
										"FileID":id, 
									    "Base64":aa,  
									    "IsEnd":"0",   
										"Index":i
									};
					
									mui.ajax(uplodeFile, {
										data: {
											'strJson':JSON.stringify(data)
										},
										dataType: 'json',
										async: false, 
										type: 'POST',
										timeout: 10000,
										
										success: function(ss){
											succes='1';
											//console.log("======"+ss)
											if(JSON.parse(ss).Success=="0"){
												mui.toast("上传出错,重新上传")
											}else{
												//mui.toast("上传成功")
											}
										},
										error: function(ee){
											succes='0';
											alert("上传失败！请检查网络");
										}
									});
							}
						
						if(i==0)
						{
							sleep(1000);
						}else{
							sleep(200);
						}
						
						//shangchuan(aa);
						//xixi=xixi+aa;
					}
					id="";
			
		};
		image.src=filename;
		/*image.style.width='200px';
		image.style.height='200px';*/
		console.log('打开文件');
	}
	 //等待时间
   function sleep(d){
				var t = Date.now();			
				while(Date.now - t <= d);
			} 
	//转换成base64
	function getBase64Image(img) {
            var canvas = document.createElement("canvas");
            var width = img.width/2;
            var height = img.height/2;
//          if(width > height) {
//              if(width > 100) {
//                  height = Math.round(height *= 100 / width);
//                  width = 600;
//              }
//          } else {
//              if(height > 100) {
//                  width = Math.round(width *= 100 / height);
//                  height = 600;
//              }
//          }
            canvas.width = width; /*设置新的图片的宽度*/
            canvas.height = height; /*设置新的图片的长度*/
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height); /*绘图*/
            var dataURL = canvas.toDataURL("image/png", 0.8);
            return dataURL.replace("data:image/png;base64,", "");
        }
	
	//生成唯一的guid
   			function guid() {
			    function S4() {
			       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			    }
			    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
			}
	
	//ajax请求
	function ajax(data,dataType,fun){
		 	alert(setUrl);
			mui.ajax(setUrl,{
							data:
							{
								"strJson": ""
							},
							dataType:'json',//服务器返回json格式数据  
							type:'POST',//HTTP请求类型
							timeout:10000,//超时时间设置为10秒；              
							success:function(data){
								alert(data);
							},
							error:function(xhr,type,errorThrown){
								//异常处理；
								console.log(xhr+"----");
							}
			});
    }
	
/*通用的ajax数据请求*/
function ToPostConn(NY_url,data, ss){
	mui.ajax(NY_url, {
		data: data,
		dataType: 'json',
		//服务器返回json格式数据
		type: 'POST',
		//HTTP请求类型
		timeout: 10000,
		//超时时间设置为10秒；
//		headers: {
//			'Content-Type': 'application/json'
//		},
		success: ss,
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//alert("xhr" + xhr + type + errorThrown);
			alert("网络异常");
			//mui('#shouye_list').pullRefresh().endPulldown();
		}
	});
}
//
function ToConn(NY_url,data, ss,err){
	mui.ajax(NY_url, {
		data: {
			'strJson':JSON.stringify(data)
		},
		dataType: 'json', 
		//服务器返回json格式数据
		type: 'POST',
		//HTTP请求类型
		timeout: 10000,
		//超时时间设置为10秒；
//		headers: {
//			'Content-Type': 'application/json'
//		},
		success: ss,
		error: err
	});
}