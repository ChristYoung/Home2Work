var $editConfirmBtn = $('#editConfirmBtn'),
     serverUrl = $('#serverUrl').val();

var bankEditFormValidator = new FormValidator('editBankForm', [
   {name:'name',display:rblanguage.admin.bankname,rules:'required|no_space|min_length[2]'},
   {name:'adminName',display:rblanguage.admin.account,rules:'required|no_space|min_length[8]'},
   {name:'adminPhone',display:rblanguage.admin.phone,rules:'required|valid_phone'},
   {name:'contactName',display:rblanguage.admin.contactname,rules:'required'},
   {name:'contactPhone',display:rblanguage.admin.contactphone,rules:'required|valid_phone'},
   {name:'httpUrl',display:rblanguage.admin.loginaddress,rules:'required|valid_url'}
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
	if(bankEditFormValidator._validateForm()) {
		$.ajax({
			type: 'POST',
			url: serverUrl + '/admin/bank/edit.htm',
			data: $('#editBankForm').serialize(),
			dataType: 'json',
			success: function(data) {
				if(data.success) {
					new autoMsg({type: 'success',msg: rblanguage.admin.savemsg,callBack: function() {
	                   window.location.href = serverUrl + '/admin/bank/list.htm';
                    }});
				} else {
					new autoMsg({type: 'error',msg: data.resultMsg});
				}
			},
			error: function() {
				new autoMsg({type: 'error',msg: rblanguage.admin.errormsg});
			}
		});
	}
});