//适配背景图
function resizeImg(){
  var w = $(window).width(),
      h = $(window).height();
    if(w>=1349){
    	//$('.authcenter').height(h);
    	$('.authcenter-background').height(h);
		$('#bgImg').width(w);
		$('#bgImg').height(w/1.6);
    }else{
    	//$('.authcenter').height(643);
    	$('.authcenter-background').height(643);
		$('#bgImg').width(1349);
		$('#bgImg').height(1349/1.6);
    }
};
$(window).resize(function(){
	 resizeImg();
});
$(document).ready(function(){
	resizeImg();
});