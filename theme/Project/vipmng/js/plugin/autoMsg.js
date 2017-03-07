(function($){
	 $.noty = function(options){
		 $.noty.defaultOptions = {
		 	text:'',
		 	timeControl:true,
		 	timeOut:2000,
		 	callBack:null,
		 	type:'success',
		 	fadeSpeed:300,
		 	bgColor:{
		 		'success':'#00CC00',
		 		'error':'#F2DEDE',
		 		'warn':'#FCF8E3'
		 	}
		};
		$.noty.settings = $.extend({},$.noty.defaultOptions,options);
		$.noty.showTip = function(){
			var $divLen = $('body').find('.noty').length;
			if($divLen == 0){ //禁止弹出多个noty
				var $div = $('<div class="noty" style="display:none;"></div>');
				$div.html($.noty.settings.text);
				$('body').append($div);
				$div.css({
					'bottom':'0',
					'left':'0',
					'position':'fixed',
					'width': '100%',
			        'height': '50px',
			        'color': '#8A6D3B',
					'lineHeight': '50px',
					'textAlign': 'center',
					'boxShadow': '0 0 10px #666',
			        'fontSize': '20px',
					'background':$.noty.settings.bgColor[$.noty.settings.type]
				});
				$div.fadeIn($.noty.settings.fadeSpeed);
				if($.noty.settings.timeControl){
					if(iTimer){
						clearTimeout(iTimer);
					};
					var iTimer = setTimeout(function(){
						$div.slideUp($.noty.settings.fadeSpeed,function(){
							clearTimeout(iTimer);
							$div.remove();
							$.noty.settings.callBack && $.noty.settings.callBack();
						});
					},$.noty.settings.timeOut);
				}
		   }
		}
		$.noty.showTip();
	}
})(jQuery);

function noty(options) {
	return jQuery.noty(options); // return as a jQuery object
}