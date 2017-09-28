var $addConfirmBtn = $('#addConfirmBtn');

var serverUrl = $('#serverUrl').val();

var groupAddFormValidator = new FormValidator('addGroupForm', [
   {name:'groupName',display:rblanguage.alipay.groupname,rules:'required|no_space'},
   {name:'adminAccount',display:rblanguage.alipay.adminaccount,rules:'required|no_space|min_length[8]'},
   {name:'adminPhone',display:rblanguage.admin.phone,rules:'required|valid_phone'},
   {name:'contactName',display:rblanguage.admin.contactname,rules:'required'},
   {name:'contactPhone',display:rblanguage.admin.contactphone,rules:'required|valid_phone'},
   {name:'roleId',display:rblanguage.alipay.role,rules:'required'},
   {name:'provinceId',display:rblanguage.admin.province,rules:'required'},
   {name:'cityId',display:rblanguage.admin.city,rules:'required'},
   {name:'email',display:rblanguage.admin.email,rules:'valid_email'}
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
	if(groupAddFormValidator._validateForm()) {
		$.ajax({
			type:'post',
			url:serverUrl + '/bank/group/add.htm',
			data: $('#addGroupForm').serialize(),
			dataType:'json',
			async:true,
			success: function(data) {
				if(data.success) {
	                new autoMsg({type:'success',msg:rblanguage.admin.successmsg,callBack:function(){
	                  	window.location.href = serverUrl + '/bank/group/list.htm';
	                }});
				} else {
	              new autoMsg({type:'error',msg:data.resultMsg});
				}
			}
		});
	}
});