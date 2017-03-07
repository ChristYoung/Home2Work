(function($){
	function Maxlength(){
		this._defaults = {
			max:200,
			truntcate:true, //如果超出范围是否允许继续输入,false则只是高亮提示,不允许继续输入
			feedbackTarget:null, //展示反馈信息的元素
			onFull:null, //超出字符限制时的回调
			errorTips:'您已经超出%个字,最多只能输入',
			markclass:'overclass'
		};
	};
	$.extend(Maxlength.prototype,{
		setDefaults:function(options){
			return $.extend(this._defaults,options||{});
		},
		_init:function(target,options){
			target = $(target);
			var opt = this.setDefaults(options),
			    me = this;
			if(target.hasClass(opt.markclass)){//只初始化一次
				return;
			};
			this._defaults.errorTips+=opt.max+'个字';
			if(opt.feedbackTarget){
				opt.feedbackTarget.hide();
			};
			target.addClass(opt.markclass).on('change keyup',function(ev){ //绑定change事件和keyup事件
				me._checkLength(target);
			});
		},
		_checkLength:function(target){
			var len = target.val().length,
			    v = target.val(),
			    opt = this._defaults;
			if(len>opt.max && opt.truntcate){
				var overwords = (len - opt.max).toString(),
				    errors = opt.errorTips,
				    rex = /%/g,
				    errors = errors.replace(rex,'<em>'+overwords+'</em>');
				opt.feedbackTarget.show().html(errors);
			}else{
				target.val(v.substring(0,opt.max));
				opt.feedbackTarget.hide().html('');
			};
			if(len>opt.max && $.isFunction(opt.onFull)){
				opt.onFull.apply(target,arguments);
			};
		}
	});
	var plugin = $.maxlength = new Maxlength();
	$.fn.maxlength = function(options){
		return this.each(function(){
			plugin._init(this,options);
		});
	};
})(jQuery);
