var vm = new Vue({
	el:'.container',
	data:{
		limitNum:3,//默认显示的地址条数
		addressList:[],
		currIndex:-1, //默认选择的卡片的索引,
		shippingMethod:1 //默认的配送方式
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAddressList:function(){
			var _this = this;
			this.$http.get('data/address.json').then(function(response){
				var res = response.data;
				_this.addressList = res.result;
			});
		},
		setDefaultAddress:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId == addressId){
					address.isDefault = true;
				}else{
					address.isDefault = false;
				}
			});
		}
	}
});