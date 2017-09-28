var serverUrl = $('#serverUrl').val();
var $paylistPayBtn = $('.paylistPayBtn');

// 拆单支付的各个区间临界值,单独抽取出来方便修改*/
//var splitRange = [ 50000, 30000, 20000, 10000, 5000 ];
var splitRange = [ 0.5, 0.04, 0.03, 0.02, 0.01 ];
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

$paylistPayBtn.on('click', function() {
	var id = $(this).attr('data-id'),
		isSplit ='',
		hasPaying ='',
		toPayAmount ='';
 
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
			
		}
	});
	
});	
	
	
function showSplit(vo){
	var isSplit=vo.isOrderSplit;
	var hasPaying=vo.hasPayingList;
	var toPayAmount=vo.toPayAmount;
	var id=vo.id;
	if(isSplit == 'N') {
		//直接跳转，不需要拆分
		window.location.href = serverUrl + "/mobileWeb/normal/goPayByOrderId.htm?orderId=" + id + "&splitAmountStr=" + toPayAmount;
	} else {
		if(hasPaying == 'Y') {
			//有支付中订单，直接拆单列表进页面
			window.location.href = serverUrl + "/mobileWeb/normal/toSplitPay.htm?orderId=" + id;
		} else {
			//小于拆单最小金额,不需要拆分
			if(parseFloat(toPayAmount) <= rangeMin) {
				window.location.href = serverUrl + "/mobileWeb/normal/goPayByOrderId.htm?orderId=" + id + "&splitAmountStr=" + toPayAmount;
			} else {
				var _list = showSplitPaySelector(toPayAmount);
				var pop = Object.create(popWindow);
				pop.init({
					_list: _list,
					title: rblanguage.alipay.listtitle,
					callBack: function(value) {
						window.location.href = serverUrl + "/mobileWeb/normal/goPayByOrderId.htm?orderId=" + id + "&splitAmountStr=" + value;
					}
				});
			}
		}
	}
}
