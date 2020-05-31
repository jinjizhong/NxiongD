var listinfo=new Vue({
	el:'.mui-content',
	data:{
		listType:0,
		pageNo:1,
		shopPageNo:1,
		typeID:'',
//		records:0,
		rows:[],
		shop_rows:[]
	},
	methods:{
		next_page:function(e){
			open_Url(e);
		},
		showTypes:function(){
			showTypes(); 
		},
		toogleOpenListTypeMenu:function(e){
			this.isOpenListTypeMenu=!this.isOpenListTypeMenu
		},
		girdState:function(){
			this.listType=0;
		},
		listState:function(){
			this.listType=1;
		}
	},
	filters:{
		search:function (value){
		    if (!value) return ''
		    value = value.toString();
		    return 
		}
	}
});


