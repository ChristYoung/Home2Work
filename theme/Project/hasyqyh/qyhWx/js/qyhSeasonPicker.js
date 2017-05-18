var $seasonQuery = $('#seasonQuery'),
    $prev = $('#prev'),
	$next = $('#next'),
	$pickerList = $('.picker-list'),
	$ctitle = $('#calendar-title'),
	$customQueryBtn = $('#customQueryBtn');
	
var _d = new Date(),
    _month = _d.getMonth()+1,
    _season = Math.floor( (_month%3)==0?(_month/3):(_month/3+1) ),
	_year = _d.getFullYear();
	
var LIMITNUM = 5,
    MAX_YEAR = 2050, //设置可以选择的最大年份
    MIN_YEAR = 2000;

var getMonthInfo = function(infoYear, infoSeason) { 
	infoSeason = infoSeason[1] ? infoSeason : '0' + infoSeason;
	return infoYear + infoSeason;
};

$pickerList.find('li').each(function(i,e){ //当前季度的之前4个季度默认选中
	var thisSeason = $(e).attr('data-season');
	if(thisSeason<=_season && thisSeason>(_season-LIMITNUM)){
		$(e).addClass('active');
	}
});

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

$customQueryBtn.on('click', function() { 
	var seasonsQueryStr = '', 
		infoYear = parseInt($ctitle.html()).toString(),
		checkedSeason = $pickerList.find('.active');
    if(checkedSeason.length == 0){
    	alert('请先选择要查询的季度')
    }else{
	    checkedSeason.each(function(i, e) {
			var infoSeason = $(e).attr('data-season');
			seasonsQueryStr += getMonthInfo(infoYear, infoSeason)+','; //将所选的日期拼成字符串以逗号隔开传给后台
		});
	    $seasonQuery.val(seasonsQueryStr);
	    $('#customQueryForm').submit();
    }
});