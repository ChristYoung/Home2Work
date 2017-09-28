var $sortImg = $('.sort_img'),
     $orderByDesc = $('#orderByDesc'),
     $orderByName = $('#orderByName'),
     $queryForm = $('#queryForm');

$.datetimepicker.setLocale('zh');
$('#startDate').datetimepicker({ 
	timepicker: false, 
	format: 'Y/m/d', 
	scrollMonth: false,
	scrollInput: false,
	onShow: function(ct) { 
		this.setOptions({
			maxDate: $('#endDate').val() ? $('#endDate').val() : false
		});
	}
});

$('#endDate').datetimepicker({ 
	timepicker: false, 
	format: 'Y/m/d', 
	scrollMonth: false,
	scrollInput: false,
	onShow: function(ct) {
		var newDate = new Date();
		this.setOptions({ //建立日期选择范围，结束日期不能小于开始日期
			minDate: $('#startDate').val() ? $('#startDate').val() : false
		});
	}
});

//排序
$sortImg.on('click', function() {
	var orderByDesc = $(this).attr('data-order'),
	     orderByName = $(this).attr('data-name');
	switch (orderByDesc){
		case '1':
		    $orderByDesc.val('1');
			break;
		case '2':
		    $orderByDesc.val('2');
			break;
		default:
		    $orderByDesc.val('');
			break;
	};
	$orderByName.val(orderByName)
	$queryForm.submit();     
});