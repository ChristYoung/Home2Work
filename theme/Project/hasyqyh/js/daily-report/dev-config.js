$(function(){
	var 
	    $portAddress = $('#port-address'),
	    $adjustBtn = $('.j-adjust-btn'),
	    $postBtn = $('.j-post-btn');
	var rexURL = /^(([hH][tT]{2}[pP][sS]?)|([fF][tT][pP]))\:\/\//;
	
	$adjustBtn.on('click',function(){ 
			$(this).hide();
			$postBtn.show();
			$portAddress.prop('readonly',false);
	});
	$postBtn.on('click',function(){
		if(!rexURL.test($portAddress.val())){
			new witonAlert().init({type:'error',msg:'请输入正确的接口地址!'});
			$portAddress.focus();
			return false;
		}
	});
});


