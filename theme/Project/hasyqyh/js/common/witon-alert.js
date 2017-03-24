var witonAlert = function() {
	this.options = {
		type: 'success',
		msg: '',
		fade: true,
		fadeSpeed: 300,
		delay: 2000,
		callBack: null
	};
	this.dom = $('<div class="witonAlert"></div>');
};

witonAlert.prototype.init = function(opt) {
	var _this = this;
	this.options = $.extend({}, this.options, opt);
	if($('.witonAlert').length != 0) {
		return;
	}
	this.dom.addClass(this.options.type).html(this.options.msg).appendTo($('body').first());
	if(this.options.fade) {
		this.dom.fadeIn(this.options.fadeSpeed);
	} else {
		this.dom.show();
	};
	setTimeout(function() {
		_this.close();
	}, this.options.delay);
};

witonAlert.prototype.close = function() {
	if(this.options.fade) {
		var _this = this;
		this.dom.fadeOut(this.options.fadeSpeed, function() {
			_this.dom.remove();
			_this.dom = null;
			_this.options.callBack && _this.options.callBack();
		});
	} else {
		this.dom.remove();
		this.dom = null;
		this.options.callBack && this.options.callBack();
	}
};

window.witonAlert = witonAlert;