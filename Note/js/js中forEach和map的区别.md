###forEach和map的区别
forEach: 1.用来遍历数组中的每一项；这个方法执行是没有返回值的，对原来数组也没有影响
         2.数组中有几项，那么传递进去的匿名回调函数就需要执行几次
         3.每一次执行匿名函数的时候，还给其传递了三个参数值：数组中的当前项item,当前项的索引index,原始数组oldArr
         4.理论上这个方法是没有返回值的，仅仅是遍历数组中的每一项，不对原来数组进行修改；但是我们可以自己通过数组的索引来修改原来的数组 
         5.forEach方法中的this是ary,匿名回调函数中的this默认是window   
         var ary = [12,23,24,42,1];
		 var res = ary.forEach(function (item,index,oldArr) {
		     oldArr[index] = item*10;
		 })
		 console.log(res);//-->undefined;
		 console.log(ary);//-->会对原来的数组产生改变(因为修改了原始数组oldArr)；           
		 
		 
map:1.和forEach非常相似，都是用来遍历数组中的每一项值的，用来遍历数组中的每一项；
    2.map的回调函数中支持return返回值；return的是啥，
              相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份的数组中的对应项改变了）
    3.不管是forEach还是map 都支持第二个参数值，第二个参数的意思是把匿名回调函数中的this进行修改          	
    var ary = [12,23,24,42,1];
	var res = ary.map(function (item,index,input) {
	     return item*10;
	})
	console.log(res);//-->[120,230,240,420,10];
	console.log(ary);//-->[12,23,24,42,1]；	                       