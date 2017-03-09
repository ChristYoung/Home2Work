###获取元素CSS值之getComputedStyle方法熟悉

(一):
getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值。返回的是一个CSS样式声明对象([object CSSStyleDeclaration])，只读。
语法如下:
var style = window.getComputedStyle("元素", "伪类");
第二个参数“伪类”是必需的（如果不是伪类，设置为null），不过现在嘛，不是必需参数了。
 
(二)getComputedStyle与style的区别
1.只读与可写
正如上面提到的getComputedStyle方法是只读的，只能获取样式，不能设置；而element.style能读能写，能屈能伸。
 
2.获取的对象范围
getComputedStyle方法获取的是最终应用在元素上的所有CSS属性对象（即使没有CSS代码，也会把默认的祖宗八代都显示出来）；
而element.style只能获取元素style属性中的CSS样式。因此对于一个光秃秃的元素<p>，
getComputedStyle方法返回对象中length属性值（如果有）就是190+(据我测试FF:192, IE9:195, Chrome:253, 不同环境结果可能有差异), 而element.style就是0。
 
(三)getComputedStyle与currentStyle
currentStyle是IE浏览器自娱自乐的一个属性，其与element.style可以说是近亲，至少在使用形式上类似，
element.currentStyle，差别在于element.currentStyle返回的是元素当前应用的最终CSS属性值（包括外链CSS文件，页面中嵌入的<style>属性等）。
 
因此，从作用上将，getComputedStyle方法与currentStyle属性走的很近，形式上则style与currentStyle走的近。不过，currentStyle属性貌似不支持伪类样式获取，这是与getComputedStyle方法的差异，也是jQuery css()方法无法体现的一点。
 
我们要获取一个元素的高度，可以类似下面的代码：
alert((element.currentStyle? element.currentStyle : window.getComputedStyle(element, null)).height);