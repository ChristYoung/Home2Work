var serverUrl = $('#serverUrl').val(),
	$saveBtn = $('#saveBtn'),
	$checkBoxes = $('input[type=checkbox]');


$saveBtn.on('click', function() {
	var ids = '';
	$saveBtn.attr('disabled',true);
	$checkBoxes.each(function(i, e) {
		if($(e).prop('checked')) {
			ids += $(e).val() + ',';
		}
	});
	var bankId=$('#bankId').val();

	$.post(serverUrl + '/admin/bank/res.htm', {
		bankId:bankId,
		ids: ids
	}, function(data) {
		$saveBtn.attr('disabled',false);
		if(data.success) {
			new autoMsg({type: 'success',msg: rblanguage.admin.configmsg,callBack:function(){
				window.location.href = serverUrl + '/admin/bank/list.htm';
			}});
		} else {
			new autoMsg({type: 'error',msg: data.resultMsg});
		}
	}, 'json')

});