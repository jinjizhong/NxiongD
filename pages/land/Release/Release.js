mui.plusReady(function() {
	document.getElementById('tudilei').addEventListener('tap', function() {
		if(mui.os.plus) {
			var leixingID = [{
				title: "耕地"
			}, {
				title: "园地"
			}, {
				title: "水域"
			}, {
				title: "养殖用地"
			}, {
				title: "商业及住宅"
			}, {
				title: "其他用地"
			}];
			plus.nativeUI.actionSheet({
				title: "选择土地类型",
				cancel: "取消",
				buttons: leixingID
			}, function(b) {
				switch(b.index) {
					case 0:
						break;
					case 1:
						document.getElementById("tudilei").value = leixingID[0].title;
						break;
					case 2:
						document.getElementById("tudilei").value = leixingID[1].title;
						break;
					case 3:
						document.getElementById("tudilei").value = leixingID[2].title;
						break;
					case 4:
						document.getElementById("tudilei").value = leixingID[3].title;
						break;
					case 5:
						document.getElementById("tudilei").value = leixingID[4].title;
						break;
					case 6:
						document.getElementById("tudilei").value = leixingID[5].title;
						break;
					default:
						break;
				}
			});
		}
	}, false);

	document.getElementById('tudiqu').addEventListener('tap', function() {
		if(mui.os.plus) {
			var leixingID = [{
				title: "清河区"
			}, {
				title: "淮安区"
			}, {
				title: "淮阴区"
			}, {
				title: "清浦区"
			}, {
				title: "涟水县"
			}, {
				title: "洪泽县"
			}, {
				title: "盱眙县"
			}, {
				title: "金湖县"
			}];
			plus.nativeUI.actionSheet({
				title: "选择所在区域",
				cancel: "取消",
				buttons: leixingID
			}, function(b) {
				switch(b.index) {
					case 0:
						break;
					case 1:
						document.getElementById("tudiqu").value = leixingID[0].title;
						break;
					case 2:
						document.getElementById("tudiqu").value = leixingID[1].title;
						break;
					case 3:
						document.getElementById("tudiqu").value = leixingID[2].title;
						break;
					case 4:
						document.getElementById("tudiqu").value = leixingID[3].title;
						break;
					case 5:
						document.getElementById("tudiqu").value = leixingID[4].title;
						break;
					case 6:
						document.getElementById("tudiqu").value = leixingID[5].title;
						break;
					case 7:
						document.getElementById("tudiqu").value = leixingID[6].title;
						break;
					case 8:
						document.getElementById("tudiqu").value = leixingID[7].title;
						break;
					default:
						break;
				}
			});
		}
	}, false);

	document.getElementById('liuzhuan').addEventListener('tap', function() {
		if(mui.os.plus) {
			var leixingID = [{
				title: "转让"
			}, {
				title: "出租"
			}, {
				title: "转包"
			}, {
				title: "合作"
			}, {
				title: "入股"
			}, {
				title: "互换"
			}];
			plus.nativeUI.actionSheet({
				title: "选择流转方式",
				cancel: "取消",
				buttons: leixingID
			}, function(b) {
				switch(b.index) {
					case 0:
						break;
					case 1:
						document.getElementById("liuzhuan").value = leixingID[0].title;
						break;
					case 2:
						document.getElementById("liuzhuan").value = leixingID[1].title;
						break;
					case 3:
						document.getElementById("liuzhuan").value = leixingID[2].title;
						break;
					case 4:
						document.getElementById("liuzhuan").value = leixingID[3].title;
						break;
					case 5:
						document.getElementById("liuzhuan").value = leixingID[4].title;
						break;
					case 6:
						document.getElementById("liuzhuan").value = leixingID[5].title;
						break;
					default:
						break;
				}
			});
		}
	}, false);
});
var img1 = '';
var img2 = '';
var img3 = '';
var dianji = false;

var myDate = new Date();
//获取当前年
var year = myDate.getFullYear();
//获取当前月
var month = myDate.getMonth() + 1;
//获取当前日
var date = myDate.getDate();
var now = year + '-' + month + "-" + date;
var Land_used = $('#tudilei');
var Land_area = $('#tudiqu');
var Land_type = $('#liuzhuan');
var Land_acreage = $('#mianji');
var Land_year = $('#nianxian');
var Land_price = $('#jiage');
var Land_special = $('#Land_special');
var Land_title = $('#biaoti');
var Land_people = $('#lianxiren');
var Land_tel = $('#dianhua');
var textarea = $('#textarea');

