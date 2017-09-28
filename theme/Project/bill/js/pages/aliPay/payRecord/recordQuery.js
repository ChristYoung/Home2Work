var defaultStartDate = $('#startDate').val();
var startDateSelector,endDateSelector;

var $confirmBtn = $('#confirmBtn');
var serverUrl = $('#serverUrl').val();

var recordQueryValidator = new FormValidator('recordQueryForm', [
   {name:'startDate',display:rblanguage.alipay.begintime,rules:'required'},
   {name:'endDate',display:rblanguage.alipay.endtime,rules:'required'},
   {name:'idNum',display:rblanguage.alipay.id,rules:'callback_idCode'}
], true, function(errs, event) {
	if(errs.length > 0) {
		alert(errs[0].message);
	}
});

recordQueryValidator.registerCallback('idCode', function(value) { //身份证号的简单正则验证
	var idRex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return idRex.test(value);
}).setMessage('idCode', rblanguage.alipay.idmsg);

startDateSelector = mobiscroll.date('#startDate', {
    lang: 'zh',
    display: 'bottom',
    dateWheels: 'yy m d ',
    min: new Date(defaultStartDate),
    onSet: function (event, inst) { 
      var valueText = event.valueText;
      endDateSelector.option({min: new Date(valueText)}); //结束日期大于开始日期
    }
});

endDateSelector = mobiscroll.date('#endDate', {
	 lang: 'zh',
    display: 'bottom',
    dateWheels: 'yy m d ',
    min: new Date(defaultStartDate),
    onSet: function (event, inst) {
      var valueText = event.valueText;
      startDateSelector.option({max: new Date(valueText)}); //开始日期小于结束日期
    }
});