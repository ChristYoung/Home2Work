$('#cancel_meet').click(function(){
	var server = $('#server').val(),
	    meetingId = $('#meetingId').val();
	if(confirm('是否取消该会议')){
	  $.ajax({
	  	type:'post',
	  	url: server +'wx/qyh/initiated/delete.json',
	  	data:{meetingIds:meetingId},
	  	dataType:'json',
	  	async:true,
	  	success:function(json){
	  		if(json.flg){
	  			alert('取消成功');
	  			window.location.href=server+"wx/qyh/initiated/query.htm?meetingStatus=wait";
	  		}else{
	  			alert('取消失败');
	  		}
	  	}
	  });
	}
});