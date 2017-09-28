var $addConfirmBtn = $('#addConfirmBtn');
var serverUrl = $('#serverUrl').val();

var addAdminFormValidator = new FormValidator('addAdminForm', [
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

$addConfirmBtn.on('click', function() {
	if(addAdminFormValidator._validateForm()) {
		$.ajax({
			type: 'post',
			url: serverUrl + '/school/admin/add.htm',
			async: true,
			data: $('#addAdminForm').serialize(),
			dataType: 'json',
			success: function(data) {
				if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.admin.successmsg,callBack:function(){
                  	window.location.href =serverUrl + '/school/admin/list.htm';
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
			}
		});
	}
});

