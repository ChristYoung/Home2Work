var now = new Date(); //日期控件设置
var server = $('#server').val();

//切换选择月份
$('#week_input').datetimepicker({
	language:  'zh-CN',
	startDate: new Date(2010,1,0),
	endDate: new Date(2099,0,0),
    weekStart: 1,
    todayBtn:  0,
    autoclose:1,
	todayHighlight: false,
	startView: 3,
	minView: 3
}).on('changeMonth',function(ev){ //通过切换选择月份,联动周
	var month = ev.date.getFullYear().toString() + (ev.date.getMonth()+1).toString();
	
	if(ev.date.getFullYear()<now.getFullYear() ||  (ev.date.getFullYear() == now.getFullYear() && (ev.date.getMonth()+1)<(now.getMonth()+1))){//如果选择的日期不在当前日期的周内,则所有显示的周程内容无法编辑,只能查看
		$('.week_tr').find('.week_textarea').attr('readonly',true);
		$('#send_arrengment').hide();
	}else{
		$('.week_tr').find('.week_textarea').attr('readonly',false);
		$('#send_arrengment').show();
	}
	
	getWeek(month);
}).on('hide',function(){
	$('#week_input').blur();
});
//设置月份选择框的默认月份为当前月(注意必须只能设置placeholder，设置value值将导致日期控件的默认日期失效)
$('#week_input').attr('placeholder',now.getFullYear()+'-'+(now.getMonth()+1)+'月');

//页面加载完成后默认加载当前月的周程内容
getContent();
	
//点击切换周获取内容
$('.week_wp').on('click','.week_sel',function(){
	$('.week_sel').removeClass('active');
	$(this).addClass('active');
	$('#active_week').val($(this).attr('data-week')); //选中了某个周
	getContent();
});

//点击切换部门获取内容
$('#department').on('change',function(){
	getContent();
});

//点击发送和保存
$('#send_arrengment').click(function(){
	$(this).attr('disabled',true);
	sendAndSave();
});

//获取内容的请求
function getContent(){
	var 
	    weekVal =  $('#week_input').val()==''?$('#week_input').attr('placeholder'):$('#week_input').val(), //当value值是空时,表示是初始化的状态,通过placeholder来获取值
	    departmentId = parseInt($('#department').val()),
	    year = weekVal.substring(0,weekVal.indexOf('-')),
	    week = parseInt($('#active_week').val()),
	    currentWeek = parseInt($('#currentWeek').val()),
	    gmtStart = $('.week_sel.active').attr('data-gmtStart'),
	    gmtEnd = $('.week_sel.active').attr('data-gmtEnd');
	
	$.ajax({
		type:'post',
		url:server+'wx/qyh/wa/getContent.json',
		data:{departmentId:departmentId, year:year, week:week, gmtStart:gmtStart, gmtEnd:gmtEnd},
		dataType:'json',
		async:true,
		success:function(json){
			//console.log(json);
			if(year<now.getFullYear() || (year == now.getFullYear() && week<currentWeek) ){//如果选择的日期不在当前日期的周内,则所有显示的周程内容无法编辑,只能查看
				$('.week_tr').find('.week_textarea').attr('readonly',true);
				$('#send_arrengment').hide();
			}else{
				$('.week_tr').find('.week_textarea').attr('readonly',false);
				$('#send_arrengment').show();
			}
			
			if(json.getContentResult.resultCode){ //session失效
				window.location.href = server +"comm/overTime.htm";
				return;
			}
			
			if(json.getContentResult.success && json.getContentResult.qyhArrangement){
				var id = json.qyhArrangement.id;
				var contentJson = JSON.parse(json.getContentResult.qyhArrangement.content);
				$('#lastModify').val(id);
				$('.week_tr').each(function(i,e){
					$(e).find('.morning').val(contentJson.arrengment[i].morning);
					$(e).find('.afternoon').val(contentJson.arrengment[i].afternoon);
				});
			}else if(json.getContentResult.success && !json.getContentResult.qyhArrangement){
				$('#lastModify').val('0');
				$('.week_textarea').val('');
			}
		}
	});
};

