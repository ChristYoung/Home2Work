var $editConfirmBtn = $('#editConfirmBtn');
var serverUrl = $('#serverUrl').val();

var schoolEditFormValidator = new FormValidator('editSchoolForm', [
   {name:'schoolName',display:rblanguage.group.schoolname,rules:'required|no_space|min_length[2]'},
   {name:'adminName',display:rblanguage.group.adminname,rules:'required|no_space|min_length[8]|alpha_numeric'},
   {name:'adminPhone',display:rblanguage.admin.phone,rules:'required|valid_phone'},
   {name:'contactName',display:rblanguage.admin.contactname,rules:'required'},
   {name:'contactPhone',display:rblanguage.admin.contactphone,rules:'required|valid_phone'},
   {name:'role',display:rblanguage.alipay.role,rules:'required'}
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
	if(schoolEditFormValidator._validateForm()) {
		$.ajax({
			type: 'post',
			url: serverUrl + '/group/school/update.htm',
			async: true,
			data: $('#editSchoolForm').serialize(),
			dataType: 'json',
			success: function(data) {
                if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.bank.editmsg,callBack:function(){
                  	window.location.href =serverUrl + '/group/school/list.htm';
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
			}
		});
	}
});