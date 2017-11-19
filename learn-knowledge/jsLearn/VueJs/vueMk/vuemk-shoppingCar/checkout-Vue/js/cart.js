//完整的vue实例
var vm = new Vue({
	el: "#app",
	data: {
		totalMoney: 0,
		productList: [],
		checkAllFlg: false,
		checkedLen: 0,
		delFlag: false,
		delTargetProduct: ''
	},
	filters: {
		//局部的过滤器
		formatMoney: function(value) {
			return '￥' + value.toFixed(2);
		}
	},
	mounted: function() {
		//页面加载完后调用的方法
		this.cartView();
	},
	methods: {
		cartView: function() { //页面数据初始化
			//在vue实例中所有的this都指向vue实例,但是在某一个函数内部this的指向已经发生变化
			var _this = this;
			this.$http.get("data/cart.json").then(function(res) {
				//vue-resources已经封装了一层,这边采用res.data
				_this.productList = res.data.result.productList;
				_this.totalMoney = res.data.result.totalMoney;
			});
		},
		changeMoney: function(product, way) { //点加号和减号修改数量
			if(way > 0) { //way是1代表点的是加,way是-1代表点的是减
				product.productQuentity++;
			} else {
				product.productQuentity--;
				if(product.productQuentity < 1) {
					product.productQuentity = 1;
				}
			};
			this.calcItemTotal();
		},
		selectedProduct: function(item) { //选择商品
			if(typeof item.checked == 'undefined') { //如果恒等于undefined说明这个字段在对象中不存在
				//Vue.set(item,'checked',true); //通过vue全局注册在item的变量中注册了一个checked字段,因为接口中并未返回checked字段
				this.$set(item, "checked", true); //局部注册
				this.checkedLen++;
			} else {
				if(item.checked) {
					this.checkedLen--;
				} else {
					this.checkedLen++;
				}
				item.checked = !item.checked;
			};
			//checkedLen等于productList的length,代表全部选中
			if(this.checkedLen == this.productList.length) {
				this.checkAllFlg = true;
			} else {
				this.checkAllFlg = false;
			}
			this.calcItemTotal();
		},
		checkAll: function() {
			this.checkAllFlg = !this.checkAllFlg;
			if(!this.checkAllFlg) { //如果取消全选,则把checkedLen置为0
				this.checkedLen = 0;
			} else {
				this.checkedLen = this.productList.length;
			}
			var _this = this;
			this.productList.forEach(function(item, index) {
				if(typeof item.checked == 'undefined') { //点击全选的时候先判读有没有checked属性,如果没有就主动添加 
					_this.$set(item, "checked", _this.checkAllFlg);
				} else {
					item.checked = _this.checkAllFlg;
				}
			});
			this.calcItemTotal();
		},
		calcItemTotal: function() { //计算item total
			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item, index) {
				if(item.checked) {
					_this.totalMoney += item.productPrice * item.productQuentity;
				}
			});
		},
		delConfirm: function(item) { //确认删除,并保存当前要删除的item
			this.delFlag = true;
			//保存当前选中的要删除的商品
			this.delTargetProduct = item;
		},
		delProduct: function() { //删除商品
			var _index = this.productList.indexOf(this.delTargetProduct);
			this.productList.splice(_index, 1);
			this.delFlag = false;
		}
	}
});

//全局过滤器,第一个参数是过滤器的名称,第二个参数是回调函数
Vue.filter('money', function(value, status) {
	return '￥' + value.toFixed(2) + status;
});