function checkTelVal(Land_tel) {
	var exp = /^1[3|4|5|8][0-9]\d{4,8}$/;
	var flag = exp.test(Land_tel);
	if(!flag) {
		return flag
	} else {
		return flag;
	}
}

function serve_order(img1, img2, img3) {
	var s1 = "";
	var s2 = "";
	var s3 = "";
	if(!dianji) {
		dianji = true;
		//上传图片
		var wt = plus.nativeUI.showWaiting("图片上传中...", {
			back: "none"
		});
		updatefile(img1, function(s) {
			succes = '1';
			if(JSON.parse(s).Success == "0") {
				mui.toast("上传出错,重新上传");
				wt.close();
			} else {
				mui.toast("第一张上传成功");
				s1 = JSON.parse(s).Date;
				updatefile(img2, function(ss) {
					if(JSON.parse(ss).Success == "0") {
						mui.toast("上传出错,重新上传");
						wt.close();
					} else {
						mui.toast("第二张上传成功");
						s2 = JSON.parse(ss).Date;
						updatefile(img3, function(sss) {
							if(JSON.parse(sss).Success == "0") {
								mui.toast("上传出错,重新上传");
								wt.close();
							} else {
								mui.toast("第三张上传成功");
								s3 = JSON.parse(sss).Date;
								wt.close();
								Tiajax(s1, s2, s3);
							}
						});
					}
				});
			}
		});

	} else {
		alert("不要重复提交")
	}
}

mui.init({
	beforeback: function() {
		//获得列表界面的webview
		var list = plus.webview.getWebviewById('list');
		//触发列表界面的自定义事件（refresh）,从而进行数据刷新
		mui.fire(list, 'refresh');
		//返回true，继续页面关闭逻辑
		return true;
	}
});
$('button').click(function() {
	var flag = checkTelVal(Land_tel.val());
	if(Land_used.val() == '') {
		flag = false;
		mui.toast('Land_used不能为空！');
	} else if(!flag) {
		mui.alert('请重新填写正确的手机号', '您输入的手机号码有误！', function() {
			document.getElementById("dianhua").value = "";
			document.getElementById("dianhua").focus();
		});
	} else if(Land_area.val() == '') {
		flag = false;
		mui.toast('Land_area不能为空');
	} else if(Land_type.val() == '') {
		flag = false;
		mui.toast('Land_type不能为空');
	} else if(Land_acreage.val() == '') {
		flag = false;
		mui.toast('Land_acreage不能为空');
	} else if(Land_year.val() == '') {
		flag = false;
		mui.toast('Land_year不能为空');
	} else if(Land_price.val() == '') {
		flag = false;
		mui.toast('Land_price不能为空');
	} else if(Land_special.val() == '') {
		flag = false;
		mui.toast('Land_special不能为空');
	} else if(Land_title.val() == '') {
		flag = false;
		mui.toast('Land_title不能为空');
	} else if(Land_people.val() == '') {
		flag = false;
		mui.toast('Land_people不能为空');
	} else if(textarea.val() == '') {
		flag = false;
		mui.toast('textarea不能为空');
	} else if(picNum != 3) {
		mui.toast('上传图片为3张');
	} else {
		serve_order(img1, img2, img3)
	}
});

