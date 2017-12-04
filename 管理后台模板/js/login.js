var server = $('#server').val();
var iTimer = null;

function resizeImg() { // 适配背景图
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

$('.forgetPwdBtn').on('click', function() { // 忘记密码
	$('.slide-modern').hide();
	$('.pwdReset-morden').show();
});

$('#giveUpRestPwdBtn').on('click', function() { // 放弃重置密码
	$('.slide-modern').hide();
	$('.login-modern').show();
	
	$('#formRest').trigger('click'); // 放弃重置密码后,表单清空
});

function changeImg(obj, URL) { // 切换验证码
	obj.attr('src', URL + '?' + Math.random());
}

var loginFormValidator = new FormValidator('loginForm', [ // 登录验证
  {name: 'userName',display: '用户名',rules: 'required'},
  {name: 'password',display: '登录密码',rules: 'required'},
  {name: 'code',display: '验证码',rules: 'required'}
], true, function(err, event) {
	if(err.length > 0) {
		$('#loginErrorTips').html(err[0].message);
	    $('#' + err[0].id).focus();
	}
});

var restPwdFormValidator = new FormValidator('pwdRestForm',[ // 重置密码验证
   {name: 'userName', display: '管理员账号',rules: 'required'},
   {name: 'phoneNo', display: '管理员手机',rules: 'required|valid_phone'},
   {name: 'verificationCode', display: '验证码',rules: 'required'},
   {name: 'newPasswd', display: '新密码', rules: 'required|min_length[8]|max_length[16]|callback_strongPwd'}
], true, function(err) {
	if(err.length > 0) {
		$('#forgetPwdErrTips').html(err[0].message);
	    $('#' + err[0].id).focus();
	}
});
restPwdFormValidator.registerCallback('strongPwd', function(value) {
    	//密码必须为8-16位数字字母组合
    	var rex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/; 
    	return rex.test(value);
});
restPwdFormValidator.setMessage('strongPwd', '新密码请输入8~16数字字母组合');
var restPwdCodeValidator = new FormValidator('pwdRestForm', [  // 点击发送验证码时,验证手机号
   {name: 'userName', display: '管理员账号',rules: 'required'},
   {name: 'phoneNo', display: '管理员手机',rules: 'required|valid_phone'}
], false, function(err) {
	if(err.length > 0) {
		$('#forgetPwdErrTips').html(err[0].message);
	    $('#' + err[0].id).focus();
	}
});


$('#sendCodeAgain').on('click', function() { // 发送验证码
	var RESEND_TIME = 60,
	     me = $(this);
	if(restPwdCodeValidator._validateForm()) {
		$('#forgetPwdErrTips').html('');
		$.ajax({
			type: 'post',
			url: server + '/pc/verification/code',
			async: true,
			data: {phoneNo: $('#phoneNo').val(), userName: $('#userName-forget').val()},
			dataType: 'json',
			success: function(json) {
			    if(json.success) {
				    me.removeClass('xy-btn-warn').addClass('xy-btn-disable').attr('disabled', true);
					me.html('已发送('+RESEND_TIME+'s)');
			    	iTimer = setInterval(function() {
			    		RESEND_TIME--;
			    		me.html('已发送('+RESEND_TIME+'s)');
			    		if(RESEND_TIME == 0) {
			    			clearInterval(iTimer);
			    			me.removeClass('xy-btn-disable').addClass('xy-btn-warn').attr('disabled', false);
			    			me.html('发送验证码');
			    		}
			    	},1000);
			    } else {
			    	$('#forgetPwdErrTips').html(json.resultMsg);
			    }
			}
		});
	}
});

$('#confirmRestPwdBtn').on('click', function() { // 确认重置密码
	if(restPwdFormValidator._validateForm()) {
		$('#forgetPwdErrTips').html('');
		var username = $('#userName-forget').val();
		$.ajax({
			type: 'post',
			url: server + '/pc/admin/resetPwd',
			data: $('#pwdRestForm').serialize(),
			async:true,
			dataType: 'json', 
			success: function(data) {
				console.log(data);
			}
		});
	}
});
