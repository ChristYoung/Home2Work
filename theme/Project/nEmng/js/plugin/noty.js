(function($){
	 $.noty = function(options){
		 $.noty.defaultOptions = {
		 	oParent:'body',
		 	layOut:'top',
		 	text:'',
		 	timeControl:true,
		 	timeOut:2000,
		 	type:'success'
		};
		$.noty.settings = $.extend({},$.noty.defaultOptions,options);
		$.noty.showTip = function(){
			var $div = $('<div class="noty" style="display:none;"></div>');
			$div.html($.noty.settings.text);
			$($.noty.settings.oParent).append($div);
            switch($.noty.settings.layOut){
            	case 'bottom':
            	    $div.css('bottom',0);
				    $div.slideToggle(500);
				    break;
				case 'top':
				    $div.css('top',0);
				    $div.slideToggle(500);
				    break;
            }
			
			if($.noty.settings.type == 'success'){
				$div.css('background','#25A4A0');
			}else if($.noty.settings.type == 'error'){
				$div.css('background','red');
			}
			
			if($.noty.settings.timeControl){
				var iTimer = setTimeout(function(){
					$div.slideUp(500,function(){
						clearInterval(iTimer);
					});
				},$.noty.settings.timeOut)
			}
		}
		$.noty.showTip();
	}
})(jQuery);

function noty(options) {
	return jQuery.noty(options); // return as a jQuery object
}
