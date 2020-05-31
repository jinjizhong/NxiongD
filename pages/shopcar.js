var returnNum=0;
var settle = null; 
var titleNView = { 
	backgroundColor: '#f7f7f7', 
    titleText: '', 
	titleColor: '#000000', 
	type: 'transparent', 
	autoBackButton: true,
	splitLine: { 
		color: '#cccccc'
	}
}
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
			settle = mui.preload({
				url: 'settle/settle.html',
				id: 'go_settle',
				styles: {
					"render": "always",
					"popGesture": "hide",
					"bounce": "vertical",
					"bounceBackground": "#efeff4"
					//titleNView: titleNView
				}
			});
	});
function requestData(){
				var userID='';
				var valu =localStorage.getItem("UserInfo");
				if(valu){
						shopcar.isLogin=true;
						var user=JSON.parse(valu);
						userID=user.userinfo.Id;
				}
			   var dataObj={
						DriverID:"1234567890",
						UserID: "任务标识",
						TaskGuid:"b4026263-704e-4e12-a64d-f79cb42962cc",
						DataType: "ShopCar",
						page: "1",
						rows: "10",
						keywords: "",
						User: userID
				}
				mui.ajax(serverUrl,{
					data:{
						"strJson": JSON.stringify(dataObj)
					},
					dataType:'json',//服务器返回json格式数据  
					type:'POST',//HTTP请求类型
					timeout:8000,//超时时间设置为10秒；              
					success:function(data){
						if(data){
							var  info=JSON.parse(data);
							var newInfo= recombineData(info);
							shopcar.cargoods=newInfo;
						}
						mui('#list').pullRefresh().endPulldown();
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast("请求失败 , 请查看网络设置后重新运行");
						mui('#list').pullRefresh().endPulldown();
					}
				})
}
//--------------构建vue象-------------------------
var shopcar=new Vue({
	el:'.mui-content',
	data:{
		isLogin:false,
		isdilute:false,
	    allchecked:false,
		//最终的订单信息
		orderinfo:{
			total:0,
			ordergoods:[],
			allgoodsnum:0
		},
		//商品信息
		cargoods:[]
	},
	methods:{
		add:function(index,index_a){
			this.cargoods[index].goodsInfo[index_a].checked=true;
			if(this.cargoods[index].goodsInfo[index_a].num<this.cargoods[index].goodsInfo[index_a].stock){
				this.cargoods[index].goodsInfo[index_a].num++;
			}
			setOrderInfo();
		},
		reduce:function(index,index_a){
			this.cargoods[index].goodsInfo[index_a].checked=true;
			if(this.cargoods[index].goodsInfo[index_a].num>1){
				this.cargoods[index].goodsInfo[index_a].num--;
			}
			setOrderInfo();
		},
		checkedItem:function(index,index_a){
				if(index_a < 0){
					this.cargoods[index].checked=!this.cargoods[index].checked;
					var arr=this.cargoods[index].goodsInfo;
					for(var i=0;i<arr.length;i++){
						arr[i].checked=this.cargoods[index].checked;
					}
				}else{
				this.cargoods[index].goodsInfo[index_a].checked=!this.cargoods[index].goodsInfo[index_a].checked;
				}
				var flagshop=true;
				var flagall=true;
				for(var i=0;i<this.cargoods[index].goodsInfo.length;i++){
							if(!this.cargoods[index].goodsInfo[i].checked){
								flagshop=false;
								break;
							}
				}
				for(var j=0;j<this.cargoods.length;j++){
						for(var i=0;i<this.cargoods[j].goodsInfo.length;i++){
							if(!this.cargoods[j].goodsInfo[i].checked){
								flagall=false;
								break;
							}
						}
			    }
				this.cargoods[index].checked=flagshop;
				this.allchecked=flagall;
				setOrderInfo();
		},
		checkedAll:function(){
				this.allchecked=!this.allchecked;
				for(var j=0;j<this.cargoods.length;j++){
						for(var i=0;i<this.cargoods[j].goodsInfo.length;i++){
							this.cargoods[j].goodsInfo[i].checked=this.allchecked;
							this.cargoods[j].checked=this.allchecked;
						}
			   }
				setOrderInfo();
		},
		change_isdilute:function(){
			this.isdilute=!this.isdilute
		},
		go_settle:go_settle
	}
})

