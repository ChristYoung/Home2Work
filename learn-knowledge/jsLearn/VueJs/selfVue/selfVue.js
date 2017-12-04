 /*
  * vue使用的是es5的Object.defineProperty();
  * */
 function Vue(option) {
 	this.$option = option;
 	var $option = this.$option;
 	var dom = document.querySelector($option.el);
 	observe(dom, $option.data);
 }

 function observe(dom, obj) {
 	for(property in obj) {
 		watcher(dom, property);
 	}
 }

 function watcher(dom, vModel) {
 	var model = dom.querySelectorAll('[v-model=' + '"' + vModel + '"' + ']')[0];
 	var obj = new Object();
 	Object.defineProperty(obj, vModel, {
 		set: function(newVal) {
 			compile(dom, newVal, vModel);
 		},
 		get: function() {
 			console.log("get");
 		}
 	});
 	model.addEventListener('input', function() {
 		obj[vModel] = this.value;
 	})
 }

 function compile(dom, value, vModel) {
 	var modelList = dom.querySelectorAll('[v-text=' + '"' + vModel + '"' + ']');
 	modelList.forEach(function(item) {
 		item.innerHTML = value;
 	});
 }
 var vm = new Vue({
 	el: '#app',
 	data: {
 		name: "jieYoung",
 		email: "jie.yang@witontek.com"
 	}
 });