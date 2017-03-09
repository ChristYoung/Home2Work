###IE8下窗口的高度

firefox、chrome、IE9和safari:window.innerWidth和window.innerHeight

IE系列:document.body.clientWidth和document.body.clientHeight

不是IE6：document.documentElement.clientWidth和document.documentElement.clientHeight
兼容代码可以这样子写
var width = window.innerWidth;

var height = window.innerHeight;

if(typeof width != 'number'){

if(document.compatMode == 'CSS1Compat'){

width = document.documentElement.clientWidth;

height = document.docuementElement.clientHeight;

}else{

width = document.body.clientWidth;

height = document.body.clientHeight;
}

下面来介绍下什么是document.compatMode
document.compatMode用来判断当前浏览器采用的渲染方式。

官方解释：

BackCompat：标准兼容模式关闭。
CSS1Compat：标准兼容模式开启。

当document.compatMode等于BackCompat时，浏览器客户区宽度是document.body.clientWidth；
当document.compatMode等于CSS1Compat时，浏览器客户区宽度是document.documentElement.clientWidth

浏览器客户区高度、滚动条高度、滚动条的Left、滚动条的Top等等都是上面的情况。

一个准确获取网页客户区的宽高、滚动条宽高、滚动条Left和Top的代码：

if (document.compatMode == "BackCompat") {
cWidth = document.body.clientWidth;
cHeight = document.body.clientHeight;
sWidth = document.body.scrollWidth;
sHeight = document.body.scrollHeight;
sLeft = document.body.scrollLeft;
sTop = document.body.scrollTop;
}
else { //document.compatMode == "CSS1Compat"
cWidth = document.documentElement.clientWidth;
cHeight = document.documentElement.clientHeight;
sWidth = document.documentElement.scrollWidth;
sHeight = document.documentElement.scrollHeight;
sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
}

（以上代码兼容目前流行的全部浏览器，包括：IE、Firefox、Safari、Opera、Chrome）