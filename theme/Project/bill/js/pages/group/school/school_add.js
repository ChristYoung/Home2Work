var $addConfirmBtn = $('#addConfirmBtn');
var serverUrl = $('#serverUrl').val();

var schoolAddFormValidator = new FormValidator('addSchoolForm', [
   {name:'schoolName',display:rblanguage.group.schoolname,rules:'required|no_space|min_length[2]'},
   {name:'adminName',display:rblanguage.group.adminname,rules:'required|no_space|min_length[8]|alpha_numeric'},
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
	if(schoolAddFormValidator._validateForm()) {
		$.ajax({
			type: 'post',
			url: serverUrl + '/group/school/add.htm',
			async: true,
			data: $('#addSchoolForm').serialize(),
			dataType: 'json',
			success: function(data) {
                if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.admin.successmsg,callBack:function(){
                  	window.location.href =serverUrl + '/group/school/list.htm';
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
			}
		});
	}
});