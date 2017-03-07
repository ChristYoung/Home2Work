//全选
$('.check_all').checkAll($('.check_item'));

//表单验证
$('#meetForm').submit(function(){
	if(!$('#startTime').validator({required:true,requiredMsg:'请选择开始时间'})
	  ||!$('#endTime').validator({required:true,requiredMsg:'请选择结束时间'})
	  ||!$('#attendNum').validator({required:true,requiredMsg:'请输入参会人数',testType:'onlyNum',errorTips:'参会人数必须为大于等于2的数字',minVal:2,valMsg:'参会人数必须为大于等于2的数字'})  ){
		return false;
	}
});