var $del_btn = $('.del_btn'),
	$detail_btn = $('.detail_btn'),
	$modalDialog = $('#modalDialog'),
	serverUrl = $('#serverUrl').val(),
	$modalConfirmBtn = $('#modalConfirmBtn');

$detail_btn.on('click', function() {
	authorityCheck.call(this,serverUrl + '/bank/role/check.json');
});

$del_btn.on('click', function() {
	var roleId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalConfirmBtn.off().on('click', function() {
		$.post(serverUrl + '/bank/role/delete.json', {
			roleId: roleId
		}, function(data) {
			if(data.success) {
               new autoMsg({type:'success',msg:rblanguage.bank.delmsg,callBack:function(){
               	 window.location.href = window.location.href;
               }});
			} else {
				 new autoMsg({type:'error',msg:data.resultMsg});
			}
		}, 'json')
	});
});