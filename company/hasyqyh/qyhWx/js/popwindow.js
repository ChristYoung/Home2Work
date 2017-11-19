var popWindow = {
	_mask:$('<div id="qyh_mask"></div>'), //遮罩层的dom
	_popMain:null, //选项框的dom
	liDom:'',
	options:{_list:[],title:'',relateDom:null,callBack:null},  //配置参数,_list表示具体的选择项,relateDom表示进行数据绑定的相关dom,callBack表示点击具体的选项时的回调函数
	init:function(opts){ //初始化方法
		this.options = $.extend({},this.options,opts);
		this.addMask();
		this.addList();
		this.bindEvent();
	},
	addMask:function(){ //添加遮罩层
		this._mask.appendTo('body');
	},
	addList:function(){ //添加选项到popwindow_list的dom中
		var That = this;
		if(this.options._list.length != 0){
			this.options._list.forEach(function(i,e){
				That.liDom += '<li class="p_li">'+i+'</li>';
			});
		};
		this._popMain = $('<div id="popwindow_wrap"><div class="pop_header">'+this.options.title+'</div><ul class="popwindow_list">'+this.liDom+'</ul><div class="pop_footer">取消</div></div>');
		this._popMain.appendTo('body');
	},
	bindEvent:function(){ //绑定事件
		var That = this;
		That._popMain.on('click','.p_li',function(){
			var This = $(this),
			    This_text = This.text();
			That.options.callBack.call(This,This_text);
			That.destroy();
		});
		That._popMain.on('click','.pop_footer',function(){
			That.destroy();
		});
	},
	destroy:function(){ //销毁组件
		this._mask.remove();
		this._popMain.remove();
	}
};
