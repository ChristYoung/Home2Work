function ajax(obj){
	var xhr = new XMLHttpRequest();
	//通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
	obj.url = obj.url+'?rand='+Math.random();
	obj.data = JSON.stringify(obj.data);
	if(obj.method === 'get'){
		obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data; 
	};
	if(obj.async === true){ //true表示异步，false表示同步
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				callBack();
			}
		};
	}
	
	//在使用XHR对象时，必须先调用open()方法，
    //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步.
    xhr.open(obj.method,obj.url,obj.async);
    if(obj.method === 'post'){
    	//post方式需要自己设置http的请求头，来模仿表单提交。
        //放在open方法之后，send方法之前
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(obj.data); //post方式将数据放在send()方法里
    }else{
    	xhr.send(null); //get方式则填null;
    }
    if(obj.async === false){
    	callBack();
    }
    function callBack(data){
    	if(xhr.status == 200){ //判断http交互是否成功,200表示成功
    		obj.success(xhr.responseText); //回调传递参数
    	}else{
    		alert()
    	}
    }
}