function Tiajax(s1, s2, s3) {

	//这个是从系统内存里取东西
	var userID = null;
	var valu = localStorage.getItem("UserInfo");
	if(valu) {
		var user = JSON.parse(valu);
		userID = user.userinfo.Id;
	}
	var ww = plus.nativeUI.showWaiting("信息提交中...", {
		back: "none"
	});
	var strJSON = {    
		'TaskGuid': '86537836334',
		'DriverID': '1234567890',
		'UserID': userID,
		'DataType': "AddLand",
		'Land_title': Land_title.val(),
		'Land_price': Land_price.val(),
		'Land_special': Land_special.val(),
		'Land_acreage': Land_acreage.val(),
		'Land_year': Land_year.val(),
		'Land_type': Land_type.val(),
		'Land_statu': '未交易',
		'Land_verify': '电话联系',
		'Land_area': Land_area.val(),
		'Land_used': Land_used.val(),
		'ModifyDateTime': now,
		'Browse': '5',
		'Description': textarea.val(),
		'Land_tel': Land_tel.val(),
		'Land_people': Land_people.val(),
		'Type': '0',
		'Image1': s1,
		'Image2': s2,
		'Image3': s3,
	}
	mui.ajax(setUrl, {
		data: {
			"strJson": JSON.stringify(strJSON)
		},
		async: true,
		dataType: 'json', //服务器返回json格式数据  
		type: 'POST', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；              
		success: function(item) {
			if(JSON.parse(item).Success == 0) {
				alert(JSON.parse(item).FailMessage);
				ww.close();
				dianji = false;
			} else {
				mui.toast('发布成功');
				ww.close();
				plus.webview.currentWebview().close();
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			ww.close();
			alert('提交失败');
			console.log(xhr + "----");
			dianji = false;
		}
	});
}

//重写返回逻辑
mui.back = function() {
	dianji = false;
	plus.webview.currentWebview().close();
}

var picNum = 0;
var index = 1;
var size = null;
var imageIndexIdNum = 0;
var starIndex = 0;
var feedback = {
	imageList: document.getElementById('image-list'),
};
feedback.files = [];
feedback.uploader = null;
feedback.deviceInfo = null;
mui.plusReady(function() {
	//设备信息，无需修改
	feedback.deviceInfo = {
		appid: plus.runtime.appid,
		imei: plus.device.imei, //设备标识
		images: feedback.files, //图片文件
		p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
		md: plus.device.model, //设备型号
		app_version: plus.runtime.version,
		plus_version: plus.runtime.innerVersion, //基座版本号
		os: mui.os.version,
		net: '' + plus.networkinfo.getCurrentType()
	}
});
/**
 *提交成功之后，恢复表单项 
 */
feedback.clearForm = function() {
	feedback.question.value = '';
	feedback.contact.value = '';
	feedback.imageList.innerHTML = '';
	feedback.newPlaceholder();
	feedback.files = [];
	index = 0;
	size = 0;
	imageIndexIdNum = 0;
	starIndex = 0;
};
feedback.getFileInputArray = function() {
	return [].slice.call(feedback.imageList.querySelectorAll('.file'));
};
feedback.addFile = function(path) {
	picNum = picNum + 1;
	if(picNum === 1) {
		img1 = path;
	} else if(picNum === 2) {
		img2 = path;
	} else {
		img3 = path;
	}
};
/**
 * 初始化图片域占位
 */
feedback.newPlaceholder = function() {
	var fileInputArray = feedback.getFileInputArray();
	if(fileInputArray &&
		fileInputArray.length > 0 &&
		fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
		return;
	};
	imageIndexIdNum++;
	var placeholder = document.createElement('div');
	placeholder.setAttribute('class', 'image-item space');
	var up = document.createElement("div");
	up.setAttribute('class', 'image-up')
	//删除图片
	var closeButton = document.createElement('div');
	closeButton.setAttribute('class', 'image-close');
	closeButton.innerHTML = 'X';
	closeButton.id = "img-" + index;
	//小X的点击事件
	closeButton.addEventListener('tap', function(event) {
		picNum = picNum - 1;

		setTimeout(function() {
			for(var temp = 0; temp < feedback.files.length; temp++) {
				if(feedback.files[temp].id == closeButton.id) {
					feedback.files.splice(temp, 1);
				}
			}
			feedback.imageList.removeChild(placeholder);
		}, 0);
		return false;
	}, false);

	//
	var fileInput = document.createElement('div');
	fileInput.setAttribute('class', 'file');
	fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
	fileInput.addEventListener('tap', function(event) {
		var self = this;
		var index = (this.id).substr(-1);

		plus.gallery.pick(function(e) {
			var name = e.substr(e.lastIndexOf('/') + 1);
			console.log("name:" + name);

			plus.zip.compressImage({
				src: e,
				dst: '_doc/' + name,
				overwrite: true,
				quality: 50
			}, function(zip) {
				size += zip.size
				console.log("filesize:" + zip.size + ",totalsize:" + size);
				if(size > (5 * 1024 * 1024)) {
					return mui.toast('文件超大,请重新选择~');
				}
				if(!self.parentNode.classList.contains('space')) { //已有图片
					feedback.files.splice(index - 1, 1, {
						name: "images" + index,
						path: e
					});
				} else { //加号

					placeholder.classList.remove('space');
					feedback.addFile(zip.target);
					feedback.newPlaceholder();
				}
				up.classList.remove('image-up');
				placeholder.style.backgroundImage = 'url(' + zip.target + ')';
			}, function(zipe) {
				mui.toast('压缩失败！')
			});

		}, function(e) {
			mui.toast(e.message);
		}, {});
	}, false);
	placeholder.appendChild(closeButton);
	placeholder.appendChild(up);
	placeholder.appendChild(fileInput);
	feedback.imageList.appendChild(placeholder);
};
feedback.newPlaceholder();