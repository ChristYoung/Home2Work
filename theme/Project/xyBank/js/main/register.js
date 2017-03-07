//身份证检查表单验证
$('#registerForm0').submit(function(){
	if(!$('#idNo').validator({errorTips:'请输入正确的身份证号',required:true,requiredMsg:'请输入身份证号',testType:'id'})){
		return false;
	}
});

//设置登录密码表单验证
$('#registerForm1').submit(function(){
	if(!$('#validateCode').validator({errorTips:'验证码为8位纯数字',required:true,requiredMsg:'请输入验证码',minLength:8,minMsg:'验证码为8位纯数字',testType:'onlynum'}) 
	  ||!$('#password').validator({errorTips:'密码需要8-16位数字字母组合',required:true,requiredMsg:'请输入密码',testType:'strongpassword'}) 
	  ||!$('#password-confirm').validator({required:true,requiredMsg:'请再输入一次密码以确认',objEqual:$('#password'),equalMsg:'两次密码输入不一致'})){
		return false;
	}
});
		
//60s后重新发送验证码
(function(){
	var iTimer = null,
    _index = 60;
	$('#sendCode').click(function(){
		new autoMsg({'type': 'success', 'msg': '验证码已发送'});
		var me = $(this);
		if(_index == 60){
			me.attr('disabled',true);
			me.html(_index+'s后可重新发送');
			iTimer = setInterval(function(){
				_index--;
				me.html(_index+'s后可重新发送');
				if(_index == 0){
					_index = 60;
					me.attr('disabled',false).html('发送验证码');
					clearInterval(iTimer);
				}
			},1000);
		}
	});
})();