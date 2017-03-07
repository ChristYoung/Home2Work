//修改密码表单验证
$('#phoneForm').submit(function(){
	if(!$('#new-phone').validator({errorTips:'请输入正确手机号',required:true,requiredMsg:'请输入新的手机号',testType:'phonenum'}) 
	  ||!$('#vali-code').validator({errorTips:'验证码为8位纯数字',required:true,requiredMsg:'请输入验证码',minLength:8,minMsg:'验证码为8位纯数字',testType:'onlynum'})){
		return false;
	}
});

//60s后重新发送验证码
//点击发送验证码先验证是否输入了手机号
(function(){
	var iTimer = null,
    _index = 60;
	$('#sendCode').click(function(){
		var me = $(this);
		if(!$('#new-phone').validator({errorTips:'请输入正确手机号',required:true,requiredMsg:'请输入新的手机号',testType:'phonenum'})){
			return
		}else{
			new autoMsg({'type': 'success', 'msg': '验证码已发送'});
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
		}
	});
})();

//设置缴费提醒
$('#modify-days').click(function(){
	$('#em-days').hide();
	$(this).hide();
	$('#save-days').show();
	$('#info-days').show().focus();
});

$('#save-days').click(function(){
	if(!$('#info-days').validator({errContainer:$('.days-error'),errorTips:'只能输入正整数',testType:'onlynum'})){
		return;
	}
});