var topconfig=new Vue({
	el:'#title-header',
	data:{isActive:false},
	methods:{
		del:del
	}
})
//--------------------------工具方法---------------------
//检查用户是否选择了商品
var check=function(){
	var flag=false;
	for(var j=0;j<shopcar.cargoods.length;j++){
		for(var i=0;i<shopcar.cargoods[j].goodsInfo.length;i++){
			if(shopcar.cargoods[j].goodsInfo[i].checked){
				flag=true;
				break;
			}
		}
	}
	return flag;
}
//移出购物车
function del(){
	if(check()){
		var btnArray = ['确认','取消'];
		mui.confirm('您确认要将这些商品移除购物车？','提示', btnArray, function(e) {
			    var dataObj={};
			    var w=plus.nativeUI.showWaiting("处理中，请等待...", {loading:{display:"inline"}});
			    var userID='';
				var valu =localStorage.getItem("UserInfo");
				if(valu){
						shopcar.isLogin=true;
						var user=JSON.parse(valu);
						userID=user.userinfo.Id;
				}
				var data={
						DriverID:'1234567890',
				     	UserID: '任务标识',
				     	TaskGuid:'b4026263-704e-4e12-a64d-f79cb42962cc',
				     	DataType: 'ShopCar',
				     	keywords: '',
				     	User : userID
				}
				mui.ajax('http://151012fp30.iask.in/api/ServerTransform',{
					data:{
						"strJson": "{'DriverID':'1234567890','UserID': '任务标识','TaskGuid':'b4026263-704e-4e12-a64d-f79cb42962cc','DataType': 'ShopCar','page': '1','rows': '10','keywords': '','User': '"+userID+"'}"
					},
					dataType:'json',//服务器返回json格式数据  
					type:'POST',//HTTP请求类型
					timeout:8000,//超时时间设置为10秒；              
					success:function(data){
						requestData();
						setOrderInfo();
						w.close();
					},
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast("请求失败 , 请查看网络设置后重新运行");
						w.close();
					}
				})
		})
	}else{
		mui.alert('请先选择商品')
	}
}

//计算合计价格和商品数量
function  setOrderInfo(){
	var count=0;
	var price=0;
	var arr=[];
	var car_currentGoodsInfo=shopcar.cargoods;
		for(var i=0;i<car_currentGoodsInfo.length;i++){
			var goods=car_currentGoodsInfo[i].goodsInfo;
			for(var j=0;j<goods.length;j++){
				if(goods[j].checked){
					count+=goods[j].num;
					price+=goods[j].price*goods[j].num;		
				}
			}
		}
	shopcar.orderinfo.total=price;
	shopcar.orderinfo.allgoodsnum=count;
}

function recombineData(data){
	var obj_arr=[];
	for(var e in data){
		var flag=false;
		for(var r in obj_arr){
			if(data[e].shop_id==obj_arr[r].shopInfo.id){
				flag=true;
			}
		}
		if(flag){
			    var goods={
			    		good_ID:data[e].good_id,
						imgUrls:[ { id: 0,src: data[e].good_imgurls}],
						checked:false,
						title:data[e].good_name,
						configstr:data[e].goods_spec,
						discounts:["爱婴坊优惠价"],
						price:data[e].good_now_price,
						num:data[e].goods_Num,
						stock:data[e].goods_Stock_num
				}
			    obj_arr[r].goodsInfo.push(goods);
		}else{
		            var obj={
								checked:false,
								//店铺信息
								shopInfo:{
									id:data[e].shop_id,
									name:data[e].shop_name,
									postage:data[e].Shop_postage,
									shopUrl:"",
									activity:[{
											name:"换购",
											title:"购满一件，即可享受换购优惠",
									        linktext:"去换购",
									        linkurl:"#"
									}],
								},
								//商品信息
								goodsInfo:[
											{
												good_ID:data[e].good_id,
												imgUrls:[ { id: 0,src: data[e].good_imgurls}],
												checked:false,
												title:data[e].good_name,
												configstr:data[e].goods_spec,
												discounts:["爱婴坊优惠价"],
												price:data[e].good_now_price,
												num:data[e].goods_Num,
												stock:data[e].goods_Stock_num,
												postage:data[e].Shop_postage
											}
								]
					}
				    obj_arr.push(obj);
		}
	}
	return obj_arr;
}

//去结算
function go_settle() {
		if(!check()){
			mui.alert('请先选择商品');
			return;	
		}
		var list=[];
		for(var j=0;j<shopcar.cargoods.length;j++){
				var flag=false;
				var goodsInfo=[];
				for(var i=0;i<shopcar.cargoods[j].goodsInfo.length;i++){
					if(shopcar.cargoods[j].goodsInfo[i].checked){
						flag=true;
						goodsInfo.push(shopcar.cargoods[j].goodsInfo[i]);
					}
				}
				if(flag){
					var obj={
						shopInfo:shopcar.cargoods[j].shopInfo,
						goodsInfo:goodsInfo
					}
					list.push(obj);
				}
		}
		if(list.length>0){
				if(!settle) {
					setTimeout(function() {
						go_settle();
					}, 100);
				}
				//触发子窗口变更新闻详情
				mui.fire(settle,'orderinfo',{
					orderinfo:list
				});
				setTimeout(function () {
					settle.show("slide-in-right", 300);
				},150);
		}else{
			mui.toast("没有商品信息,操作失败!")
		}
}
document.getElementById("login").addEventListener('tap',function(){
	mui.openWindow({
		url:"myse/sign.html",
		id:"sign.html"
	})
})


