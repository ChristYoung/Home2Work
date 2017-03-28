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
		var
			_d = new Date(),
			currentMonth = _d.getMonth() + 1,
			currentYear = _d.getFullYear(),
			selectedMonth = $('#monthInput').val(),
			selectedYear = $yearInput.val();

		if((selectedYear * 10000 + selectedMonth * 10) < (currentYear * 10000 + currentMonth * 10)) {
			$tabItems.find('.form-control').prop('readonly', true);
		} else {
			$tabItems.find('.form-control').prop('readonly', false);
		}
	};

	var clearNoNum = function(obj, numlimit) { //限制只能输入小数点后两位,并且进行计算
		obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
		obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
		obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		if(numlimit == '2') {
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数   
		} else if(numlimit == '1') {
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一位小数   
		}
		if(obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
			obj.value = parseFloat(obj.value);
		}
	};

	var perDay = function(obj, perShow) { //计算每个月每天的指标
		var rexTwoNum = /^((?!0)\d+(\.\d{1,2})?)$/g,
			year = $yearInput.val(),
			month = $('#monthInput').val(),
			dates = getMonthDate(year, month);
		if(obj.val() == '') {
			perShow.html('0.00');
		};
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
		setReadonly();
		//ajax something
	});

	$monthTabs.on('click', function() { //切换选择月份
		var selectedMonth = $(this).attr('data-month');
		$monthTabs.removeClass('active');
		$(this).addClass('active');
		$('#monthInput').val(selectedMonth);
		setReadonly();
		selectedMonth > 1 ? $('#appToYear').hide() : $('#appToYear').show();
		//ajax something
	});

	$numInput.on('keyup', function() { //绑定计算每天指标的函数,并限制只能输入两位小数
		var $perShow = $(this).siblings('.per-day');
		clearNoNum($(this)[0], '2');
		perDay($(this), $perShow);
	});

	$percentageInput.on('keyup', function() { //限制收入指标只能输入一位小数
		clearNoNum($(this)[0], '1');
		var ThisValue = $(this).val();
		if(parseFloat(ThisValue) > 100) {
			if(parseFloat(ThisValue) > 1000) { //当用户长按时,触发keyup时已经输入了三位数了
				$(this).val(ThisValue.substring(0, ThisValue.length - 2));
			} else {
				$(this).val(ThisValue.substring(0, ThisValue.length - 1));
			}
		}
	});

	$tabsBtn.on('click', function() { //选项卡切换
		var _index = $(this).index();
		$tabItems.hide();
		$tabItems.eq(_index).fadeIn(300);

		$tabsBtn.removeClass('active');
		$(this).addClass('active');
	});

	setReadonly();

});