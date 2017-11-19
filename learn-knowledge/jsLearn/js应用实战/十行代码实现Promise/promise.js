//整理下思路：
//
//Tool 是一个对象
//Tool 有 then 这个方法
//执行 then 方法返回的应该还是 Tool 对象

function Promise(){
	this.callBacks = [];
};
Promise.prototype.then = function(fn){
	this.callBacks.push(fn); //调用then时把函数放入数组
	return this;
};
Promise.prototype.resolve = function(data){
	var fn = this.callBacks.shift(); //当调用resolve时拿出一个函数 
	fn&&fn(data); //执行这个函数,并把resolve的参数做参数
};
