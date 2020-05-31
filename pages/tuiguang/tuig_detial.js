 //点击选择作业时间
	document.getElementById("pickDateBtn").addEventListener('tap', function() {
			var dDate = new Date();
			dDate.toLocaleString();
			var minDate = new Date();
			minDate.setFullYear(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());
			var maxDate = new Date();
			maxDate.setFullYear(2099, 11, 31);
			plus.nativeUI.pickDate(function(e) {
				var d = e.date;
				info.innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				dianji=false;
				
			}, function(e) {
				info.innerText = "请选择作业时间";
			}, {
				title: "请选择日期",
				date: dDate,
				minDate: minDate,
				maxDate: maxDate
			});
		});
 
 //分享功能	
		function shares(){
			//outSet('调用系统分享');
			var msg={content:"https://fir.im/2mhe"};
			/*if(pic&&pic.realUrl){
				msg.pictures=[pic.realUrl];
			}*/
			if('iOS'==plus.os.name){//iOS平台添加链接地址
				msg.href='https://fir.im/2mhe';
			}
			//outLine(JSON.stringify(msg));
			plus.share.sendWithSystem?plus.share.sendWithSystem(msg, function(){
				//outLine('Success');
				//console.log('Success');
			}, function(e){
				//outLine('Failed: '+JSON.stringify(e));
				//console.log('Failed: '+JSON.stringify(e));
			}):shareSystemNativeJS();
		}
		
		
				//选择省市区
		var city_picker = new mui.PopPicker({layer:3});
			city_picker.setData(init_city_picker);
		$("#city_text").on("tap", function(){
			setTimeout(function(){
				city_picker.show(function(items){
					document.getElementById("city_text").value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text
				});
			},200);
		});
		
		var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
		            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
		            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
		            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
		            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
		            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
		           };
				
 
 //地图
	var em = null,map = null;
	var address = null,point = null,coordType = null,marker = null;
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
	// DOMContentloaded事件处理
	document.addEventListener("DOMContentLoaded", function() {
		em = document.getElementById("map");
		window.plus && plusReady();
		//document.getElementById("clear").addEventListener("tap", clearPosition)
	}, false);

	function clearPosition() {
		//document.getElementById("address").value = "";
		map.clearOverlays();
		marker = null;
		setUserLocation();
	}

	function setUserLocation() {
		map.getUserLocation(function(state, pos) {
			if(0 == state) {
				map.centerAndZoom(pos, 18);
				plus.maps.Map.reverseGeocode(pos, {}, function(event) {
					address = event.address; // 转换后的地理位置
					point = event.coord; // 转换后的坐标信息
					coordType = event.coordType; // 转换后的坐标系类型
					/*console.log("coordType" + coordType);
					console.log("Address:" + address);
					console.log("coordType:" + coordType);
					document.getElementById("address").placeholder = address;*/
				}, function(e) {
					console.error("Failed:" + JSON.stringify(e));
				});
			}
		});
	}
	// H5 plus事件处理
	function plusReady() {
		if(!em) {
			return
		};
		map = new plus.maps.Map("map");
		map.showUserLocation(true);
		setUserLocation();
		map.onclick = function(point) {
			map.setCenter(point);

			if(marker) {
				marker.setPoint(point);
			} else {
				marker = new plus.maps.Marker(point);
				marker.setIcon("../../../img/position.png");
				map.addOverlay(marker);
			}
			plus.maps.Map.reverseGeocode(point, {}, function(event) {
				document.getElementById("address").value = event.address;
				var bubble = new plus.maps.Bubble(event.address);
				marker.setBubble(bubble, true);
				marker.setLabel(event.address);
			})
		}
	}