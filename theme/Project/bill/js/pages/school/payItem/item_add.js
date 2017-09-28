var $confirmBtn = $('#confirmBtn'),
	$payer = $('.payer'),
	$newStudentReport = $('#newStudentReport'),
	$wxPay = $('#wxPay'),
	$aliPay = $('#aliPay'),
	$uploadFile = $('#uploadFile'),
	$fileName = $('#fileName'),
	$pay_ways = $('.pay_ways'),
	$radio_area = $('.radio_area'),
	$mchName = $('#mchName'),
	$itemType = $('#itemType');

var Now = new Date();

var addItemValidator = new FormValidator('addPayItemForm', [
    {name:'payWay',display:rblanguage.school.paymentway,rules:'required'},
    {name:'itemName',display:rblanguage.school.paymentitem,rules:'required'},
    {name:'payTypeId',display:rblanguage.school.payTypeId,rules:'required'},
    {name:'itemFee',display:rblanguage.school.paymentamount,rules:'required|decimal|callback_twoNum',depends:function(field) {
    	if($('#itemFeeTr').css('display') == 'none') {
    		return false;
    	}
    	return true;
    }},
    {name:'startDate',display:rblanguage.school.paytime,rules:'required'},
    {name:'endDate',display:rblanguage.school.paytimeend,rules:'required'}
], false, function(errs) {
	if(errs.length > 0) {
		new autoMsg({
			type: 'error',
			msg: errs[0].message
		});
		$('#' + errs[0].id).focus();
	}
});
addItemValidator.registerCallback('twoNum', function(value) {
	var twoNumRegex = /^(\d+(\.\d{1,2})?)$/g;
	return twoNumRegex.test(value);
}).setMessage('twoNum', 'rblanguage.school.itemfeetip');


var serverUrl = $('#serverUrl').val();
var mchList = []; //所有商户号别名列表

$('#wmcList').find('option').each(function(i,e) {
	mchList.push({name:$(e).html(),value:$(e).val(), supportWxpay:$(e).attr('data-supportWxpay'), supportAlipay:$(e).attr('data-supportAlipay')});
});

//支付渠道和商户别名的联动关系
$pay_ways.on('click',function() {
	var checked = $pay_ways.filter(':checked');
	var mchOpt = '<option value="" data-supportWxpay="" data-supportAlipay="">'+rblanguage.school.allbusiness+'</option>';
	if(checked.length >= $pay_ways.length) {
		mchList.forEach(function(item, index) {
            if(item.supportWxpay == 'Y' && item.supportAlipay == 'Y') {
            	mchOpt += '<option value="'+item.value+'" data-supportWxpay="'+item.supportWxpay+'" data-supportAlipay="'+item.supportAlipay+'">'+item.name+'</option>'
            }
		});
	} else if(checked.length < $pay_ways.length && checked.length > 0) {
		if(checked[0].value == 'wxPay') {
			mchList.forEach(function(item, index) {
	            if(item.supportWxpay == 'Y') {
	            	mchOpt += '<option value="'+item.value+'" data-supportWxpay="'+item.supportWxpay+'" data-supportAlipay="'+item.supportAlipay+'">'+item.name+'</option>'
	            }
			});
		} else {
			mchList.forEach(function(item, index) {
	            if(item.supportAlipay == 'Y') {
	            	mchOpt += '<option value="'+item.value+'" data-supportWxpay="'+item.supportWxpay+'" data-supportAlipay="'+item.supportAlipay+'">'+item.name+'</option>'
	            }
			});
		}
	} else {
		mchOpt = '<option value="" data-supportWxpay="" data-supportAlipay="">'+rblanguage.school.allbusiness+'</option>';
	}
	$mchName.html(mchOpt);
});

$payer.on('click', function() { //选择年级或者导入excel
	var _index = parseInt($(this).val() - 1);
	$('#itemFeeTr').show();
	if(_index == 1) {
		$('#itemFeeTr').hide();
	}
    $uploadFile.val('');	
    $fileName.html('');
	$radio_area.hide().eq(_index).show();
	$itemType.val($(this).val());
});


$newStudentReport.on('click', function() { 
	if($(this).prop('checked')) {
		$('.payer_tr').hide();
		$itemType.val('3');
	} else {
		$('.payer_tr').show();
		$itemType.val($payer.filter(':checked').val());
	}
});

$.datetimepicker.setLocale('zh');
$('#startDate').datetimepicker({
	timepicker: false,
	format: 'Y/m/d',
	scrollMonth: false,
	scrollInput: false,
	minDate: Now.format(),
	onShow: function(ct) {
		this.setOptions({
			maxDate: $('#endDate').val() ? $('#endDate').val() : false
		});
	}
});

$('#endDate').datetimepicker({
	timepicker: false,
	format: 'Y/m/d',
	scrollMonth: false,
	scrollInput: false,
	onShow: function(ct) {
		this.setOptions({
			minDate: $('#startDate').val() ? $('#startDate').val() : Now.format()
		});
	}
});

$confirmBtn.on('click', function() {
	if(addItemValidator._validateForm()) {
		$confirmBtn.attr('disabled',true);
		$linkage = $('.linkage');
		if($payer.filter(':checked').val() == 1) { //如果是选择的年级,入学年份等,则需要传longname给后台
			var longname = '';
			if(!$newStudentReport.prop('checked')) { //如果新生报名缴费项被勾选,则不需要选择年级
				$linkage.each(function(i, e) {
					if($(e).val() != '') {
						longname += '-'+$(e).find('option:checked').html();
					}
				});
			}
			$('#longname').val(longname);
		}
		var fd = new FormData($('#addPayItemForm')[0]); //使用formData对象上传文件
		$.ajax({
			type: 'post',
			url: serverUrl + '/school/wpPayItem/add.htm',
			async:true,
			data: fd,
			processData: false,  // 不处理数据
            contentType: false,   // 不设置内容类型
            dataType:'json',
            timeout:66000,
            success: function(data) {
            	$confirmBtn.attr('disabled', false);
            	if(data.success) {
	                new autoMsg({type:'success',msg:rblanguage.admin.successmsg,callBack:function() {
	                  	window.location.href = serverUrl + '/school/wpPayItem/list.htm';
	                }});
				} else {
	                new autoMsg({type:'error',msg:data.resultMsg});
				}
            },
            error: function() {
            	$confirmBtn.attr('disabled', false);
            	new autoMsg({type:'error',msg:rblanguage.school.timeout});
            }
		});
	}
});