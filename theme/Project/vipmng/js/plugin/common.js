//设置main_body的高度
function setMainBodyHeight(){
	function f(){
		var h = $(window).height() - $('#header').outerHeight();
		if($('#main_body').outerHeight() < h){
			$('#main_body').css({'min-height': h});
		}
	};
	$(window).on('resize', f);
	f();
};

//获取文件格式
function getFileInfo(file){
	var fileInfo = {};
	fileInfo.path = $(file).val();
	if(fileInfo.path.lastIndexOf('\\') != -1){
		fileInfo.name = fileInfo.path.substr(fileInfo.path.lastIndexOf('\\') + 1, fileInfo.path.length - 1);
	}else{
		fileInfo.name = fileInfo.path;
	}
	fileInfo.extName = fileInfo.name.substr(fileInfo.name.lastIndexOf('.') + 1 , fileInfo.name.length - 1).toLowerCase();
	return fileInfo;
};

//菜单下拉
//function bindSideMenu(){
//	$('#side_menu dl dt').on('click', function(){
//		if(!$(this).parent().hasClass(('active'))){
//			$('#side_menu dl dd').filter(':animated').stop(true, true);
//			$('#side_menu dl').filter('.active').find('dd').css('display', 'block').slideUp(300).parent().removeClass('active');
//			$(this).next('dd').slideDown(300).parent().addClass('active');
//		}else{
//			$(this).next('dd').css('display', 'block').slideUp(300).parent().removeClass('active');
//		}
//	});
//};
//
////设置菜单默认打开位置
//function setSideMenu(menuID, subMenuID){
//	$(menuID).find('dt').trigger('click');
//	$(subMenuID).addClass('active');
//};

//执行
$(function(){
	setMainBodyHeight();
	bindSideMenu();
});