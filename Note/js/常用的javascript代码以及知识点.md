~~~.如何将一个对象字面量转换成JSON对象
var userData = {name:'xiaoming',age:'78'};
var jsonData = JSON.parse(JSON.stringfy(userData));

~~~.jquery将form表单中的内容格式化成一个对象字面量(可用于ajax提交)
//js map函数用来遍历数组中的每一项值的，用来遍历数组中的每一项
var useDate = {};
$("#formId").serializeArray().map( function(x){
    useData[x.name] = x.value;
} );


~~~.原生JavaScript获取域名主机
function getHost(url) {
        var host = "null";
        if(typeof url == "undefined"|| null == url) {
            url = window.location.href;
        }
        var regex = /^\w+\:\/\/([^\/]*).*/;
        var match = url.match(regex);
        if(typeof match != "undefined" && null != match) {
            host = match[1];
        }
        return host;
}

~~~.原生JavaScript获得URL中GET参数值
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function get_get(_url,key){ //获得URL中GET参数值
  var gets = [];	
  querystr = _url.split("?");
  if(querystr[1]){
  	gets = querystr[1].split('&');
    for(var i=0,len=gets.length; i<len; i++){
    	var tmp_arr = gets[i].split('=');
    	if(tmp_arr[0] == key){
    		return tmp_arr[1];
    	}
    }
    return -1;
   }
}; 


~~~.function changeURLArg(url,arg,arg_val){  //修改url中get参数的值
    var pattern=arg+'=([^&]*)'; 
    var replaceText=arg+'='+arg_val; 
    if(url.match(pattern)){ 
        var tmp='/('+ arg+'=)([^&]*)/gi'; 
        tmp=url.replace(eval(tmp),replaceText); 
        return tmp; 
    }else{ 
        if(url.match('[\?]')){ 
            return url+'&'+replaceText; 
        }else{ 
            return url+'?'+replaceText; 
        } 
    } 
    return url+'\n'+arg+'\n'+arg_val; 
};

~~~/**
 * 
 * @desc 随机生成颜色
 * @return {String} 
 */
function randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

~~~function ExistsSameValues(a1, a2) { // 判断两个数组是否有交集
	var flag = false;
	if(a1 instanceof Array && a2 instanceof Array) {
		for(var i = 0, len = a1.length; i < len; i++) {
			for(var j = 0, lenJ = a2.length; j < lenJ; j++) {
				if(a1[i] != "" && a2[j] != "" && a1[i] == a2[j]) {
					flag = true;
				}
			}
		}
		return flag;
	} else {
		alert('请传入数组类型');
	}
};

~~~function deletRepeat(arr1, arr2) { // 删除两个数组的重复的部分,返回删除后的数组,参数必须传入数组类型
	var temp1 = [],
		temp2 = [];
	for(var i = 0; i < arr1.length; i++) {
		temp1[arr1[i]] = true;
	};
	for(var i = 0; i < arr2.length; i++) {
		if(!temp1[arr2[i]]) {
			temp2.push(arr2[i]);
		}
	};
	return arr1.concat(temp2);
};

~~~Array.prototype.indexOf = function(val) { // 寻找数组的指定项目
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) return i;
	}
	return -1;
};

~~~Array.prototype.remove = function(val) { // 删除指定的数组项目
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};

~~~Array.prototype.isIn = function(_index) { // 判断某个元素是否在指定的数组中
	for(var i = 0; i < this.length; i++) {
		if(_index == this[i]) {
			return i;
		}
	};
	return -1;
};

~~~~['2', '3', ‘啦啦啦’, '哈哈','啦啦啦'].filter(function(ele, index, arr) { // 简单的数组去重
  return index === arr.indexOf(ele);
}); 

~~~.JQUERY
  $(window).scrollTop();scrollTop获取的是内部元素超出外部容器的高度。
例如：$('window').scrollTop()获取的就是当前这个页面超出窗口最上端的高度，scrollLeft与此同理


~~~.移动端判断是否是android
var nua = navigator.userAgent
var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)

~~~.jquery data()方法注意点:
  在元素的自定义属性上绑定"data-"开头的属性后,在jq中可以通过data()方法获取,但是绑定的属性不能有大写字母,比如"data-keyName",
  就无法通过data('keyName')方法获取到数据,必须写成"data-keyname"才行 
