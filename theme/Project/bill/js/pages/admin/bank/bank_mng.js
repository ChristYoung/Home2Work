var $modalDialog = $('#modalDialog'),
	$modalConfirmBtn = $('#modalConfirmBtn'),
	$bodyContent = $('#bodyContent'),
	$modalTitle = $('#modalTitle'),
	$reset_btn = $('.reset_btn'),
	$enable_btn = $('.enable_btn'),
	$forbid_btn = $('.forbid_btn');
    $export_btn = $('#exportBtn');

var serverUrl = $('#serverUrl').val();

$reset_btn.on('click', function() { //重置密码弹出
	var bankId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.admin.resetpassword);
	$bodyContent.html(rblanguage.admin.repasstip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.get(serverUrl + '/admin/bank/resetPwd.ajax', {bankId: bankId}, function(data) {
          if(data.success) {
          	new autoMsg({type:'success',msg:rblanguage.admin.resetmsg,callBack:function() {
          		window.location.href = window.location.href;
          	}});
          } else {
          	new autoMsg({type:'error',msg:data.resultMsg});
          }
		}, 'json');
	});
});

$forbid_btn.on('click', function() {
	var bankId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.admin.disable);
	$bodyContent.html(rblanguage.admin.bankdistip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.get(serverUrl + '/admin/bank/updateStatus.ajax', {bankId: bankId,status: 'E'}, function(data) {
          if(data.success) {
          	new autoMsg({type:'success',msg:rblanguage.admin.disablemsg,callBack:function() {
          		window.location.href = window.location.href;
          	}});
          } else {
          	new autoMsg({type:'error',msg:data.resultMsg});
          }
		}, 'json');
	});
});

$enable_btn.on('click', function() {
	var bankId = $(this).attr('data-id');
	$.get(serverUrl + '/admin/bank/updateStatus.ajax', {bankId: bankId,status: 'D'}, function(data) {
          if(data.success) {
          	new autoMsg({type:'success',msg:rblanguage.admin.enablemsg,callBack:function() {
          		window.location.href = window.location.href;
          	}});
          } else {
          	new autoMsg({type:'error',msg:data.resultMsg});
          }
	}, 'json');
});