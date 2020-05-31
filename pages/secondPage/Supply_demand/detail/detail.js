var shuju = new Vue({
	el: '.mui-content',
	data: {
		shuju: {}
	},
	methods: {

	}
})

mui.plusReady(function() {
	var title = plus.webview.currentWebview().title;
	document.getElementById('title').innerHTML = title;
	var message = plus.webview.currentWebview().message;
	var content = document.getElementById('contentOne');
	var userID = null;
	var userImg = '';
	var userName = '';
	var valu = localStorage.getItem("UserInfo");
	if(valu) {
		var user = JSON.parse(valu);
		userID = user.userinfo.Id;
	}
	var strData = {
		'TaskGuid': '86537836334',
		'DriverID': '1234567890',
		'UserID': userID,
		'DataType': 'LandInfo',
		'Id': message,
	}

	mui.ajax(getUrl, {
		data: {
			"strJson": JSON.stringify(strData)
		},
		async: true,
		dataType: 'json', //服务器返回json格式数据  
		type: 'POST', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；              
		success: function(item) {
			console.log(item + '++++');
			var items = JSON.parse(item);
			items.ModifyDateTime = items.ModifyDateTime.substring(0, 10);
			shuju.shuju = items;
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr + "----");
		}
	});

})
