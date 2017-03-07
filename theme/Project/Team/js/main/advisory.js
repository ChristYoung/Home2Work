//read more
$('.read_more_href').click(function(){
	var $item = $(this).parent().siblings('.item'),
	     $item_p = $item.find('p');
	     if($item_p.hasClass('txt_overflow')){
	     	$item_p.removeClass('txt_overflow');
	     	$item.css('height','auto');
	     	$(this).html('LESS');
	     }else{
	     	if($item_p.height()>375){
	     		$item_p.addClass('txt_overflow');
	     	    $item.css('height','375px');
	     	    $(this).html('READ MORE >');
	     	}
	     }
});