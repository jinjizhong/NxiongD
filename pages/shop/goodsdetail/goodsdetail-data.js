var goodsinfo = {
  id:0,
  belongType:"747474",     //所属分类
  belongShopID:"111253232",//所属店铺
  belongShopName:"",
  goodsName: "特色蔬菜 全国畅销",
  configstr: "",//用户所选的配置内容
  currentprice: "149.00",//现价
  oldprice: "239.00",//原价
	sellNum:3333,//已售单数
//postage: "10.00", //邮费
//integral: "36",      //积分
  unit: "台",            //单位
  goodsnum: 4,       //购买数量
  stock:999,            //库存
  params:[             //其他未定的配置参数
  	{
  		name:"参数名称1",
  		value:"参数值1"
  	},
  	{
  		name:"参数名称2",
  		value:"参数值2"
  	},	
  	{
  		name:"参数名称3",
  		value:"参数值3"
  	}
  ],
  //商品图片
  imgUrls: [ { id: 1,src: 'http://pic.58pic.com/58pic/14/10/80/48v58PICSxD_1024.jpg' },
   								  { id: 2, src: 'http://pic32.photophoto.cn/20140704/0022005752769467_b.jpg'},
  								  {id: 3,src: 'http://pic.58pic.com/58pic/15/73/95/14f58PICmCs_1024.jpg' }
  ],
  //评论
  evaluates: [
  {
  	userTag: "../../../img/user.png",
  userName: "小明",
  evaluateTime: "2018-05-08 13:00", 
  evaluateScore:"9.4",
  evaluateContent: " 终于收到我需要的宝贝了，东西很好，价美物廉，谢谢掌柜的！说实在，这是我淘宝购物来让我最满意的一次购物。无论是掌柜的态度还是对物品，我都非常满意的。掌柜态度很专业热情，有问必答，回复也很快，我问了不少问题，他都不觉得烦，都会认真回答我，这点我向掌柜表示由衷的敬意，这样的好掌柜可不多。再说宝贝，正是我需要的，收到的时候包装完整，打开后让我惊喜的是，宝贝比我想象中的还要好！不得不得竖起大拇指。下次需要的时候我还会再来的，到时候麻烦掌柜给个优惠哦！ ",
      imgs:[	"../../../img/home/fruit.png","../../../img/home/xumu.png"]
    },
    {
      userTag: "../../../img/user.png",
      userName: "小明",
      evaluateTime: "2018-05-08 15:02",
      evaluateScore:"10.0",
      evaluateContent: "此用户没有填写评价内容",
      imgs:[]
    },
    {
      userTag: "../../../img/user.png",
      userName: "小明",
      evaluateTime: "2018-05-08 15:06",
      evaluateScore:"9.0",
      evaluateContent: "无论是掌柜的态度还是对物品，我都非常满意的。掌柜态度很专业热情，有问必答，回复也很快，我问了不少问题，他都不觉得烦，都会认真回答我，这点我向掌柜表示由衷的敬意，这样的好掌柜可不多!",
      imgs:[
      		"../../../img/home/fruit.png","../../../img/home/xumu.png"
      ]
    }
  ],
  // 概述参数开始
  otherDetailParam: [
    {
      typeName: "概述",
      content: [
        {
          imgPath: "../../../../images/lunbo/timg.jpg"
        },
        {
          imgPath: "../../../../images/lunbo/timg1.jpg"
        }, 
        {
          imgPath: "../../../../images/lunbo/timg2.jpg"
        }
      ]
    },
    {
      typeName: "参数",
      content: [
        {
          imgPath: "../../../../images/lunbo/timg1.jpg"
        },
        {
          imgPath: "../../../../images/lunbo/timg.jpg"
        }
      ]
    }
  ]
}