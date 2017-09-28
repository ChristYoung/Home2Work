var dateSelector;
var now = new Date();

var $confirmBtn = $('#confirmBtn');
var serverUrl = $('#serverUrl').val();

var signUpDateValidator = new FormValidator('signUpDateForm', [
   {name:'appointDate',display:rblanguage.alipay.signdate,rules:'required'},
], false, function(errs, event) {
	if(errs.length > 0) {
		alert(errs[0].message);
	}
});

dateSelector = mobiscroll.date('#appointDate', {
	lang: 'zh',
	display: 'bottom',
	dateWheels: 'yy m d',
	max: now
});

$confirmBtn.on('click', function() {
	if(signUpDateValidator._validateForm()) {
		$.ajax({
			type: '',
			url: '',
			async:true,
			success: function(data) {
				debug_config._listeners(data);
			}
		});
	}
});