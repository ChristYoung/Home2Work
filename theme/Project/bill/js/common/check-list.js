//绑定checkbox点击事件（一级菜单）
$('#authority_list .authority_items dt .input_checkbox input[type="checkbox"]').on('click', function() {
	if($(this).prop('checked')) {
		$(this).parents('.authority_items').find('.input_checkbox input[type="checkbox"]').not(':disabled').prop('checked', true);
	} else {
		$(this).parents('.authority_items').find('.input_checkbox input[type="checkbox"]').not(':disabled').prop('checked', false);
	}
});

//绑定checkbox点击事件（二级菜单）#（点击没有三级菜单的执行此函数）
$('#authority_list .authority_items dd .input_checkbox input[type="checkbox"]').on('click', function() {
	if($(this).parents('.authority_items').find('dd .input_checkbox input[type="checkbox"]:checked').length == 0) {
		$(this).parents('.authority_items').find('dt .input_checkbox input[type="checkbox"]').not(':disabled').prop('checked', false);
	} else {
		$(this).parents('.authority_items').find('dt .input_checkbox input[type="checkbox"]').not(':disabled').prop('checked', true);
	}
});

//二级菜单#和下一个三级关联的(只有点击有三级菜单的才执行此函数)
$("#authority_items_js .authority_items_div label").on('click', function() {
	if($(this).find('input').prop('checked')) {
		$(this).parents('.authority_items').find('dt input').not(':disabled').prop('checked', true);
		$(this).parent().next('span').find('input').not(':disabled').prop('checked', true);
	} else if($(this).parent().siblings('.authority_items_div').find('input:checked').length == 0) {
		$(this).parents('.authority_items').find('dt input').not(':disabled').prop('checked', false);
		$(this).parent().next('span').find('input').not(':disabled').prop('checked', false);
	} else {
		$(this).parent().next('span').find('input').not(':disabled').prop('checked', false);
	}
})
//三级菜单#
$("#authority_items_js .authority_items_span label").on('click', function() {
	if($(this).find('input').prop('checked')) {
		$(this).parents('.authority_items').find('dt input').not(':disabled').prop('checked', true);
		$(this).parent().prev('div').find('input').not(':disabled').prop('checked', true);
	} else if($(this).siblings('label').find('input:checked').length == 0) {
		$(this).parent().prev('div').find('input').not(':disabled').prop('checked', false);
		if($(this).parent().prev().siblings('.authority_items_div').find('input:checked').length == 0) {
			$(this).parents('.authority_items').find('dt input').not(':disabled').prop('checked', false);
		}
	}
})