var $yearQuery = $('#yearQuery'),
	$holder = $('#years'),
	$prev = $('#prev'),
	$next = $('#next'),
	$pickerList = $('.picker-list'),
	$ctitle = $('#calendar-title'),
	$customQueryBtn = $('#customQueryBtn');

//常量
var LIMITNUM = 5, //限制选择最多个数
	TOTAL_YEARS = 12, //一次显示12年
	START_YEAR = 2016, //从2016年开始显示年视图
	END_YEAR = 2050;

var start_year = 2016;

var _d = new Date(),
	_year = _d.getFullYear();

var refreshYear = function(startYear, taotalYear) { //生成当前月份显示
	var str = '';
	for(var i = 0; i < taotalYear; i++) {
		str += '<li data-year="' + startYear + '">' + startYear + '</li>';
		startYear++;
	};
	$holder.html(str);
	$ctitle.html((startYear - taotalYear) + '-' + (startYear - 1));
};
refreshYear(start_year, TOTAL_YEARS);

$pickerList.find('li').each(function(i, e) {
	var thisYear = parseInt($(e).attr('data-year'));
	if(thisYear <= _year && thisYear > (_year - LIMITNUM)) {
		$(e).addClass('active');
	}
});

$prev.on('click', function() {
	start_year = (start_year - TOTAL_YEARS) < START_YEAR ? start_year : (start_year - TOTAL_YEARS);
	refreshYear(start_year, TOTAL_YEARS);
});

$next.on('click', function() {
	start_year = (start_year + TOTAL_YEARS) > END_YEAR ? start_year : (start_year + TOTAL_YEARS);
	var end_year = start_year + TOTAL_YEARS;
	if(end_year <= END_YEAR) {
		refreshYear(start_year, TOTAL_YEARS);
	} else {
		var diff = TOTAL_YEARS - (end_year - END_YEAR) + 1;
		refreshYear(start_year, diff);
	}

});

$pickerList.on('click', 'li', function() {
	var activeLen = $(this).parent().find('.active').length;
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		if(activeLen < LIMITNUM) {
			$(this).addClass('active');
		}
	}
});

$customQueryBtn.on('click', function() {
	var yearQueryStr = '', //将所选的年份以逗号隔开拼成字符串传给后台
		checkedDays = $pickerList.find('.active');
	if(checkedDays.length == 0) {
		alert('请先选择要查询的年份')
	} else {
		checkedDays.each(function(i, e) {
			var infoYear = $(e).attr('data-year');
			yearQueryStr += infoYear + ','; //将所选的日期拼成字符串以逗号隔开传给后台
		});
		$yearQuery.val(yearQueryStr);
		$('#customQueryForm').submit();
	}
});