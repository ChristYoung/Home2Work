$('#continue-btn').click(function() {
	var validator = new FormValidator('questionaire0', [{
			name: 'age',
			display: '年龄',
			rules: 'required|callback_check_pwd'
		}
	], function(errors, event) {
		if(errors.length > 0) {
			alert(errors[0].message);
			$('#' + errors[0].id).focus();
		}
	});
	
	validator.registerCallback('check_pwd',function(value){
		if(value=='x'){
			return false;
		}
		return true;
	}).setMessage('check_pwd','不对')
});