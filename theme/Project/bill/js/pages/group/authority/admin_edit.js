var $editConfirmBtn = $('#editConfirmBtn');
var serverUrl = $('#serverUrl').val();

var editAdminFormValidator = new FormValidator('editGroupForm', [
   {name:'userName',display:rblanguage.bank.username,rules:'required'},
   {name:'roleId',display:rblanguage.alipay.role,rules:'required'},
   {name:'adminPhone',display:rblanguage.admin.phone,rules:'required|valid_phone'}
], false, function(errs, event) {
	if(errs.length > 0) {
		new autoMsg({
			type: 'error',
			msg: errs[0].message
		});
		$('#' + errs[0].id).focus();
	}
});

$editConfirmBtn.on('click', function() {
	if(editAdminFormValidator._validateForm()) {
		$.ajax({
			type: 'post',
			url: serverUrl + '/group/admin/update.htm',
			async: true,
			data: $('#editGroupForm').serialize(),
			dataType: 'json',
			success: function(data) {
				if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.bank.editmsg,callBack:function(){
                  	window.location.href = serverUrl + '/group/admin/list.htm';
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
			}
		});
	}
});