var $modalDialog = $('#modalDialog'),
	$modalConfirmBtn = $('#modalConfirmBtn'),
	$bodyContent = $('#bodyContent'),
	$modalTitle = $('#modalTitle'),
	$reset_btn = $('.reset_btn'),
	$reset_assign_btn = $('.reset_assign_btn'),
	$enable_btn = $('.enable_btn'),
	$forbid_btn = $('.forbid_btn');

var serverUrl = $('#serverUrl').val();

$reset_btn.on('click', function() { 
	var schoolId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.admin.resetpassword);
	$bodyContent.html(rblanguage.group.repasswordtip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.get(serverUrl + '/group/school/resetPwd.ajax', {schoolId:schoolId}, function(data) {
			if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.group.repasswordmsg,callBack:function(){
                  	window.location.href = window.location.href;
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
		},'json');
	});
});

$reset_assign_btn.on('click', function() {
	var schoolId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.group.resetkey);
	$bodyContent.html(rblanguage.group.resetkeytip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.get(serverUrl + '/group/school/resetGrantPwd.ajax', {schoolId:schoolId}, function(data) {
			if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.group.resetmsg,callBack:function(){
                  	window.location.href = window.location.href;
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
		},'json');
	});
});

$forbid_btn.on('click', function() {
	var schoolId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.admin.disable);
	$bodyContent.html(rblanguage.group.disableschooltip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.get(serverUrl + '/group/school/updateStatus.ajax', {schoolId:schoolId, status:'E'}, function(data){
			if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.admin.disablemsg,callBack:function() {
                  	window.location.href = window.location.href;
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
		},'json');
	});
});

$enable_btn.on('click', function() {
	var schoolId = $(this).attr('data-id');
	$.get(serverUrl + '/group/school/updateStatus.ajax', {schoolId:schoolId, status:'D'}, function(data) {
		if(data.success) {
              new autoMsg({type:'success',msg:rblanguage.admin.enablemsg,callBack:function(){
              	window.location.href = window.location.href;
              }});
			} else {
              new autoMsg({type:'error',msg:data.resultMsg});
			}
	},'json');
});