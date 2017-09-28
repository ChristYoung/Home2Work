var $payTypeId = $('#payTypeId'),
     $itemStatus = $('#itemStatus'),
     $payItemId = $('#payItemId');

var serverUrl = $('#serverUrl').val();

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
		this.setOptions({ 
			minDate: $('#startDate').val() ? $('#startDate').val() : false
		});
	}
});

//缴费项目随着项目类别进行联动
$payTypeId.on('change', function() {
	var me = $(this);
	$.ajax({
		type: 'post',
		url: serverUrl + '/school/common/queryPayItemByType',
		async: true,
		dataType: 'json',
		data: {
			payType: me.val()
		},
		success: function(json) {
			var itemList = json.itemList,
			opt_item = '';
			if(itemList.length != 0) {
				opt_item += '<option value="" selected="selected">'+rblanguage.school.allpayitem+'</option>';
				for(var i = 0; i < itemList.length; i++) {
					opt_item += '<option value="' + itemList[i].id + '">' + itemList[i].itemName + '</option>';
				}
			} else {
				opt_item += '<option value="" selected="selected">'+rblanguage.school.allpayitem+'</option>';
			}
			$itemStatus.find('option[value=""]').prop('selected',true);
			if(me.find('option:selected').text() == rblanguage.school.userenteramount) {
				opt_item='<option value="" selected="selected">'+rblanguage.school.userenteramount+'</option>';
				$itemStatus.find('option[value="1"]').prop('selected',true);
			}
			$payItemId.next('div').remove();
			$payItemId.find('option').remove();
			$payItemId.append($(opt_item));
			$payItemId.searchableSelect();
		}
	});
});