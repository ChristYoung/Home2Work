var $confirmBtn = $('#confirmBtn'),
     roleName = '',
     roleId='',
     serverUrl = $('#serverUrl').val(),
     $checkBoxes = $('input[type=checkbox]');

var roleValidator = new FormValidator('roleForm',[
    {name:'roleName',display:rblanguage.bank.rolename,rules:'required'},
    {name:'resId',display:rblanguage.bank.menuallocation,rules:'required'}
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
	var resId = '';
	if(roleValidator._validateForm()) {
		$confirmBtn.attr('disabled',true);
		roleName = $('#roleName').val();
		roleId=$('#roleId').val();
		$checkBoxes.each(function(i, e) {
			if($(e).prop('checked')) {
				resId += $(e).val() + ',';
			}
		});
		$.post(serverUrl + '/bank/group/role/update.htm', {
			roleName: roleName,
			resId: resId,
			roleId:roleId
		}, function(data) {
			$confirmBtn.attr('disabled',false);
			if(data.success) {
				new autoMsg({type: 'success',msg: rblanguage.bank.editmsg,callBack:function(){
					window.location.href = serverUrl + '/bank/group/role/list.htm';
				}});
			} else {
				new autoMsg({type: 'error',msg: data.resultMsg});
			}
		}, 'json');
	}
});