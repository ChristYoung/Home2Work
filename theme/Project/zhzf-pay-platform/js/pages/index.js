$(function() {
		var $chartsTabs = $('.charts-tabs');
		$chartsTabs.each(function(i,e){
			var $chartsItems = $(e).find('.charts-tabs-items');
			var $pltCharts = $(e).siblings('.plt-charts');
			$chartsItems.on('click',function(){
				$chartsItems.removeClass('active');
				$(this).addClass('active');
				$pltCharts.hide().eq($(this).index()).show();
			});
		});
    $.datetimepicker.setLocale('zh');//设置日期时间控件显示中文
	$('#startDate').datetimepicker({ //初始化开始日期
		timepicker: false, //禁用时间控件
		format: 'Y/m/d', //日期格式，若要建立日期选择范围，格式必须设置成Y/m/d才能支持，请不要改成Y-m-d这种格式
		scrollMonth: false,
		scrollInput: false,
		onShow: function(ct) { //建立日期选择范围，开始日期不能大于结束日期
			this.setOptions({
				maxDate: $('#endDate').val() ? $('#endDate').val() : false
			});
		}
	});

	$('#endDate').datetimepicker({ //初始化结束日期
		timepicker: false, //禁用时间控件
		format: 'Y/m/d', //日期格式，若要建立日期选择范围，格式必须设置成Y/m/d才能支持，请不要改成Y-m-d这种格式
		scrollMonth: false,
		scrollInput: false,
		onShow: function(ct) {
			var newDate = new Date();
			this.setOptions({ //建立日期选择范围，结束日期不能小于开始日期
				minDate: $('#startDate').val() ? $('#startDate').val() : false
			});
		}
	});
});