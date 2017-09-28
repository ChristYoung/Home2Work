var dateSelector;
var now = new Date();

var $confirmBtn = $('#confirmBtn');
var serverUrl = $('#serverUrl').val();

var signUpInfoValidator = new FormValidator('signUpInfoForm', [
   {name:'name',display:rblanguage.alipay.name,rules:'required|callback_chinAndEng'},
   {name:'idCode',display:rblanguage.alipay.id,rules:'required|callback_idCode'},
   {name:'phone',display:rblanguage.alipay.cantact,rules:'required|valid_phone'},
   {name:'residence',display:rblanguage.alipay.residence,rules:'required'},
   {name:'address',display:rblanguage.alipay.address,rules:'required'}
], false, function(errs, event) {
	if(errs.length > 0) {
		alert(errs[0].message);
	}
});

signUpInfoValidator.registerCallback('chinAndEng', function(value) { //只允许输入中文和英文
	var chinAndEngRex = /^[\u0391-\uFFE5A-Za-z]+$/;
	return chinAndEngRex.test(value);
}).setMessage('chinAndEng', rblanguage.alipay.namemsg);

signUpInfoValidator.registerCallback('idCode', function(value) { //身份证号的简单正则验证
	var idRex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return idRex.test(value);
}).setMessage('idCode', rblanguage.alipay.idmsg);

dateSelector = mobiscroll.date('#date', {
	lang: 'zh',
	display: 'bottom',
	dateWheels: 'yy m d',
	max: now
});

$confirmBtn.on('click', function() {
	if(signUpInfoValidator._validateForm()) {
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