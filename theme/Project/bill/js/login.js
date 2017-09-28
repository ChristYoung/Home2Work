//适配背景图
function resizeImg() {
	var w = $(window).width(),
		h = $(window).height();
	if(w >= 1349) {
		$('.authcenter-background').height(h);
		$('#bgImg').width(w);
		$('#bgImg').height(w / 1.6);
	} else {
		$('.authcenter-background').height(643);
		$('#bgImg').width(1349);
		$('#bgImg').height(1349 / 1.6);
	}
};
$(window).resize(function() {
	resizeImg();
});

//切换验证码
function changeImg(obj, URL) {
	obj.attr('src', URL + '?' + Math.random());
}

//登录验证
var FormValidator = new FormValidator('loginForm', [
  {name: 'userName',display: '用户名',rules: 'required'},
  {name: 'password',display: '登录密码',rules: 'required'},
  {name: 'code',display: '验证码',rules: 'required'}
], true, function(err, event) {
	$('.errorTips').html(err[0].message);
	$('#' + err[0].id).focus();
});

//切换登录类型
$('.loginType').on('click', function() {
	$('.loginType').removeClass('active');
	$(this).addClass('active');
	$('#type').val($(this).attr('data-type'));
	$('#loginTypeTitle').html($(this).html());
	$('.bgImg').hide().eq($(this).index()).show();
});