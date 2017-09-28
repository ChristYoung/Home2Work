function setMainBodyHeight() {
	function f() {
		var h = $(window).height() - $('#header').outerHeight();
		if($('#main_body').outerHeight() < h) {
			$('#main_body').css({
				'min-height': h
			});
		}
	}
	$(window).on('resize', f);
	f();
}

function bindSideMenu() {
	$('#side_menu dl dt').on('click', function() {
		if(!$(this).parent().hasClass(('active'))) {

			$('#side_menu dl dd').filter(':animated').stop(true, true);
			$('#side_menu dl').filter('.active').find('dd').css('display', 'block').slideUp(300).parent().removeClass('active');
			$(this).next('dd').slideDown(300).parent().addClass('active');
		} else {
			$(this).next('dd').css('display', 'block').slideUp(300).parent().removeClass('active');
		}

		$('.m_xxx_ul').animate({
			"height": 0
		}, 300);

	});

	//三级菜单8.31添加 #

	$('.m_xxx').each(function(i) {
		$(this).on('click', function() {
			$(this).addClass('on3').siblings().removeClass('on3')
			if($(this).next('ul').height() == 0) {
				var $ul_li_length = $(this).next('ul').find('li').length
				$(this).parent().find('ul').eq(i).animate({
					"height": $ul_li_length * 30
				}, 300).siblings('ul').animate({
					"height": 0
				}, 300)
				$(this).find('.m_xxx_span3').addClass('on5').parent().siblings('.m_xxx').find('.m_xxx_span3').removeClass('on5')
				$(this).find('.m_xxx_span1').addClass('on6').parent().siblings('.m_xxx').find('.m_xxx_span1').removeClass('on6')
			} else {
				$(this).next('ul').animate({
					"height": 0
				}, 300);
				$(this).removeClass('on3')
				$(this).find('.m_xxx_span3').removeClass('on5')
				$(this).find('.m_xxx_span1').removeClass('on6')
			}
		});
		$(this).on('mouseenter', function() {
			$(this).addClass('on2')
			$(this).find('.m_xxx_span1').addClass('on4')
			$(this).find('.m_xxx_span3').addClass('on4')
		})
		$(this).on('mouseleave', function() {
			$(this).removeClass('on2')
			$(this).find('.m_xxx_span1').removeClass('on4')
			$(this).find('.m_xxx_span3').removeClass('on4')
		})
	})
};

function setSideMenu(menuID, subMenuID) {
	$(menuID).find('dt').trigger('click');
	$(subMenuID).addClass('active');
};

function setThirdSideMenu(menuID, subMenuID, thirdMenuID) {
	$(menuID).find('dt').trigger('click');
	$(subMenuID).trigger('click');
	$(thirdMenuID).addClass('active');
};

function getFileInfo(file) {
	var fileInfo = {};
	fileInfo.path = $(file).val();
	if(fileInfo.path.lastIndexOf('\\') != -1) {
		fileInfo.name = fileInfo.path.substr(fileInfo.path.lastIndexOf('\\') + 1, fileInfo.path.length - 1);
	} else {
		fileInfo.name = fileInfo.path;
	}
	fileInfo.extName = fileInfo.name.substr(fileInfo.name.lastIndexOf('.') + 1, fileInfo.name.length - 1).toLowerCase();
	return fileInfo;
};

function showFileName(file, showObj) {
	var fileInfo = getFileInfo(file);
	$(showObj).html(fileInfo.name);
};

$(function() {
	setMainBodyHeight();
	bindSideMenu();
	//bindEditPasswordEvent();//绑定修改头部密码框事件
	//selectedAuto();
});

Date.prototype.format = function() {
	var _year = this.getFullYear(),
	_month = this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1,
	_date = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
	return _year + '/' + _month + '/' + _date;
};

$.fn.checkAll = function(options) {
	var me = this;
	var Len = options.length;
	this.on('click', function() {
		options.prop('checked', $(this).prop('checked'));
	});
	options.on('click', function() {
		me.prop('checked', options.filter(':checked').length == Len ? true : false);
	});
	return this;
};

