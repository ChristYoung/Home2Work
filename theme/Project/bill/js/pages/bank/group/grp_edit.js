var $editConfirmBtn = $('#editConfirmBtn');

var serverUrl = $('#serverUrl').val();

var groupEditFormValidator = new FormValidator('editGroupForm', [
   {name:'groupName',display:rblanguage.alipay.groupname,rules:'required|no_space'},
   {name:'adminAccount',display:rblanguage.alipay.adminaccount,rules:'required|no_space|min_length[8]'},
   {name:'adminPhone',display:rblanguage.admin.phone,rules:'required|valid_phone'},
   {name:'contactName',display:rblanguage.admin.contactname,rules:'required'},
   {name:'contactPhone',display:rblanguage.admin.contactphone,rules:'required|valid_phone'},
   {name:'roleId',display:rblanguage.alipay.role,rules:'required'}
], false, function(errs, event) {
	if(errs.length > 0) {
		new autoMsg({
			type: 'error',
			msg: errs[0].message
		});
		$('#'+errs[0].id).focus();
	}
});

$editConfirmBtn.on('click',function(){
	if(groupEditFormValidator._validateForm()){
		$.ajax({
			type:'post',
			url:serverUrl + '/bank/group/edit.htm',
			data: $('#editGroupForm').serialize(),
			dataType:'json',
			async:true,
			success: function(data) {
				if(data.success) {
	                new autoMsg({type:'success',msg:rblanguage.bank.editmsg,callBack:function(){
	                  	window.location.href = serverUrl + '/bank/group/list.htm';
	                }});
				} else {
	              new autoMsg({type:'error',msg:data.resultMsg});
				}
			}
		});
	}
});


