var $confirmBtn = $('#confirmBtn');
var serverUrl = $('#serverUrl').val();

var $payerPayBtn = $('.payer-pay-btn');

var payItemQueryFormValidator = new FormValidator('payItemQueryForm', [
   {name:'idNum',display:rblanguage.alipay.stunumber,rules:'required'}
], false, function(errs, event) {
	if(errs.length > 0) {
		alert(errs[0].message);
	}
});

//选项卡切换
$('header li').on('click', function(e) {
	e.preventDefault()
	var i = $(this).index();
	$('header li').removeClass('active');
	$(this).addClass('active');
	$('section').hide();
	$('#page-' + i).show();
});

//弹出框
$('.delete-user').on('click', function(e) {
	if(confirm(rblanguage.alipay.confir)) {
		var payerId = $(this).attr('data-id');
		$.ajax({
			type : 'post',
			url : serverUrl + '/mobileWeb/normal/deletePayer.ajax?payerId='
					+ payerId,
			async : true,
			dataType : 'json',
			success : function(data) {
				debug_config._listeners(data);
				if (data.success) {
					window.location.reload(true);
				} else {
					alert(data.resultCode);
				}
			}
		});
	}
});

$confirmBtn.on('click', function() {
	if(payItemQueryFormValidator._validateForm()) {
		var studentNum=$('#idNum').val();
		 var url=serverUrl + '/mobileWeb/normal/queryNonPayListByStudenNum.htm?studentNum='+studentNum;
		 window.location.href=url;
	}
});

//这种写法，在浏览器、微信开发者工具都是可以点击跳转，但在微信正式环境变成了刷新，不知原因
//$payerPayBtn.on('click', function() {
//		var id=$(this).attr('data-id');
//		var isSplit=$(this).attr('data-split');
//		var hasPaying=$(this).attr('data-hasPaying');
//		var toPayAmount=$(this).attr('data-toPayAmount');
//		alert(id+"."+isSplit+"."+hasPaying+"."+toPayAmount);
//		//isSplit是否拆分
//		if(isSplit=='N'){
//			//直接跳转，不需要拆分
//			 var url=serverUrl + "/mobileWeb/normal/goPayByOrderId.htm?orderId="+id+"&splitAmountStr="+toPayAmount;
//			 window.location.href=url;
//		}else{
//			if(hasPaying=='Y'){
//				//有支付中订单，直接拆单列表进页面
//				 var url=serverUrl + "/mobileWeb/normal/toSplitPay.htm?orderId="+id ;
//				 window.location.href=url;
//			}else{
//				//弹选择数值后，提交
//				var splitAmount='0.01';//仅测试
//				var url=serverUrl + "/mobileWeb/normal/goPayByOrderId.htm?orderId="+id+"&splitAmountStr="+splitAmount;
//				 window.location.href=url;
//			}
//			
//		}
//		
//		
//
//	 
//});
 