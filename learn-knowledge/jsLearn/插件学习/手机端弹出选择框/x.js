function windowSelect(options){
	this.maindom = $('<div class="window_select" id="institudeList"><div class="listItem"></div><a class="select_cancel">取消</a></div>');
	this.mask = $('<div id="window-mask"></div>');
	this.listItem = '';
	this._default = {
		tag:null,
		callBack:function(){
            alert('1');
		}
	};
	this.opt = $.extend({},this._default,options);
};
windowSelect.prototype = {
	constructor:windowSelect,
	init:function(){ //初始化
		this.render();
	},
	render:function(){ //渲染
		this.bindUI();
		this.mask.appendTo(document.body);
		this.maindom.appendTo(document.body);
	},
	destroy:function(){ //销毁组件
		this.mask.remove();
		this.maindom.remove();
	},
	bindUI:function(){ //绑定UI,及相关事件
		var self = this;
		self.listItem+='<a data-id="0">牛逼</a><a data-id="1">哈哈哈</a>';
        self.maindom.find('.listItem').append($(self.listItem));
		self.maindom.on('click','.listItem a',function(){
			if($(this).html() != self.opt.tag.val()){
				self.destroy();
        		self.opt.tag.val($(this).html());
	        	self.opt.tag.trigger('valueChange');
            }
		});
		self.opt.tag.off('valueChange').on('valueChange',this.opt.callBack);
		self.maindom.on('click','.select_cancel',function(){
			self.destroy();
		});
	}
};
