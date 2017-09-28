var $modalDialog = $('#modalDialog'),
	$modalConfirmBtn = $('#modalConfirmBtn'),
	$bodyContent = $('#bodyContent'),
	$modalTitle = $('#modalTitle'),
	$reset_btn = $('.reset_btn'),
	$forbid_btn = $('.forbid_btn'),
	$enable_btn = $('.enable_btn'),
	$del_btn = $('.del_btn');

var serverUrl = $('#serverUrl').val();

$reset_btn.on('click', function() {
	var groupId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.admin.resetpassword);
	$bodyContent.html(rblanguage.bank.repasswordgtip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide'); 
		$.get(serverUrl + '/group/admin/resetPwd.ajax',{groupId:groupId},function(data) {
			if(data.success) {
                new autoMsg({type:'success',msg:rblanguage.admin.resetmsg,callBack:function(){
                  	window.location.href = window.location.href;
                }});
			} else {
              new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});

$forbid_btn.on('click', function() { 
	var groupId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.admin.disable);
	$bodyContent.html(rblanguage.bank.disableadmintip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide'); 
		$.get(serverUrl + '/group/admin/updateStatus.ajax',{groupId:groupId,status:'E'},function(data) {
			if(data.success) {
                new autoMsg({type:'success',msg:rblanguage.admin.disablemsg,callBack:function(){
                  	window.location.href = window.location.href;
                }});
			} else {
              new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});

$enable_btn.on('click', function() { 
	var groupId = $(this).attr('data-id');
	$.get(serverUrl + '/group/admin/updateStatus.ajax',{groupId:groupId,status:'D'},function(data) {
		if(data.success) {
            new autoMsg({type:'success',msg:rblanguage.admin.enablemsg,callBack:function(){
              	window.location.href = window.location.href;
            }});
		} else {
          new autoMsg({type:'error',msg:data.resultMsg});
		}
	},'json');
});

$del_btn.on('click', function() { 
	var id = $(this).attr('data-id');
	var me = $(this);
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.bank.del);
	$bodyContent.html(rblanguage.bank.deladmintip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide'); 
		$.post(serverUrl + '/group/admin/delete.ajax',{id:id},function(data) {
			if(data.success) {
				me.parents('tr').remove();
                new autoMsg({type:'success',msg:rblanguage.bank.delmsg,callBack:function() {
                  	window.location.href = window.location.href;
                }});
			} else {
              new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});