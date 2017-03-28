oninput 是 HTML5 的标准事件，
对于检测 textarea, input:text, input:password 和 input:search 这几个元素通过用户界面发生的内容变化非常有用，
在内容修改后立即被触发，不像 onchange 事件需要失去焦点才触发。 oninput 事件兼容为ie9+, 
ie下可以onpropertychange事件不是本节内容.

bug:

IE9下不触发退格/删除/剪切输入事件（IE9 doesn't fire input event on backspace/del/cut）
当用户当前输入法状态是中文时，在未选择词组到输入框也会触发事件
解决

为元素添加 cut， keyup, 事件例：

_.on(el, 'input', this.listener)

// IE9 doesn't fire input event on backspace/del/cut
if (_.isIE9) {
    this.onCut = function() {
        _.nextTick(self.listener)
    }
    this.onDel = function(e) {
        if (e.keyCode === 46 || e.keyCode === 8) {
            self.listener()
        }
    }
    _.on(el, 'cut', this.onCut)
    _.on(el, 'keyup', this.onDel)
}
来自于vuejs

中文输入优化，我们想要的结果是只有词组进入了输入框才会触发事件
我们可以使用两个较新的事件来达到预期的效果：compositionstart和compositionend,也是ie9+的兼容最合适不过。

MDN:

compositionstart

当浏览器有非直接的文字输入时, compositionstart事件会以同步模式触发.
compositionend

当浏览器是直接的文字输入时, compositionend会以同步模式触发.
看了两个事件就明白，为元素添加这个两个事件，做一个开关，如下: html:

<input type="text" id="person" />
js:


var node = document.querySelector('#person');
var cpLock = false;
node.addEventListener('compositionstart', function(){
    cpLock = true;
})
node.addEventListener('compositionend', function(){
    cpLock = false;
})
node.addEventListener('input', function(){
    if(!cpLock)console.log(this.value);
});