var
    $detailsDialog = $('#detailsDialog'),
    $modalDialog = $('#modalDialog'),
	$modalConfirmBtn = $('#modalConfirmBtn'),
	$bodyContent = $('#bodyContent'),
	$modalTitle = $('#modalTitle'),
	$del_btn = $('.del_btn'),
	$details_btn = $('.details_btn'),
	$enable_btn = $('.enable_btn'),
	$forbid_btn = $('.forbid_btn'),
	$query_accountName = $('.query_accountName'),
	$query_accountName_show = $('.query_accountName_show'),
	$payTypeId = $('#payTypeId'),
	$payItemId = $('#payItemId'),
	$itemStatus = $('#itemStatus');

var serverUrl = $('#serverUrl').val();

$payItemId.searchableSelect();//收费项目初始化可搜索的select

$enable_btn.on('click', function() { 
   var payItemId = $(this).attr('data-id');
   $.post(serverUrl + '/school/wpPayItem/updateStatus.ajax', {payItemId:payItemId, status:'1'}, function(data) {
		if(data.success) {
            new autoMsg({type:'success',msg:rblanguage.admin.enablemsg,callBack:function(){
              	window.location.href = window.location.href;
            }});
		} else {
          new autoMsg({type:'error',msg:data.resultMsg});
		}
	},'json');
});

$forbid_btn.on('click', function() { 
	var payItemId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.school.disabletollitem);
	$bodyContent.html(rblanguage.school.distollitemtip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.post(serverUrl + '/school/wpPayItem/updateStatus.ajax', {payItemId:payItemId, status:'0'}, function(data) {
			if(data.success) {
                new autoMsg({type:'success',msg:rblanguage.admin.disablemsg,callBack:function(){
                  	window.location.href = window.location.href;
                }});
			} else {
              new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});

$del_btn.on('click', function() { 
	var itemName = $(this).parent().siblings('.itemName').html();
	var payItemId = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.school.deltollitem);
	$bodyContent.html(rblanguage.school.deltip+itemName+rblanguage.school.matip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.post(serverUrl + '/school/wpPayItem/delete.ajax', {payItemId:payItemId}, function(data) {
			if(data.success) {
                new autoMsg({type:'success',msg:rblanguage.bank.delmsg,callBack:function(){
                  	window.location.href = window.location.href;
                }});
			} else {
              new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});

$details_btn.on('click',function(){
	var payItemId = $(this).attr('data-id');
	$.get(serverUrl + '/school/wpPayItem/getItemInf.ajax', {payItemId:payItemId}, function(data) {
		$('#detailtypename').html(data.payType.payTypeName);
        $('#detailname').html(data.payItem.itemName);
        if(data.payItem.status == '1') {
        	$('#detailstatus').html(rblanguage.school.enabled);
        } else if (data.payItem.status == '0') {
        	$('#detailstatus').html(rblanguage.school.disabled);
        }
        $('#detailamount').html(data.payItem.targetNum);
        $('#detailWpMechConfigName').html(data.payItem.wpMechConfigName);
        
        $('#detailbegintime').html(new Date(data.payItem.startTime).format());
        $('#detailendtime').html(new Date(data.payItem.endTime).format());
        $('#detailcreatetime').html(new Date(data.payItem.createTime).format());
        $('#detailmemo').html(data.payItem.memo);
		$detailsDialog.modal('show');
	},'json');
});

$.datetimepicker.setLocale('zh');
$('#startDate').datetimepicker({ 
	timepicker: false, 
	format: 'Y/m/d', 
	scrollMonth: false,
	scrollInput: false,
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
		var newDate = new Date();
		this.setOptions({ //建立日期选择范围，结束日期不能小于开始日期
			minDate: $('#startDate').val() ? $('#startDate').val() : false
		});
	}
});

$('#createStartDate').datetimepicker({ 
	timepicker: false, 
	format: 'Y/m/d', 
	scrollMonth: false,
	scrollInput: false,
	onShow: function(ct) { 
		this.setOptions({
			maxDate: $('#createEndDate').val() ? $('#createEndDate').val() : false
		});
	}
});

$('#createEndDate').datetimepicker({ 
	timepicker: false, 
	format: 'Y/m/d', 
	scrollMonth: false,
	scrollInput: false,
	onShow: function(ct) {
		var newDate = new Date();
		this.setOptions({ //建立日期选择范围，结束日期不能小于开始日期
			minDate: $('#createStartDate').val() ? $('#createStartDate').val() : false
		});
	}
});

$payTypeId.on('change', function() { //根据项目类别显示收费项目
	var payTypeId = $(this).val();
	$.post(serverUrl + '/school/common/queryPayItemByType.ajax', {
		payType: payTypeId
	}, function(data) {
		var opt = '',
			payItemList = data.itemList,
			payItemListLen = payItemList.length;
		if(payItemListLen != 0) {
			opt += '<option value="" selected="selected">'+rblanguage.school.allpayitem+'</option>';
			payItemList.forEach(function(item, index) {
				opt += '<option value="' + item.id + '">' + item.itemName + '</option>'
			});
		} else {
			opt += '<option value="" selected="selected">'+rblanguage.school.allpayitem+'</option>';
		}

		$payItemId.next('div').remove();
		$payItemId.find('option').remove();
		$payItemId.html(opt);
		$payItemId.searchableSelect();
	}, 'json');
});