function changeLinkage(serverUrl, obj) { //班级联动
	var tag = parseInt(obj.attr('tag')),
		TAX_MAX = 4; //最多有四级联动
		for(var i = (tag + 1); i < TAX_MAX; i++) {
			$('select[tag="' + i + '"]').hide();
			$('select[tag="' + i + '"]').find('option').not('option[value=""]').remove();
		}

		if(obj.val() == '') return;

		if(tag == 0) {
			$.post(serverUrl + '/ed/schpayItem/getschmajors', {
				institutesid: obj.val()
			}, function(json) {
				var majorsList = json.majors,
				enrolYearList = json.enyears,
				opt_year = '<option value="">全部入学年份</option>',
				opt_major = '<option value="">全部专业</option>';
				if(majorsList.length != 0) {
					for(var i = 0; i < majorsList.length; i++) {
						opt_major += '<option value="' + majorsList[i].majorUid + '">' + majorsList[i].majorName + '</option>';
					}
					$('select[tag="' + (tag + 1) + '"]').show().html(opt_major);
				} else {
					for(var i = 0; i < enrolYearList.length; i++) {
						opt_major += '<option value="' + enrolYearList[i].enrolYear + '">' + enrolYearList[i].enrolYear + '</option>';
					}
					$('select[tag="' + (tag + 1) + '"]').show().html(opt_year);
				}
			}, 'json');
		}

		if(tag == 1) {
			$.post(serverUrl + '/ed/schpayItem/getschclasstypelist', {
				institutesid: $('select[tag="0"]').val(),
				majorid: obj.val()
			}, function(json) {
				if(json.length == 0) return;
				var opt_year = '<option value="">全部入学年份</option>';
				json.splice(0, 1);
				for(var i = 0; i < json.length; i++) {
					opt_year += '<option value="' + json[i].enrolYear + '">' + json[i].enrolYear + '</option>';
				}
				$('select[tag="' + (tag + 1) + '"]').show().html(opt_year);
			}, 'json');
		}

		if(tag == 2) {
			$.post(serverUrl + '/ed/schpayItem/getschclasstypelist', {
				institutesid: $('select[tag="0"]').val(),
				majorid: $('select[tag="1"]').val(),
				enrolYear: obj.val()
			}, function(json) {
				if(json.length == 0) return;
//			var opt_class = '<option value="">全部班级</option>';
var opt_class='';
for(var i = 0; i < json.length; i++) {
	opt_class += '<option value="' + json[i].classUid + '">' + json[i].className + '</option>';
}
$('select[tag="' + (tag + 1) + '"]').show().html(opt_class);
}, 'json');
		}
	};

//省市联动
function changeProv(serverUrl,obj) { 		
	if(obj.val() == '') return;
	$.get(serverUrl + '/provincecity/super_get_citys.json', 
		{parentId: obj.val()}, 
		function(json) {
			var cityList = json.pcList,
			opt_city = '<option value="">所在市</option>';
			if(cityList.length != 0) {
				for(var i = 0; i < cityList.length; i++) {
					opt_city += '<option value="' + cityList[i].id + '">' + cityList[i].locName + '</option>';
				}
				$('select[name="cityId"]').html(opt_city);
			} 
		}, 'json');
}

//UEditor自定义配置项
var myUEditorOptions = {
	//关闭字数统计
	wordCount: false,
	//关闭elementPath
	elementPathEnabled: false,
	//关闭自动长高
	autoHeightEnabled: false,
	//自定义工具栏
	toolbars: [
	[
	'fullscreen', 'source', '|', 'undo', 'redo', '|',
	'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
	'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
	'fontsize', '|',
	'indent', '|',
	'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
	'link', 'unlink', '|',
	'simpleupload', '|',
	'preview', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deletecol', 'insertcol', 'mergecells'
	]
	]
};

