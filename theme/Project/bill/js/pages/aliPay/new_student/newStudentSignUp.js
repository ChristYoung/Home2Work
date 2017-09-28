var dateSelector;
var now = new Date();

var $confirmBtn = $('#confirmBtn');
var serverUrl = $('#serverUrl').val();

var newStudentSignUpValidator = new FormValidator('newStudentSignUpForm', [
   {name:'name',display:rblanguage.alipay.name,rules:'required|callback_chinAndEng'},
   {name:'phone',display:rblanguage.alipay.cantact,rules:'required|valid_phone'},
   {name:'idcardNum',display:rblanguage.alipay.id,rules:'callback_idCode'},
   {name:'email',display:'email',rules:'valid_email'}
], false, function(errs, event) {
	if(errs.length > 0) {
		alert(errs[0].message);
	}
});

//错误提示文案定制
newStudentSignUpValidator.setMessage('valid_phone',rblanguage.alipay.valid+'%s');
newStudentSignUpValidator.setMessage('valid_email',rblanguage.alipay.valid+'%s');

newStudentSignUpValidator.registerCallback('chinAndEng', function(value) { //只允许输入中文和英文
	var chinAndEngRex = /^[\u0391-\uFFE5A-Za-z]+$/;
	return chinAndEngRex.test(value);
}).setMessage('chinAndEng', rblanguage.alipay.namemsg);

newStudentSignUpValidator.registerCallback('idcardNum', function(value) { //身份证号的简单正则验证
	var idRex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return idRex.test(value);
}).setMessage('idcardNum', rblanguage.alipay.idmsg);

dateSelector = mobiscroll.date('#birthday', {
	lang: 'zh',
	display: 'bottom',
	dateWheels: 'yy m',
	min: new Date('1910'),
	max: new Date('2050'),
	onSet: function (event, inst) { 
      var valueText = event.valueText,
           indexOf = valueText.lastIndexOf('/');
           valueText = valueText.substring(0,indexOf);
           $('#birthday').val(valueText);
    }
});

$confirmBtn.on('click', function(){
	if(newStudentSignUpValidator._validateForm()) {
		$.ajax({
			type: 'post',
			url: serverUrl + '/mobileWeb/newStudent/saveNewStudent.ajax',
			data: $('#newStudentSignUpForm').serialize(),
			async:true,
			dataType:'json',
			success: function(data) {
				if(data.success) {
	                  	window.location.href = serverUrl + '/mobileWeb/newStudent/queryPayItem.htm';
				} else {
					alert(data.resultMsg);
				}
			}
		});
	}
});