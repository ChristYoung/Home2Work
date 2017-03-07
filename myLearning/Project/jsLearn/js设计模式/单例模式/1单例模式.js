var singleFun = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this,arguments));//执行fn并改变this指向,匿名函数的this指向调用它的对象,并且通过apply代替了fn的this;
	};
};

var createMask = singleFun(function(){
	console.log(this); //如果fn不改变this指向的话,这时候打印出来的this是window;
	return document.body.appendChild(document.createElement("div"));
});

createMask();
