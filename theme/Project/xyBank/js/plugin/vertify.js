//表单验证方法,在jQuery对象下扩展一个validator方法
	$.fn.validator = function(options){
		var me = this;
		var rex = {
			nospace:/\s/g,
			phonenum:/^1[3,5,7,8]\d{9}$/,
			contactphone:/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
			email:/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
			special:/[`~!@#\$%\^\&\，\。\、\……\·\《\》\￥\=\|\：\“\”\；\‘\’\——\！\【\】\（\）\？\s\*\(\)\+<>\?:"\{\},\.\\\/;'\[\]]/g,
			mac:/[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/,
			fixline:/^\d{8,}$/,
			onlynum:/^\d+$/g,
			onlychin:/^[\u4e00-\u9fa5]+$/,
			nochin:/^[A-Za-z0-9]+$/,
			webaddress:/^(([hH][tT]{2}[pP][sS]?)|([fF][tT][pP]))\:\/\//,
			id:/^(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
			strongpassword:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        };
		var defaults = {
			errContainer:$('.errorTips'),
			errorTips:'',
			objEqual:null,
			required:false,
			requiredMsg:'',
			equalMsg:'',
			minLength:null,
			minMsg:'',
			maxVal:null,
			minVal:null,
			valMsg:'',
			testType:null
		};
		var opts = $.extend({},defaults,options);
		me.init = function(){
			return (me.tocheck(opts.testType) && me.required() && me.minlength(opts.minLength) && me.equal(opts.objEqual) && me.valCheck(opts.minVal,opts.maxVal));
		};
		me.tocheck = function(type){
			if(type){
				if(this.val() != ''){
    				if(type != 'sPecial' && type != 'noSpace'){
    					if(!rex[type].test(this.val())){
        					opts.errContainer.html(opts.errorTips);
        					me.focus();
        					return false;
        				}
    				}else{
    					if(rex[type].test(this.val())){
        					opts.errContainer.html(opts.errorTips);
        					me.focus();
        					return false;
        				}
    				};
    			};
			};
			opts.errContainer.html('');
			return true;
		};
		me.required = function(){
			if(opts.required && this.val() == ''){
				opts.errContainer.html(opts.requiredMsg);
				me.focus();
				return false;
			}
			opts.errContainer.html('');
			return true;
		};
		me.equal = function(obj){
			if(obj && this.val() != obj.val()){
				opts.errContainer.html(opts.equalMsg);
				me.focus();
				return false;
			}
			opts.errContainer.html('');
    		return true;
		};
		me.minlength = function(n){
			if(this.val() != ''){
				if(n && this.val().length<n){
					opts.errContainer.html(opts.minMsg);
					me.focus();
					return false;
				}
			}
			opts.errContainer.html('');
			return true;
		};
		me.valCheck = function(v1,v2){
			var v = this.val();
			if(v != ''){
				if(v1 && v2){
					if(v>v2 || v<v1){
						opts.errContainer.html(opts.valMsg);
						me.focus();
						return false;
					}
				}
			}
			opts.errContainer.html('');
			return true;
		};
		return me.init();
    };

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
		'delay': 2000,
		'callBack': function(){},
		'bgColor': {
			'success': '#00a65a',
			'error': '#dd4b39',
			'warning': '#f39c12'
		}
	};
	
	if(typeof(options) == 'object')
		for(var x in options)
			this.options[x] = options[x];
	
	this.obj = $('<div>');
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