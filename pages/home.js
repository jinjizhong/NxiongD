/*首页界面逻辑
 */
	//底部选项卡切换
(function() {
		mui.init({
		  pullRefresh : {
			    container:"#shouye_list",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
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
		var gaodu = screen.width * 0.45;
		
		document.getElementById('lunbuchi').style.height = gaodu + "px";
		
		//获取位置信息
		plus.geolocation.getCurrentPosition( geoInf, function ( e ) { 
 
		},{geocode:true,provider:'amap'}); 
		
		requestData();
	});
	
	function geoInf( position ) { 
 
		var codns = position.coords;//获取地理坐标信息； 
		 
		var longt = codns.longitude;//获取到当前位置的经度 
		 
		var lat = codns.latitude;//获取到当前位置的纬度； 
		 
		//提醒：position.address 获取的是地址集合包括省市县街道等 
		 document.getElementById("location").innerHTML=position.address.city
		//alert(position.address.city) ;//通过具体的地址集合获取具体市名称，其他以此类推。 
		//mui.alert(position.address.city+"=="+position.address.district+"--"+position.address.street);//城市、区、街道 
	} 
	
	function requestData(){
		//请求首页数据
		var arr=[];
		var sy_data={
			'DriverID':'1234567890','UserID': '任务标识','TaskGuid':'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'APPIndex'
			};
			
		ToConn(serverUrl,sy_data,function(e){

//			console.log("首页返回数据:"+e)
			var obj=JSON.parse(e).Lunbo;
			/*
			obj.splice(obj.length, 0, obj[0]);
			obj.splice(0, 0, obj[obj.length-2]);
			var arr=JSON.stringify(obj);*/
			
			//getLunbo(JSON.parse(e).Lunbo);
			/*console.log("++++++++++++"+JSON.stringify(obj[0])+JSON.stringify(obj[obj.length-1]));
			console.log("打印出來的："+JSON.stringify(obj))*/
			lb.Imginfo=obj;
			lb.Img1=obj[obj.length-1];
			lb.Img2=obj[0];
			
			zc.nongce=JSON.parse(e).Zhengce;
			dt.nongzi=JSON.parse(e).Nongzi;
			kj.keji=JSON.parse(e).Keji;
			ly.lvyou=JSON.parse(e).Lvyou;
			Ny.baoxian = JSON.parse(e).Nybx;
			activity.actives=JSON.parse(e).Tuiguang;
			mui('#shouye_list').pullRefresh().endPulldown();
		},function(aa){
			mui('#shouye_list').pullRefresh().endPulldown();
			alert("数据请求失败，请检查网路");
			window.location.reload();
		});
			
	}
	
/*	//轮播图
	function getLunbo(ee){
		ImgHtml=[];
		html=[];
		var Lunbo_img=document.getElementById("Lunbo_img");
		var Img_to=document.getElementById("Img_to");
		
		ImgHtml.push('<div class="mui-slider-item mui-slider-item-duplicate" onclick="ToImgUrl('+ee[eval(ee).length-1].Id+')"><a href="#"><img src="'+ee[eval(ee).length-1].Img_url+'"></a></div>');
		for(var i = 0; i < eval(ee).length; i++){
			ImgHtml.push('<div class="mui-slider-item"><a href="#"  onclick="ToImgUrl('+ee[i].Id+')"><img src="'+ee[i].Img_url+'"></a></div>');
		}
		ImgHtml.push('<div class="mui-slider-item mui-slider-item-duplicate" onclick="ToImgUrl('+ee[0].Id+')"><a href="#"><img src="'+ee[0].Img_url+'"></a></div>');
		html.push('<div class="mui-indicator mui-active"></div>');
		for(var j = 1; j < eval(ee).length; j++){
			html.push('<div class="mui-indicator"></div>');
		}
		
		Lunbo_img.innerHTML = ImgHtml.join('');
		Img_to.innerHTML = html.join('');
		 //手动调用图片轮播的初始化方法
            var gallery = mui('.mui-slider');
            gallery.slider({
              interval:2000
            });
	}*/
	/*轮播图片*/
 var lb=new Vue({
	el:'#slider',
	data:{
		Img1:{},
		Imginfo:[],
		Img2:{}
	},
	methods:{
 		toImgUrl: function(item){
	 		
	 		mui.openWindow({
	 			url:"secondPage/pinglun/lvyouPage.html",
	 			 extras: {
	 			 		message:item.Id,
	 			 		title:item.News_name
                    }
	 		});
		}
 	},
    //更新
    updated: function() {
        mui('#slider').slider({
            interval: 5000 //自动播放周期
        });
    }

});
 
 /*推广活动*/
 var activity=new Vue({
 	el:"#tuiguang",
 	data:{
 		actives:[]
 	},
 	methods:{
 		addActive: function(item){
	 		
	 		mui.openWindow({
	 			url:"tuiguang/tuig_type.html",
	 			 extras: {
	 			 		vid:item.Id,
                        tyname: item.Name
                    }
	 		});
		}
 	}
 });
 
 /*农资动态*/
var dt=new Vue({
	el:'#dongtai',
	data:{
		nongzi:[]
	},
	methods:{
 		toNZ: function(item){
	 		
	 		mui.openWindow({
	 			url:"secondPage/pinglun/lvyouPage.html",
	 			 extras: {
	 			 		message:item.Id,
	 			 		title:item.News_name
                    }
	 		});
		}
 	}
});


/*农业政策*/
var zc=new Vue({
	el:'#ny_zhengce',
	data:{
		nongce:[]
	},
	methods:{
 		toZC: function(item){
	 		
	 		mui.openWindow({
	 			url:"secondPage/pinglun/lvyouPage.html",
	 			 extras: {
	 			 		message:item.Id,
	 			 		title:item.News_name
                    }
	 		});
		}
 	}
});
/*农业科技 */
var kj=new Vue({
	el:'#ny_keji',
	data:{
		keji:[]
	},
	methods:{
 		toKJ: function(item){
	 		
	 		mui.openWindow({
	 			url:"secondPage/pinglun/lvyouPage.html",
	 			 extras: {
	 			 		message:item.Id,
	 			 		title:item.News_name
                    }
	 		});
		}
 	}
});
/*乡村旅游 */
var ly =new Vue({
	el:'#ny_lvyou',
	data:{
		lvyou:[]
	},
	methods:{
 		toLY: function(item){
	 		mui.openWindow({
	 			url:"secondPage/pinglun/lvyouPage.html",
	 			 extras: {
	 			 		message:item.Id,
	 			 		title:item.News_name
                    }
	 		});
		}
 	}
});
/*农业保险*/
var Ny =new Vue({
	el:'#ny_baoxian',
	data:{
		baoxian:[]
	},
	methods:{
 		toLY: function(item){
	 		mui.openWindow({
	 			url:"secondPage/pinglun/lvyouPage.html",
	 			 extras: {
	 			 		message:item.Id,
	 			 		title:item.News_name
                    }
	 		});
		}
 	}
});

 /*农商城*/
new Vue({
	el:'#sliderSegmentedControl',
	data:{
		imgTo:[
		{
			id:'1',
			linkImg:'../img/home/fruit.png',
			text:'水果'
		},{
			id:'2',
			linkImg:'../img/home/vagetables.png',
			text:'蔬菜'
		},{
			id:'3',
			linkImg:'../img/home/xumu.png',
			text:'家禽'
		}
		]
	},
	methods:{
		imgUrlTo:function(item){
			mui.openWindow({
    			url:'shop/goodslist/goodslist.html',
				id:"goodslist",
				styles:{
					navigationbar:{
						backgroundColor: '#FFFAFA',//导航栏背景色
					    titleText: item, //导航栏标题
					    titleColor: '#000000',//文字颜色
					    type:'transparent',//透明渐变样式
					    autoBackButton: true,//自动绘制返回箭头
					    splitLine:{//底部分割线
					        color:'#cccccc',
					        height:"1px"
					    }
					}
				},
				extras:{
					title:item,
				},
    		})
		}
	}
});

	
})();

function ToImgUrl(e){
 		mui.openWindow({
 			url:"tuiguang/tuig_active.html",
 			 extras: {
 			 		vid:e,
                    tyname: item.Name
                }
 		});
	}
	

function open_Url(){
//				var obj={
//					id:"",
//					name:"商品列表"
//				}
//				mui.fire(webview_detail,'get_mess',{
//                 obj:obj
//				});
//				//更改详情页原生导航条信息
//				setTimeout(function () {
//					webview_detail.show("slide-in-right", 300);
//				},150);
				mui.openWindow({
					id:"ListPage",
					url:"shop/goodslist/goodslist.html"
				})
				
}

