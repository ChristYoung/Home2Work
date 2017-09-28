var $confirmBtn = $('#confirmBtn'),
     roleName = '',
     serverUrl = $('#serverUrl').val(),
     $checkBoxes = $('input[type=checkbox]');

var roleValidator = new FormValidator('addSchoolRoleForm',[
    {name:'roleName',display:rblanguage.bank.rolename,rules:'required'},
    {name:'resId',display:rblanguage.bank.roleconfig,rules:'required'}
], false, function(errs, event) {
	if(errs.length > 0) {
		new autoMsg({
			type: 'error',
			msg: errs[0].message
		});
		$('#' + errs[0].id).focus();
	}
});

$confirmBtn.on('click', function() {
	var  resId = '';
	if(roleValidator._validateForm()) {
		$confirmBtn.attr('disabled',true);
		roleName = $('#roleName').val();
		$checkBoxes.each(function(i, e) {
			if($(e).prop('checked')) {
				resId += $(e).val() + ',';
			}
		});
		$.post(serverUrl + '/group/school/role/add.htm', {
			roleName: roleName,
			resId: resId
		}, function(data) {
			$confirmBtn.attr('disabled',false);
			if(data.success) {
				new autoMsg({type: 'success',msg: rblanguage.admin.successmsg,callBack:function(){
					window.location.href = serverUrl + '/group/school/role/list.htm';
				}});
			} else {
				new autoMsg({type: 'error',msg: data.resultMsg});
			}
		}, 'json');
	}
});