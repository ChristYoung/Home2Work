$.ajax.simulateHtml = {};
$.ajaxTransport('html',function(options,orginalOptions,jqXHR){
	if(options.type === 'GET'){
		var timer;
		return{
			send:function(headers,complete){
				var fileName = options.url.replace(/.*\/([^\/]+)$/,'$1');
				var simulate = $.ajax.simulateHtml[fileName] || $.ajax.simulateHtml['default'];
				timer = setTimeout(function(){
					complete(simulate.html?200:404,simulate.html?'success':'error',{html:simulate.html});
				},Math.random()*simulate.viriation+simulate.delay);
			},
			abort:function(){
				clearTimeout(timer);
			}
		}
	}
});