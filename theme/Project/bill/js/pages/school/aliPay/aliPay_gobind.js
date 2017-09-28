var $bindConfirmBtn = $('#bindConfirmBtn');
var $aliPayForm = $('#aliPayForm');

var serverUrl = $('#serverUrl').val();

var aliPayValidator = new FormValidator('aliPayForm', [
    {name:'name',display:rblanguage.school.lifename,rules:'required'},
    {name:'appId',display:'AppID',rules:'required'},
    {name:'key',display:rblanguage.group.privatekey,rules:'required'}
], false, function(errs, event) {
	if(errs.length > 0) {
		new autoMsg({
			type: 'error',
			msg: errs[0].message
		});
		$('#' + errs[0].id).focus();
	}
});

$bindConfirmBtn.on('click', function() {
	var _data = {};
	if(aliPayValidator._validateForm()) {
		$aliPayForm.serializeArray().map(function(x) { 
			_data[x.name] = x.value;
		});
		_data.formId = $('#formId').val(); //formid默认是0
		$.post(serverUrl + '/school/config/auth/ali/edit.htm', _data, function(data) {
			if(data.success) {
              new autoMsg({type:'success', msg:rblanguage.admin.configmsg, callBack:function(){
              	window.location.href = serverUrl + '/school/config/auth/ali/show.htm';
              }});
			} else {
              new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	}
});