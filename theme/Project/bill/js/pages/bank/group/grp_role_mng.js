var $modalDialog = $('#modalDialog'),
	$modalConfirmBtn = $('#modalConfirmBtn'),
	$detail_btn = $('.detail_btn'),
	$del_btn = $('.del_btn');

var serverUrl = $('#serverUrl').val();

$detail_btn.on('click', function() {
	authorityCheck.call(this,serverUrl + '/bank/group/role/check.htm');
});

$del_btn.on('click', function() {
	var roleId = $(this).attr('data-id');
	var me = $(this);
	$modalDialog.modal('show');
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.post(serverUrl + '/bank/group/role/delete.ajax', {
			roleId:roleId
		}, function(data) {
			if(data.success) {
				me.parents('tr').remove();
				new autoMsg({type: 'success',msg: rblanguage.bank.delmsg,callBack:function(){
					window.location.href = window.location.href;
				}});
			} else {
				new autoMsg({type: 'error',msg: data.resultMsg});
			}
		}, 'json');
	});
});