//默认第一个会议室为选中状态
$('.sel_radio').eq(0).prop('checked',true);

//弹出图片框(点击查看会议室详情)
$('.enLargearea').on('click',function(){
	var roomId = $(this).siblings('.sel_radio').val();
	$('#qyh_mask').show();
	$('#meet_room_detail').fadeIn(500);
	$("body").addClass('bodyNoscroll');
	//发送一个ajax请求,请求具体的会议室详情
	$.ajax({
		type:'get',
		url: $('#server').val()+'/wx/qyh/meeting/create/getRoom.json?roomId='+roomId,
		async:true,
		success:function(json){
			//根据后台返回的数据,填充会议室信息
			$('#room_name').html(json.room.name); //会议名称
			if(json.room.pic == null){ //如果会议室没有图片则使用默认的会议室图片
				$('#meetImg')[0].src = $('#server').val()+'img/huiyishi.png';
			}else{
				$('#meetImg')[0].src = $('#server').val()+'common/imgdown.htm?id='+json.room.id; //会议室简介图片
			}
			$('#con_num').html(json.room.maxNumber); //会议室最大容纳人数
			$('#equipment_enable').html(json.room.device); //会议室设备
			$('#room_address').html(json.room.address); //会议室地址
		}
	});
});

//点击遮罩层关闭弹窗
$('#qyh_mask').off().on('click',function(){
	$('#qyh_mask').hide();
	$('#meet_room_detail').hide(200);
	$('#meetImg')[0].src = '';
	$("body").removeClass('bodyNoscroll');
});
