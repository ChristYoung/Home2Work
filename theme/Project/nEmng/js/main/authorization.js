//全部转移
function moveAll(e1,e2){
    var eLi = e1.find('li');
    eLi.removeClass('choosen flag');
    eLi.appendTo(e2);
};

//逐个转移
function moveOne(e1,e2){
    var eLi = e1.find('.choosen');
    eLi.removeClass('choosen flag');
    eLi.appendTo(e2);
};

//添加被选类
$('.select-list li').click(function(){
	if(!$(this).hasClass('flag')){
		$(this).addClass('choosen flag');
	}else{
		$(this).removeClass('choosen flag');
	}
});

//点击按钮调用转移
$('#leftOne').click(function(){
	  moveOne($('#list1'),$('#list2'));
});
$('#rightOne').click(function(){
	  moveOne($('#list2'),$('#list1'));
});
$('#leftAll').click(function(){
	 moveAll($('#list1'),$('#list2'));
});
$('#rightAll').click(function(){
	 moveAll($('#list2'),$('#list1'));
});
$('#list1 li').dblclick(function(){
	 moveOne($('#list1'),$('#list2'));
});
$('#list2 li').dblclick(function(){
	 moveOne($('#list2'),$('#list1'));
});


//表单提交
$('#go-submit').click(function(){
	var aLi = $('#list2').find('li');
	var str = '';
	aLi.each(function(i,e){
		str+=$(e).attr('data-value')+',';
	});
	$('#dataList').val(str);
	$('#authForm').submit();
});