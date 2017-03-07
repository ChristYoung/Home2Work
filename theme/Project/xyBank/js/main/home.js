//修改密码表单验证
$('#passwordForm').submit(function(){
	if(!$('#current-password').validator({required:true,requiredMsg:'请输入当前密码'})
	    ||!$('#new-password').validator({errorTips:'新密码需要8-16位数字字母组合',required:true,requiredMsg:'请输入新密码',testType:'strongpassword'})
	   ||!$('#confirm-password').validator({required:true,requiredMsg:'请再输入一次密码以确认',objEqual:$('#new-password'),equalMsg:'两次密码输入不一致'})){
		 return false;
	}
});
//窗口关闭时,清空错误信息
function clearError(){$('.errorTips').html('')};