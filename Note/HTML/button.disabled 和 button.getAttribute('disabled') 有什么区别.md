「node.getAttribute('someAttribute')」获取的是「attribute」，
而「node.someAttribute」获取的是元素的「property」，二者并不相同。 参考 properties-and-attributes-in-html

在大多数情况下「property」和「attribute」是同步的，如场景1。
场景1：
<input id="username" type="text">
<script>
var userInput = document.querySelector('#username');
console.log( userInput.id );                  //"username"
console.log( userInput.getAttribute('id') );  //"username"
</script>
这里 userInput.id 和 userInput.getAttribute('id') 获取的值相等。



当然我们关注的是例外，如场景2、3、4.
场景2：
<input id="username" type="text" sex="male" age=26>
<script>
var userInput = document.querySelector('#username');
console.log( userInput.sex );                  // undefined
console.log( userInput.getAttribute('sex') );  // "male"
console.log( userInput.getAttribute('SEX') );  // "male"
console.log( userInput.getAttribute('age'));   // "26"
</script>
从上面的例子可以得出如下结论：

「node.property」的方式不能获取自定义属性，「node.getAttribute()」的方式可以获取自定义属性
「node. getAttribute()」获取自定义属性忽略属性的大小写
「node.getAttribute()」获取自定义属性得到的值的类型总是字符串


场景3：
<button id="btn" disabled>点我</button>
<script>
var btn = document.querySelector('#btn');
console.log( btn.disabled );                  // true
console.log( btn.getAttribute('disabled') );  // ""
</script>
<button id="btn" disabled=false>点我</button>
<script>
var btn = document.querySelector('#btn');
console.log( btn.disabled );                  // true
console.log( btn.getAttribute('disabled') );  // "false"
</script>
对于上面的例子，HTML中只要出现了disabled 属性，不管值是什么，对于 DOM property结果都是true， 而对于 attribute 获取的则是把 HTML 里对应属性的值拿到转换成字符串。
input 标签的 checked 也有类似的特性。

场景4：
<a href="/" id="logo"></a>
<script>
var a = document.querySelector('logo')
console.log( a.getAttribute('href') )      // "/"
console.log( a.href )                      // "http://jirengu.com"
</script>
对于 a 链接的 href， 使用 a.getAttribute('href') 就是从 HTML 里获取对应属性的值转化成字符串，而 a.href 则获取有意义的真实地址。



场景5：
<input id="username" type="text" sex="male" age=28 value="饥人谷">
<script>
var userInput = document.querySelector('#username');
userInput.value = "若愚";
console.log( userInput.value );                  // "若愚"
console.log( userInput.getAttribute('value'));   // "饥人谷"
userInput.setAttribute('value', 'hunger'); 
console.log( userInput.value );                  // "若愚"
console.log( userInput.getAttribute('value'));   // "hunger"
console.log( document.body.innerHTML ) ;  // <input id="username" type="text" sex="male" age=28 value="hunger">
</script>
对于input 的 value， 改变 property 不会同步到 atttribute 上，改变 attribute也不会同步到 value上， attribute对应 HTML， property 对应 DOM。

那到底用哪一种呢？
如果你只是想获取非自定义的属性，比如 id、name、src、href 、checked... 用 property 的方式比较符合日常习惯，如果需要获取自定义属性那只能使用 getAttribute。当然具体用哪一种你只要了解二者的区别，大胆选用吧~