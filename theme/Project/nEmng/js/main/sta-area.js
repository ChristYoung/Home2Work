 //统计分析中日期控件的日期大小的相关限制
$('#startDate').datepicker({
    maxDate: new Date(),
	onSelect:function(dateText,inst){
		//设置结束日期的最小日期
		 $("#endDate").datepicker('option','minDate',new Date(dateText));
	}
});
$('#endDate').datepicker({
      maxDate: new Date(),
      onSelect:function(dateText,inst){  
            //设置开始日期的最大日期  
           $('#startDate').datepicker('option','maxDate',new Date(dateText));  
       }  
});
//点击查询时,保持select选值不变
$('.loc').each(function(i,e){
	change($(e));
});
//清空date,并将最大日期和最小日期的限制初始化
$('.clear-date').click(function(){
	$(this).siblings('input').val('');
	$('#startDate').datepicker('option','maxDate',new Date());
	$('#endDate').datepicker('option','minDate',new Date(1900-10-10));
});