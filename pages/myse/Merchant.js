mui.init({});
var message = new Vue({
	el: '.mui-content',
	data: {
		renzhen: ['商户认证', '实地认证', '企业认证'],
		xinxi: [
			'产地批发商', //认证的身份
			'山东红富士', //认证产品种类
			'江苏淮安市淮阴区', //认证地区
			'批发超市、电商、商超', //供货渠道
			'200亩', //规模
			'20吨', //日供货量
		],
		img: ['../../img/myse/shenfen1.jpg',
			'../../img/myse/shenfen1.jpg',
			'../../img/myse/shenfen1.jpg'
		], //承诺书-企业资质-产品资质
		page_view: ['1452', '426', '23'], //访客-联系-订单
		Supply_order: [{ //供货信息
			linkImg: '../../img/myse/1536127875.png', //卖的东西的图片
			biaoti: '红富sd士苹果', //卖的是什么东西
			chandi: '江苏省淮安市淮阴区尘埃', //产地
			jiage: '35/箱', //单位价格，因为卖的东西不一样，所以需要有单位
			yishou: '22/箱', //已经卖了多少
		}, {
			linkImg: '../../img/myse/1536127875.png',
			biaoti: '红富士苹果',
			chandi: '江苏省淮安市淮阴区尘埃',
			jiage: '35',
			yishou: '22/箱'
		}, {
			linkImg: '../../img/myse/1536127875.png',
			biaoti: '红富士苹果',
			chandi: '江苏省淮安市淮阴区尘埃',
			jiage: '35',
			yishou: '22/箱'
		}, {
			linkImg: '../../img/myse/1536127875.png',
			biaoti: '红富士苹果',
			chandi: '江苏省淮安市淮阴区尘埃',
			jiage: '35',
			yishou: '22/箱'
		}, {
			linkImg: '../../img/myse/1536127875.png',
			biaoti: '红富士苹果',
			chandi: '江苏省淮安市淮阴区尘埃',
			jiage: '35',
			yishou: '22/箱'
		}, {
			linkImg: '../../img/myse/1536127875.png',
			biaoti: '红富士苹果',
			chandi: '江苏省淮安市淮阴区尘埃',
			jiage: '35',
			yishou: '22/箱'
		}, {
			linkImg: '../../img/myse/1536127875.png',
			biaoti: '红富士苹果',
			chandi: '江苏省淮安市淮阴区尘埃',
			jiage: '35',
			yishou: '22/箱'
		}],
		Receiving_order: [{ //收购信息
			biaoti: '西瓜', //基本是需要采购什么
			yaoqiu: '电话沟通', //沟通方式
			shijian: '2018-02-23 12:32:50', //yyyy-mm-dd HH:MM:ss
			shuliang: '2000', //单位斤
			zixun: '立即咨询', //咨询时间，
			tel:'15309870987',
		}]
	}
})

document.getElementById("phone").addEventListener('tap', function() {
	var btnArray = ['立即拨打', '取消'];
	var phone = document.getElementById('tel').innerText;
	plus.device.dial(phone, false);
});

var deceleration = mui.os.ios ? 0.003 : 0.0009;
mui('.mui-scroll-wrapper').scroll({
	bounce: false,
	indicators: false, //是否显示滚动条
	deceleration: deceleration
});

mui('.mui-slider').slider().stopped = true; //这是关闭页面主体左右滑动效果

//这个是从系统内存里取东西
var userID = null;
var valu = localStorage.getItem("UserInfo");
if(valu) {
	var user = JSON.parse(valu);
	userID = user.userinfo.Id;
}