//获取当前月在一年中有多少周的请求
function getWeek(month){
	$.ajax({
		type:'post',
		url:server+'wx/qyh/wa/getWeek.json',
		data:{month:month},
		dataType:'json',
		async:true,
		success:function(json){
			var $oA = '',
			    weekVoList = json.weekVoList,
			    nowMonth = now.getFullYear().toString()+(now.getMonth()+1).toString();
			    weekVolLen  =weekVoList.length;
			$('.week_wp a').remove();
			for(var i=0; i<weekVolLen; i++){
				$oA+='<a href="javascript:;" style="margin-left:3px;" data-week="'+weekVoList[i].week+'" data-gmtStart="'+weekVoList[i].startTime+'" data-gmtEnd="'+weekVoList[i].endTime+'" class="week_sel input_btn btn_bar">'+weekVoList[i].week+'周('+weekVoList[i].startTime+'-'+weekVoList[i].endTime+')</a>'
			};
			$('.week_wp').append($($oA));
		}
	});    
};

//点击发送的请求
function sendAndSave(){
	var IsselectWeek = $('.week_wp').find('.active').length,
	     emptyTag = false;
	
	$('.week_textarea').each(function(i,e){
		if($(e).val() != ''){
			emptyTag = true;
			return;
		}
	});
	
	if(IsselectWeek == 0){
		new autoMsg({'type' : 'error','msg' : '请先选择周','delay':1500,'callBack':function(){
			$('#send_arrengment').attr('disabled',false);
		}});
		return;
	}else if(!emptyTag){
		new autoMsg({'type' : 'error','msg' : '您还未添加任何周程事项','delay':1500,'callBack':function(){
			$('#send_arrengment').attr('disabled',false);
		}});
		return;
	}else{
		var weekJSON = { //要发送的具体周程
			"arrengment":[
			  {"morning": $('#monday_mon').val() ,"afternoon": $('#monday_aft').val()},
		      {"morning": $('#tuesday_mon').val() ,"afternoon": $('#tuesday_aft').val()},
		      {"morning": $('#wednesday_mon').val() ,"afternoon": $('#wednesday_aft').val()},
		      {"morning": $('#thursday_mon').val() ,"afternoon": $('#thursday_aft').val()},
		      {"morning": $('#friday_mon').val() ,"afternoon": $('#friday_aft').val()},
		      {"morning": $('#saturday_mon').val() ,"afternoon": $('#saturday_aft').val()},
		      {"morning": $('#sunday_mon').val() ,"afternoon": $('#sunday_aft').val()}
			]
		};
		var content = JSON.stringify(weekJSON),
		     weekVal =  $('#week_input').val()==''?$('#week_input').attr('placeholder'):$('#week_input').val(), //当value值是空时,表示是初始化的状态,通过placeholder来获取值
		     id =  parseInt($('#lastModify').val());
		     departmentId = parseInt($('#department').val()),
		     year = weekVal.substring(0,weekVal.indexOf('-')),
		     week = parseInt($('#active_week').val()),
		     gmtStart = $('.week_sel.active').attr('data-gmtStart'),
		     gmtEnd = $('.week_sel.active').attr('data-gmtEnd');
		
		$.ajax({
			type:'post',
			url: server+'wx/qyh/wa/saveAndSend.json' ,
			data:{id:id, departmentId:departmentId, year:year, week:week, gmtStart:gmtStart, gmtEnd:gmtEnd, content:content},
			dataType:'json',
			async:true,
			success:function(json){
				if(json.flg){
					$('#lastModify').val(json.id);
					new autoMsg({'type' : 'success','msg' : json.msg,'callBack':function(){
						$('#send_arrengment').attr('disabled',false);
					}});
				}else{
					if(json.code){ //session失效
						window.location.href = server +"comm/overTime.htm";
				        return;
					}else{
						new autoMsg({'type' : 'success','msg' : '发送失败','callBack':function(){
							$('#send_arrengment').attr('disabled',false);
						}});
					}
				}
			}
		});
	}
};
