 //点击签到
$('#assign_btn').on('click',function(){
    //window.alert($('#baseUrl').val()+'/wx/qyh/myMeeting/sign/sign.json?meetingId='+$('#meetingId').val());
    $(this).hide();
    $('#leave_btn').hide();
    $('#cancel_sign').show();
    $.ajax({
        type:'get',
        url:$('#baseUrl').val()+'/wx/qyh/myMeeting/sign/sign.json?meetingId='+$('#meetingId').val(),
        async:true,
        success:function(json){
        	if(json.msg == 'success'){
        		alert('签到成功');
        		window.location.reload();
        	}else{
        		alert('签到失败');
        	}
        }
    });
});

//取消签到
$('#cancel_sign').on('click',function(){
	$(this).hide();
	$('#leave_btn').show();
	$('#assign_btn').show();
	
	$.ajax({
        type:'get',
        url:$('#baseUrl').val()+'/wx/qyh/myMeeting/sign/cancelSign.json?meetingId='+$('#meetingId').val(),
        async:true,
        success:function(json){
        	if(json.msg == 'success'){
        		alert('取消签到成功');
        		window.location.reload();
        	}else{
        		alert('取消签到失败');
        	}
        }
    });
	
});

//点击请假
$('#leave_btn').on('click',function(){
	$(this).hide();
	$('#qyh_mask').show();
	$('.opt_fill').show();
	$("body").addClass('bodyNoscroll');
	$('#assign_btn').hide();
	$('#cancel_leave').show();
	
	//请假弹出框点击取消
	$('.cancel_btn').off().on('click',function(){
		$('#qyh_mask').hide();
		$('.opt_fill').hide().find('textarea').val('');
		$("body").removeClass('bodyNoscroll');
		
		$('#cancel_leave').hide();
		$('#leave_btn').show();
	    $('#assign_btn').show();
	});
	//请假弹出框点击确认
	$('.confirm_btn').off().on('click',function(){
		var leaveReason = $('.fill_con').val();
		if(leaveReason == ''){
			alert('请输入请假原因');
		}else{
			$.ajax({
		        type:'get',
		        url:$('#baseUrl').val()+'/wx/qyh/myMeeting/leave/leave.json?meetingId='+$('#meetingId').val()+'&leaveReason='+leaveReason,
		        async:true,
		        success:function(json){
		        	if(json.msg == 'success'){
		        		alert('请假成功');
		        		window.location.reload();
		        	}else{
		        		alert('请假失败');
		        	}
		        	$('#qyh_mask').hide();
					$('.opt_fill').hide().find('textarea').val('');
					$("body").removeClass('bodyNoscroll');
					$('#cancel_leave').hide();
					$('#leave_btn').show();
				    $('#assign_btn').show();
		        }
		    });
		}
	});
});

//取消请假
$('#cancel_leave').on('click',function(){
	$(this).hide();
	$('#leave_btn').show();
	$('#assign_btn').show();
	
	$.ajax({
        type:'get',
        url:$('#baseUrl').val()+'/wx/qyh/myMeeting/leave/cancelLeave.json?meetingId='+$('#meetingId').val(),
        async:true,
        success:function(json){
        	if(json.msg == 'success'){
        		alert('取消请假成功');
        		window.location.reload();
        	}else{
        		alert('取消请假失败');
        	}
        }
    });
	
});