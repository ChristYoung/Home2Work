var eventBind = {
	listeners:{},
	//绑定自定义事件
	addEvent:function(type,fn){
		if(typeof this.listeners[type] === 'undefined'){
			this.listeners[type] = [];
		};
		if(typeof fn === 'function'){
			this.listeners[type].push(fn);
		};
		return this;
	},
	//触发自定义事件
	//handList为一个包含事件处理信息的参数列表,其中type是必填的参数,因为要用来确认要触发的事件是什么,
	//如:{type:'close',message:'hello world'},相当于人为构造一个event对象,其包含对个属性
	fireEvent:function(handList){
		if(!handList.target){
			handList.target = this;
		}
		var handlers = this.listeners[handList.type];
		if(handlers instanceof Array){
			for(var i=0, len = handlers.length; i<len; i++){
				if(typeof handlers[i] === 'function'){
					handlers[i](handList);
				}
			}
		};
		return this;
	},
	//解绑(删除)自定义事件
	removeEvent:function(type,fn){
		var handlers = this.listeners[type];
		if(typeof type === 'string' && handlers instanceof Array){
			if(typeof fn === 'function'){
				for(var i=0, len = handlers.length; i<len; i++){
					if(handlers[i] === fn){
						this.listeners[type].splice(i,1);
						break;
					}
				}
			}else{
				//如果没传参数fn,或者参数fn不是函数类型,则清空所有type类型的事件
				delete this.listeners[type];
			}
		};
		return this;
	}
};
