var $modalDialog = $('#modalDialog'),
	$modalConfirmBtn = $('#modalConfirmBtn'),
	$detail_btn = $('.detail_btn'),
	$del_btn = $('.del_btn');

var serverUrl = $('#serverUrl').val();

$detail_btn.on('click', function() {
	authorityCheck.call(this,serverUrl + '/group/school/role/check.json');
});

$del_btn.on('click', function() {
	var roleId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.post(serverUrl + '/group/school/role/delete.ajax', {roleId:roleId}, function(data) {
			 if(data.success) {
              new autoMsg({type:'success',msg:rblanguage.bank.delmsg,callBack:function() {
              	window.location.href = window.location.href;
              }});
			} else {
               new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});

