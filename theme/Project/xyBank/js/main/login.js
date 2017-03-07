 //适配背景图
function resizeImg(){
  var w = $(window).width(),
      h = $(window).height();
    if(w>=1349){
    	$('.authcenter-background').height(h);
		$('#bgImg').width(w);
		$('#bgImg').height(w/1.6);
    }else{
    	$('.authcenter-background').height(643);
		$('#bgImg').width(1349);
		$('#bgImg').height(1349/1.6);
    }
};
$(window).resize(function(){
	 resizeImg();
});
$(window).load(function(){
	resizeImg();
});
	
//缴费登录表单验证
$('#loginForm').submit(function(){
	if(!$('#idNo').validator({errorTips:'请输入正确的身份证号',required:true,requiredMsg:'请输入身份证号',testType:'id'})
	  ||!$('#password').validator({required:true,requiredMsg:'请输入登录密码'}) 
	  ||!$('#code').validator({required:true,requiredMsg:'请输入验证码'})){
		return false;
	}
});

//学校管理登录表单验证
$('#loginForm-school').submit(function(){
	if(!$('#school-admin-name').validator({required:true,requiredMsg:'请输入管理员用户名'})
	  ||!$('#password-school').validator({required:true,requiredMsg:'请输入登录密码'}) 
	  ||!$('#code-school').validator({required:true,requiredMsg:'请输入验证码'})){
		return false;
	}
});

//银行管理登录表单验证
$('#loginForm-bank').submit(function(){
	if(!$('#bank-admin-name').validator({required:true,requiredMsg:'请输入管理员用户名'})
	  ||!$('#password-bank').validator({required:true,requiredMsg:'请输入登录密码'}) 
	  ||!$('#code-bank').validator({required:true,requiredMsg:'请输入验证码'})){
		return false;
	}
});

//选项卡切换
(function(){
	var aLi = $('.login-tab li'),
	     aModern = $('.login-modern');
	     aLi.click(function(){
	     	$('.errorTips').html('');  //切换选项卡时将错误信息清空
	     	aLi.removeClass('selected');
	     	$(this).addClass('selected');
	     	aModern.hide();
	     	aModern.eq($(this).index()).show();
	     });
})();

//学校管理登录联动查询
//function chooseSchool(server,obj){
//	var tag = obj.attr('tag');
//	if(tag == '0'){
//		$.ajax({
//			type:'post',
//			dataType:'json'
//			url:'',
//			async:false,
//			data；{},
//			
//		});
//	}
//}
