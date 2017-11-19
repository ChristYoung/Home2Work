//JS命名空间
educationPay = {};

educationPay.desktop = {};

educationPay.desktop.public = {};

educationPay.desktop.public.zIndex = 10000;

//信息提示插件（自动关闭）
educationPay.desktop.autoMsg = function(options){
	if(educationPay.desktop.autoMsg.isOpen) return;
	
	educationPay.desktop.autoMsg.isOpen = true;
	
	this.options = {
		'type': 'success', //支持三种类型：success成功信息、error失败信息、warning警告信息
		'msg': '2秒后自动关闭此提示框',
		'fade': true,
		'fadeSpeed': 300,
		'delay': 800,
		'callBack': function(){},
		'bgColor': {
			'success': '#00a65a',
			'error': '#dd4b39',
			'warning': '#dd4b39'
			//'warning': '#f39c12'
		}
	};
	
	if(typeof(options) == 'object')
		for(var x in options)
			this.options[x] = options[x];
	
	this.obj = $('<div id="cib_Msg">');
	this.obj.css({
		'display': 'none',
		'position': 'fixed',
		'bottom': '0',
		'left': '0',
		'zIndex': ++ educationPay.desktop.public.zIndex,
		'boxSizing': 'border-box',
		'width': '100%',
		'height': '50px',
		'backgroundColor': this.options.bgColor[this.options.type],
		'boxShadow': '0 0 10px #666',
		'fontSize': '24px',
		'fontWeight': 'bold',
		'color': '#fff',
		'lineHeight': '50px',
		'textAlign': 'center'
	}).html(this.options.msg).appendTo($('body').first());
	
	if(this.options.fade)
		this.obj.fadeIn(this.options.fadeSpeed);
	else
		this.obj.show();
	
	var oThis = this;
	function close(){
		if(oThis.obj){
			function closeFun(){
				oThis.obj.remove();
				oThis.obj = null;
				educationPay.desktop.autoMsg.isOpen = false;
				oThis.options.callBack();
			}
			if(oThis.options.fade)
				oThis.obj.fadeOut(oThis.options.fadeSpeed, function(){closeFun();});
			else
				closeFun();
		}
	}
	
	setTimeout(function(){close();}, this.options.delay);
}
educationPay.desktop.autoMsg.isOpen = false;
autoMsg = educationPay.desktop.autoMsg;