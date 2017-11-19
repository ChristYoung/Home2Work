//widget
//author:jie yang -- 2015.10.06

//定义widget抽象类
	function Widget(){
		this.boundingBox = null;       //组件的外层容器          
	}
	
	Widget.prototype = {
		on:function(type,handler){           //自定义事件绑定
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data){          //触发自定义事件
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0, len=handlers.length; i<len; i++ ){
					handlers[i](data);
				}
			}
		},
		renderUI:function(){},            //接口:添加DOM节点
		bindUI:function(){},              //接口:监听事件
		syncUI:function(){},              //接口:初始化组件属性
		destructor:function(){},          //接口:销毁前的处理函数
		render:function(container){       //方法:渲染组件
			this.renderUI();
			this.handlers={};             //置空所有之前的时间再进行UI渲染,避免绑定的事件太多造成内存泄露
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		destroy:function(){               //方法:销毁组件
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	};