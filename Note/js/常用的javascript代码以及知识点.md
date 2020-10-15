~~~.如何将一个对象字面量转换成JSON对象
var userData = {name:'xiaoming',age:'78'};
var jsonData = JSON.parse(JSON.stringfy(userData));

~~~.jquery将form表单中的内容格式化成一个对象字面量(可用于ajax提交)
//js map函数用来遍历数组中的每一项值的，用来遍历数组中的每一项
var useDate = {};
$("#formId").serializeArray().map( function(x){
    useData[x.name] = x.value;
} );


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


~~~~['2', '3', ‘啦啦啦’, '哈哈','啦啦啦'].filter(function(ele, index, arr) { // 简单的数组去重
  return index === arr.indexOf(ele);
}); 

~~~.JQUERY获取滚动条距离顶部的高度
  $(window).scrollTop();scrollTop获取的是内部元素超出外部容器的高度。
例如：$('window').scrollTop()获取的就是当前这个页面超出窗口最上端的高度，scrollLeft与此同理

~~~.原生js获取滚动条距离顶部的高度
	function getPageScrollTop() {
    let a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
}

~~~.原生js获取滚动条距离左侧的高度
	function getPageScrollTop() {
    let a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft;
}

~~~.开启全屏
	function launchFullscreen(element) {
       if (element.requestFullscreen) {
           element.requestFullscreen()
       } else if (element.mozRequestFullScreen) {
           element.mozRequestFullScreen()
       } else if (element.msRequestFullscreen) {
           element.msRequestFullscreen()
   } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen()
    }
    }
    
    
~~~.关闭全屏
	function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
    

~~~.滚动到指定元素区域
	const smoothScroll = element =>{
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
};

~~~.平滑滚动到页面顶部    
	const scrollToTop = () => {
	    const c = document.documentElement.scrollTop || document.body.scrollTop;
	    if (c > 0) {
	        window.requestAnimationFrame(scrollToTop);
	        window.scrollTo(0, c - c / 8);
	    }
	};
	
	
~~~.打开一个窗口
function openWindow(url, windowName, width, height) {
       var x = parseInt(screen.width / 2.0) - width / 2.0;
       var y = parseInt(screen.height / 2.0) - height / 2.0;
       var isMSIE = navigator.appName == "Microsoft Internet Explorer";
       if (isMSIE) {
           var p = "resizable=1,location=no,scrollbars=no,width=";
           p = p + width;
           p = p + ",height=";
           p = p + height;
           p = p + ",left=";
           p = p + x;
           p = p + ",top=";
           p = p + y;
           window.open(url, windowName, p);
       } else {
           var win = window.open(
               url,
               "ZyiisPopup",
               "top=" +
               y +
               ",left=" +
               x +
               ",scrollbars=" +
               scrollbars +
               ",dialog=yes,modal=yes,width=" +
               width +
               ",height=" +
           height +
            ",resizable=no"
        );
        eval("try { win.resizeTo(width, height); } catch(e) { }");
        win.focus();
    }
    }
		
    

~~~.移动端判断是否是android
var nua = navigator.userAgent
var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)


~~~.jquery data()方法注意点:
  在元素的自定义属性上绑定"data-"开头的属性后,在jq中可以通过data()方法获取,但是绑定的属性不能有大写字母,比如"data-keyName",
  就无法通过data('keyName')方法获取到数据,必须写成"data-keyname"才行 
  
  
~~~. JS 浏览器打开新窗口, 非tab
	要使用非tab方式打开的 JS如下:

                     window.open(url, "_blank", "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");



      设置  alwaysRaised=yes 属性.  
  	更多信息可参考:  http://stackoverflow.com/questions/726761/javascript-open-in-a-new-window-not-tab
  	
  
~~~.获取文件base64编码  
/**
     * @param file
     * @param format  指定文件格式
     * @param size  指定文件大小(字节)
     * @param formatMsg 格式错误提示
     * @param sizeMsg   大小超出限制提示
     * @returns {Promise<any>}
       */
       export function fileToBase64String(file, format = ['jpg', 'jpeg', 'png', 'gif'], size = 20 * 1024 * 1024, formatMsg = '文件格式不正确', sizeMsg = '文件大小超出限制') {
       return new Promise((resolve, reject) => {
           // 格式过滤
           let suffix = file.type.split('/')[1].toLowerCase();
           let inFormat = false;
           for (let i = 0; i < format.length; i++) {
               if (suffix === format[i]) {
                   inFormat = true;
                   break;
               }
           }
           if (!inFormat) {
               reject(formatMsg);
           }
           // 大小过滤
           if (file.size > size) {
               reject(sizeMsg);
           }
           // 转base64字符串
       let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let res = fileReader.result;
            resolve({base64String: res, suffix: suffix});
            reject('异常文件，请重新选择');
        }
    })
    }


~~~.base64转file

 /**
     *  @param { base64 } base64
     *  @param { string } filename 转换后的文件名
        */
        export const base64ToFile = (base64, filename )=> {
        let arr = base64.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let suffix = mime.split('/')[1] ;// 图片后缀
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
    while (n--) {
         u8arr[n] = bstr.charCodeAt(n)
     }
     return new File([u8arr], `${filename}.${suffix}`, { type: mime })
     };
     
     
~~~.base64转blob

 /**
     *  @param { base64 } base64
        */
        export const base64ToBlob = base64 => {
        let arr = base64.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
     }
     return new Blob([u8arr], { type: mime });
     };

    
  
