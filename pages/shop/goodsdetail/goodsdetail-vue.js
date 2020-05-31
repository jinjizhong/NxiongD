//var selfCar=[];
var goods=new Vue({
	el:".mui-content",
	data:{
		goodsinfo:goodsinfo,
		car_sumGoods:0
	},
	methods:{
		share:share
	},
	methods:{
		showContent:function(){}, 
		del:del,
		add:add,
		toShoppingCar:open_Url,
		buyNow:buyNow,
		addToShopCar:addToShopCar
	}
})

function share(){
	console.log('分享');
}

function del(){
	if(goods.goodsinfo.goodsnum>1 ){
			goods.goodsinfo.goodsnum--;
	}
}

function add(){
	if(goods.goodsinfo.goodsnum<goods.goodsinfo.stock){
		goods.goodsinfo.goodsnum++;
	}
}

function addToShopCar(){
	var valu =localStorage.getItem("UserInfo");
	if(!valu) {
	    mui.toast("请您先登录账号！");
	    return
	};
    var userID=JSON.parse(valu).userinfo.Id;
    addToCar(goods.goodsinfo,userID);
	goods.car_sumGoods=0;
}


