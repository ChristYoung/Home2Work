var $splitPay = $('.splitPay');
var $delBtn = $('.del-btn');
var $payTradeBtn = $('.pay-trade-btn');
var serverUrl = $('#serverUrl').val();

// 拆单支付的各个区间临界值,单独抽取出来方便修改*/
//var splitRange = [ 50000, 30000, 20000, 10000, 5000 ];
var splitRange = [ 0.05, 0.04, 0.03, 0.02, 0.01 ];
var rangeMin = Math.min.apply(null, splitRange);

// 弹出拆单金额的选择框,amount表示支付金额
var showSplitPaySelector = function(amount) {
	var _list = [];
	for (var i = 0, len = splitRange.length; i < len; i++) {
		if (amount > splitRange[i]) {
			for (var j = 0; j < len; j++) {
				if (splitRange[j] <= splitRange[i]) {
					_list.push({
						name : String(splitRange[j]),
						value : splitRange[j]
					});
				}
			}
			break;
		}
	};
	return _list;
};

$splitPay.on('click', function() {
	var moneyAmount = parseFloat($(this).attr('data-amount')),
	id = $(this).attr('data-id');   
	
	
	//ajax查找实时信息
	$.ajax({
		type : 'post',
		url : serverUrl + '/mobileWeb/normal/queryNonPay.ajax?orderId='
				+ id,
		async : true,
		dataType : 'json',
		success : function(data) {
			debug_config._listeners(data);
			if(data.success){
			var vo=data.vo;
			showSplit(vo);
			}else{
				alert(data.resultMsg);
			}
		},
		error:function(data){
			alert("error");
		}
	});
	
	
});

function showSplit(vo){
	// 当支付金额小于拆单最小金额时,直接跳转到支付页面
	if(vo.isOrderSplit == 'N') {
		window.location.href = serverUrl + "/mobileWeb/normal/goPayByOrderId.htm?type=1&orderId=" + vo.id + "&splitAmountStr=" + vo.toPayAmount;
	} else {
		var pop = Object.create(popWindow);
		var _list = showSplitPaySelector(vo.toPayAmount);
		pop.init({
			_list : _list,
			title : rblanguage.alipay.listtitle,
			callBack : function(value) {
				window.location.href = serverUrl + "/mobileWeb/normal/goPayByOrderId.htm?type=1&orderId=" + vo.id + "&splitAmountStr=" + value;
			}
		});
	}
}

$delBtn.on('click', function() { // 删除订单
	if(confirm(rblanguage.alipay.delconfirm)) {
	    var tradeId = $(this).attr('data-id');
		$.ajax({
			type : 'post',
			url : serverUrl + '/mobileWeb/pay/deleteTradeOrder.ajax?tradeId='
					+ tradeId,
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

$payTradeBtn.on('click', function() {
	var tradeId = $(this).attr('data-id');
	var url = serverUrl + '/mobileWeb/normal//goPayByTradeId.htm?tradeId='+ tradeId;
	window.location.href = url;
});