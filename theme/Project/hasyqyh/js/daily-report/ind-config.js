$(function() {
	var $tabsBtn = $('.tabs-btn'),
		$tabItems = $('.ind-tabs-items'),
		$numInput = $('.num-input'),
		$yearModal = $('#yearModal'),
		$yearInput = $('#yearInput'), //显示所选年份的input
		$monthTabs = $('.month-tabs'), //月份选项卡
		$percentageInput = $('.percentage-input');

	var getMonthDate = function(year, month) { //返回一个月有多少天
		var d = new Date();
		d.setFullYear(year, month, 0);
		return d.getDate();
	};

	var setReadonly = function() { //当前月份之前的指标或定额，置灰不允许修改
		var currentMonth = new Date().getMonth() + 1,
			selectedMonth = $('#monthInput').val();
		if(currentMonth > selectedMonth) {
			$tabItems.find('.form-control').prop('readonly', true);
		} else {
			$tabItems.find('.form-control').prop('readonly', false);
		}
	};

	var clearNoNum = function(obj) { //限制只能输入小数点后两位,并且进行计算
		obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
		obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
		obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
		if(obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
			obj.value = parseFloat(obj.value);
		}
	};

	var perDay = function(obj, perShow) { //计算每个月每天的指标
		var rexTwoNum = /^((?!0)\d+(\.\d{1,2})?)$/g,
			year = $yearInput.val(),
			month = $('#monthInput').val(),
			dates = getMonthDate(year, month);
		if(!rexTwoNum.test(obj.val())) { //如果输入的不是两位小数直接return
			return false;
		} else {
			perShow.html((obj.val() / dates).toFixed(2));
		}
	};

	$yearInput.val(new Date().getFullYear()); //默认显示当前年份

	$yearModal.on('click', '.timeModal-item', function() { //选择年份
		$yearInput.val($(this).html());
		$yearModal.modal('hide');
	});

	$numInput.each(function(i, e) { //初始化每天指标
		var $perShow = $(e).siblings('.per-day');
		if($(e).val() == '') {
			$perShow.html('0.00');
		}
	}).on('keyup', function() { //绑定计算每天指标的函数,并限制只能输入两位小数
		var $perShow = $(this).siblings('.per-day');
		clearNoNum($(this)[0]);
		perDay($(this), $perShow);
	});

	$tabsBtn.on('click', function() { //选项卡切换
		var _index = $(this).index();
		$tabItems.hide();
		$tabItems.eq(_index).fadeIn(300);
	});

	$monthTabs.on('click', function() { //切换选择月份
		$monthTabs.removeClass('active');
		$(this).addClass('active');
		$('#monthInput').val($(this).attr('data-month'));
		setReadonly();
	});

	setReadonly();

});