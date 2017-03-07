$(document).ready(function(){
	var _index = 60;
	function countdown(){
		var iTimer = null,
		    me = $('#getCode');
		iTimer = setInterval(function(){
			_index--;
			if(_index == 0){
				clearInterval(iTimer);
				me.html('获取验证码');
				_index = 60;
			}else{
				me.html('等待'+_index+'s');
			}
    	},1000);
	};
	
	$('#registerForm').submit(function(){
		if(!$('#vertifyCode').validator({required:true,requiredMsg:'验证码不能为空'})
		   ||!$('#password').validator({errorTips:'密码需为6~32位数字字母组合',required:true,requiredMsg:'密码不能为空',testType:'strongpassword'}) 
		   ||!$('#passwordConfirm').validator({equalMsg:'两次密码输入不一致',required:true,requiredMsg:'确认密码不能为空',objEqual:$('#password')}) ){
			return false;
		}
	});
	
	$('#getCode').on('click',function(){
		if($(this).html() == '获取验证码'){
			countdown();
		}
	});
	countdown();
});
        