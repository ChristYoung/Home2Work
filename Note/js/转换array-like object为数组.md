js有很多类数组(array-like object)，比如NodeList
var err = document.getElementsByClassName('err');

以下是三种方法将类数组转换成数组进行遍历
var list = [].slice.call(err);  //先把err转换成数组
list.forEach(function($e){ //执行遍历
	$e.addEventListener('click',function(){
		alert($e.innerHTML);
	});
});

//或者可以直接使用Array下的forEach方法
[].forEach.call(err,function($e){
  	$e.addEventListener('click',function(){
  		alert('1');
  	});
});
或者
[].forEach.apply(err,[function($e){
  	$e.addEventListener('click',function(){
  		alert('k');
  	});
}]);

 
//我们可以进一步用bind方法把数组自带的forEach方法封装的更好
var forEachArr = Array.prototype.forEach,
    forEach = Function.prototype.call.bind(forEachArr);
forEach(err,function($e){
    $e.addEventListener('click',function(){
                                            alert('1');
    });
});