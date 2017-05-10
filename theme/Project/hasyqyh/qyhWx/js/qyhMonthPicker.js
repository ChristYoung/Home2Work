var $monthQuery = $('#monthQuery'),
    $prev = $('#prev'),
	$next = $('#next'),
	$pickerList = $('.picker-list'),
	$ctitle = $('#calendar-title'),
	$customQueryBtn = $('#customQueryBtn');
	
var _d = new Date(),
	_year = _d.getFullYear();
	
var LIMITNUM = 5,
    MAX_YEAR = 2050, //设置可以选择的最大年份
    MIN_YEAR = 2000;

var getMonthInfo = function(infoYear, infoMonth) { 
	infoMonth = infoMonth[1] ? infoMonth : '0' + infoMonth;
	return infoYear + infoMonth;
};

$next.on('click',function(){
	_year++;
	if(_year<=MAX_YEAR){
		$pickerList.find('li').removeClass('active');
		$ctitle.html(_year);
	}
});

$prev.on('click',function(){
	_year--;
	if(_year>=MIN_YEAR){
		$pickerList.find('li').removeClass('active');
		$ctitle.html(_year);
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

$customQueryBtn.on('click', function() { //点击确认后,将所选的日期信息放到隐藏域中提交到后台
	var monthsQueryStr = '', //将所选的日期以逗号隔开拼成字符串传给后台
		infoYear = parseInt($ctitle.html()).toString(),
		checkedMonth = $pickerList.find('.active');
    if(checkedMonth.length == 0){
    	alert('请先选择要查询的月份')
    }else{
	    checkedMonth.each(function(i, e) {
			var infoMonth = $(e).attr('data-month');
			monthsQueryStr += getMonthInfo(infoYear, infoMonth)+','; //将所选的日期拼成字符串以逗号隔开传给后台
		});
	    $monthQuery.val(monthsQueryStr);
	    $('#customQueryForm').submit();
    }
});