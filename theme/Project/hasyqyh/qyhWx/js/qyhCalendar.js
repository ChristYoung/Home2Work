var $dateQuery = $('#dateQuery'),
	$holder = $('#days'),
	$prev = $('#prev'),
	$next = $('#next'),
	$pickerList = $('.picker-list'),
	$ctitle = $('#calendar-title'),
	$cyear = $('#calendar-year'),
	$customQueryBtn = $('#customQueryBtn');

var LIMITNUM = 5; //限制选择最多个数

var monthName = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

var _d = new Date(),
	_year = _d.getFullYear(),
	_month = _d.getMonth() + 1,
	_day = _d.getDate();

var dayStart = function(year, month) { //获取某一个月的第一天是星期几
	var tempDate = new Date(year, month, 1);
	return tempDate.getDay();
};

var getMonthDays = function(year, month) { //获取一个月有多少天
	var hashDate = new Date();
	hashDate.setFullYear(year, month, 0);
	return hashDate.getDate();
};

var getDayInfo = function(infoYear, infoMonth, infoDay) { //转换当天的信息,如:2016年12月30号转换为20161230
	infoMonth = infoMonth[1] ? infoMonth : '0' + infoMonth;
	infoDay = infoDay[1] ? infoDay : '0' + infoDay;
	return infoYear + infoMonth + infoDay;
};

var refreshDate = function() { //生成当前月份显示
	var str = '',
		totalDays = getMonthDays(_year, _month), //获取该月天数
		firstaDay = dayStart(_year, _month - 1);
	for(var i = 1; i < firstaDay; i++) {
		str += '<li></li>'; //为起始日期之前的日期创建空白节点
	};
	for(var i = 1; i <= totalDays; i++) {
		str += '<li data-day="' + i + '"><span class="days-span">' + i + '</span></li>'
	};
	$holder.html(str);
	$ctitle.html(monthName[_month - 1]);
	$cyear.html(_year);
};
refreshDate();

$prev.on('click', function() {
	_month--;
	if(_month < 1) {
		_year--;
		_month = 12;
	}
	refreshDate();
});

$next.on('click', function() {
	_month++;
	if(_month > 12) {
		_year++;
		_month = 1;
	}
	refreshDate();
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

$customQueryBtn.on('click', function() { //点击确认后,将所选的日期信息放到隐藏域中提交到后台
	var daysQueryStr = '', //将所选的日期以逗号隔开拼成字符串传给后台
		infoYear = parseInt($cyear.html()).toString(),
		infoMonth = parseInt($ctitle.html()).toString(),
		checkedDays = $pickerList.find('.active');
    if(checkedDays.length == 0){
    	alert('请先选择要查询的日期')
    }else{
	    checkedDays.each(function(i, e) {
			var infoDay = $(e).attr('data-day');
			daysQueryStr += getDayInfo(infoYear, infoMonth, infoDay)+','; //将所选的日期拼成字符串以逗号隔开传给后台
		});
	    $dateQuery.val(daysQueryStr);
	    $('#customQueryForm').submit();
    }
});