0.如何将一个对象字面量转换成JSON对象
var userData = {name:'xiaoming',age:'78'};
var jsonData = JSON.parse(JSON.stringfy(userData));

1.jquery将form表单中的内容格式化成一个对象字面量(可用于ajax提交)
//js map函数用来遍历数组中的每一项值的，用来遍历数组中的每一项
var useDate = {};
$("#formId").serializeArray().map( function(x){
    useData[x.name] = x.value;
} );


2.原生JavaScript获取域名主机
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

3.原生JavaScript获得URL中GET参数值
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function get_get(){ 
  querystr = window.location.href.split("?")
  if(querystr[1]){
    GETs = querystr[1].split("&")
    GET =new Array()
    for(i=0;i<GETs.length;i++){
      tmp_arr = GETs[i].split("=")
      key=tmp_arr[0]
      GET[key] = tmp_arr[1]
    }
  }
  return querystr[1];
}

4.JQUERY
  $(window).scrollTop();scrollTop获取的是内部元素超出外部容器的高度。
例如：$('window').scrollTop()获取的就是当前这个页面超出窗口最上端的高度，scrollLeft与此同理


5.移动端判断是否是android
var nua = navigator.userAgent
var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)


6.原生JavaScript常用的正则表达式
//正整数
/^[0-9]*[1-9][0-9]*$/;

//负整数
/^-[0-9]*[1-9][0-9]*$/;

//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;   

//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  

//浮点数
/^(-?\d+)(\.\d+)?$/;

//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

//url地址
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;

//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;

//匹配中文字符
/[\u4e00-\u9fa5]/;

//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;

//匹配空白行的正则表达式
/\n\s*\r/;

//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;

//匹配身份证
/\d{15}|\d{18}/;

//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;

//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;

//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;

//匹配HTML标记的正则表达式
< (\S*?)[^>]*>.*?|< .*? />;