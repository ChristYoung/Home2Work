//常见方法
(function($){
	//全选
	$.fn.checkAll = function(options){
		var me = this;
		var Len = options.length;
		this.click(function(){
			options.prop('checked',$(this).prop('checked'));
		});
		options.click(function(){
			me.prop('checked',options.filter(':checked').length == Len?true:false);
		});
		return this;
	};
	
	//过长字符删减
	$.fn.cutlongStr = function(n){
		var str = this.html();
		if(str.length>n){
			this.html(str.substring(0,n)+'...');
			this.attr('title',str);
		}
		return this;      //返回jQuery对象,便于链式调用
	};
	$('.textoveflow').each(function(i,e){
		$(this).attr('title',$(this).html());
	});
	
	//水印
	$.fn.waterMark = function(){
		var me = this;
		me.focus(function(){
			me.prev().hide();
		});
		me.prev().click(function(){
			$(this).hide();
			me.focus();
		});
		me.blur(function(){
			if(me.val() == ''){
				me.prev().show();
			}else{
				me.prev().hide();
			}
		});
	};
	$('.waterMark').each(function(i,e){
		$(e).waterMark();
	});
})(jQuery);