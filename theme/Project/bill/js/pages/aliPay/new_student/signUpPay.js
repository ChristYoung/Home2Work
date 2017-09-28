var $selfPayBtn = $('#selfPay'),
     $amount = $('#amount'),
     $orderRemark = $('#orderRemark');

var serverUrl = $('#serverUrl').val();
var payValidator = new FormValidator('selfPayForm', [
    {name:'amount',display:'报名金额',rules:'required|callback_twoNum'},
    {name:'orderRemark', display: '备注', rules:'required'}
],false, function(errs) {
	if(errs.length > 0) {
		alert(errs[0].message);
		$('#' + errs[0].id).focus();
	}
});
payValidator.registerCallback('twoNum', function(value) {
	var twoNumRegex = /^(\d+(\.\d{1,2})?)$/g;
	return twoNumRegex.test(value);
}).setMessage('twoNum', '报名金额只能输入整数或两位小数');
 
  
$selfPayBtn.on('click', function() {
	if(payValidator._validateForm()) {
		var amount = $amount.val();
		var orderRemark = $orderRemark.val();
		window.location.href = serverUrl + '/mobileWeb/newStudent/goPayBySelf.htm?amount='+amount+"&orderRemark="+orderRemark;
	}
});
 
 