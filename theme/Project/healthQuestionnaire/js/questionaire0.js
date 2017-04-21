$('#continue-btn').click(function() {
	var validator = new FormValidator('questionaire0', [{
			name: 'age',
			display: '年龄',
			rules: 'required'
		},
		{
			name: 'bmi',
			display: '体重指数',
			rules: 'required'
		},
		{
			name: 'systolic',
			display: '收缩压',
			rules: 'required|matches[bmi]'
		},
		{
			name: 'cholesterol',
			display: '胆固醇',
			rules: 'required'
		}
	], function(errors, event) {
		if(errors.length > 0) {
			alert(errors[0].message);
			$('#' + errors[0].id).focus();
		}
	});
	//alert(validator._validateForm());
	if(!validator._validateForm()){
		alert('表单填写不正确')
	}
});