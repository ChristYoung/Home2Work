$('#newMeet3').click(function(){
	var me = $(this);
	//要提交的参数
	var roomId = $('#roomId').val(),
	     fqrIds = $('#fqrIds').val(),
	     cyrIds = $('#cyrIds').val(),
	     title = $('#meetTitle').val(),
	     startTime = $('#startTime').val(),
	     endTime = $('#endTime').val(),
	     remindMin = $('#time_sel').val(),
	     content = $('#meetcontent').val();
	
	if(!$('#meetTitle').validator({required:true,requiredMsg:'请输入会议标题'})
	  || !$('#meetcontent').validator({required:true,requiredMsg:'请输入会议内容'})
	  || !$('#fqrIds').validator({required:true,requiredMsg:'请选择发起人'})
	  || !$('#cyrIds').validator({required:true,requiredMsg:'请选择参会人'})
	  || !isFQrepeatCY()  ){
		return false;
	}else{
		me.attr('disabled',true); //在发送请求之前先将按钮置灰
		$.ajax({
			type:'get',
			url: $('#server').val()+'wx/qyh/meeting/create/submit?roomId='+roomId+'&fqrIds='+fqrIds+'&cyrIds='+cyrIds+'&title='+title+'&content='+content+'&startTime='+startTime+'&endTime='+endTime+'&remindMin='+remindMin,
			async:true,
			success:function(json){
				if(json.success == true){
					alert('新增成功');
					window.location.href = $('#server').val()+'/wx/qyh/initiated/query.htm?meetingStatus=wait';
					me.attr('disabled',false);
				}else{
					alert('新增失败:'+json.resultMsg);
					me.attr('disabled',false);
				}
			},
			error:function(){
				alert('请求出错');
			    me.attr('disabled',false);
			}
		});
	}
});

//判断参会人和发起人是否有重叠
function isFQrepeatCY(){
	var fq = $('#fqrIds').val().split(','),
	    cy = $('#cyrIds').val().split(',');
	if(ExistsSameValues(fq,cy)){
		alert('发起人和参会人不能有重叠');
		return false;
	}
	return true;
}

//设置会议开始前的提示时间
$('#time_sel').on('change',function(){
	$('#time_remind').html($(this).val());
});

$(function(){  
	 jt_appid=$('#jt_appid').val();
	 jt_timestamp=$('#jt_timestamp').val();
	 jt_noncestr=$('#jt_noncestr').val();
	 jt_signature=$('#jt_signature').val();
	
	 jgt_group_id=$('#jgt_group_id').val();
	 jgt_timestamp=$('#jgt_timestamp').val();
	 jgt_noncestr=$('#jgt_noncestr').val();
	 jgt_signature=$('#jgt_signature').val();
	wx.config({
	    debug: false, 
	    appId: jt_appid, // 必填，企业号的唯一标识，此处填写企业号corpid
	    timestamp: jt_timestamp, // 必填，生成签名的时间戳
	    nonceStr: jt_noncestr, // 必填，生成签名的随机串
	    signature:jt_signature,// 必填，签名，见附录1
	    jsApiList: ['openEnterpriseChat',  
	                'openEnterpriseContact',  
	                'getNetworkType'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	}); 

   

	wx.error(function(res) {
		console.log(res.errMsg);
	});

	wx.ready(function(){
		evalWXjsApi = function(jsApiFun) {
		    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		        jsApiFun();
		    } else {
		        document.attachEvent && document.attachEvent("WeixinJSBridgeReady", jsApiFun);
		        document.addEventListener && document.addEventListener("WeixinJSBridgeReady", jsApiFun);
		    }
		}
		console.log('ee:',evalWXjsApi);
		  regEvent();
	}); 
});


function regEvent(){
	document.querySelector('#fqr_invoke').onclick = function() {
	var selectedUserIds = $('#fqrIds').val().split(',');	
	evalWXjsApi(function() {
	    WeixinJSBridge.invoke("openEnterpriseContact", {
	        "groupId": jgt_group_id,    // 必填，管理组权限验证步骤1返回的group_id
	        "timestamp": jgt_timestamp,    // 必填，管理组权限验证步骤2使用的时间戳
	        "nonceStr":jgt_noncestr,    // 必填，管理组权限验证步骤2使用的随机字符串
	        "signature": jgt_signature,  // 必填，管理组权限验证步骤2生成的签名
	        "params" : {
	            'departmentIds' : [0],    // 非必填，可选部门ID列表（如果ID为0，表示可选管理组权限下所有部门）
	            'tagIds' : [0],    // 非必填，可选标签ID列表（如果ID为0，表示可选所有标签）
	            'userIds' : [],    // 非必填，可选用户ID列表
	            'mode' : 'multi',    // 必填，选择模式，single表示单选，multi表示多选
	            'type' : ['user'],    // 必填，选择限制类型，指定department、tag、user中的一个或者多个
	            'selectedDepartmentIds' : [],    // 非必填，已选部门ID列表
	            'selectedTagIds' : [],    // 非必填，已选标签ID列表
	            'selectedUserIds' : selectedUserIds,    // 非必填，已选用户ID列表
	        },
	    }, function(res) {
	    	 if (res.err_msg.indexOf('function_not_exist') > -1) {
	                alert('版本过低请升级');
	            } else if (res.err_msg.indexOf('openEnterpriseContact:fail') > -1) {
	                return;
	            }
             var result = JSON.parse(res.result);    // 返回字符串，开发者需自行调用JSON.parse解析  
             
             var selectAll = result.selectAll;     // 是否全选（如果是，其余结果不再填充）  
             if (!selectAll)  
             {  
                 var selectedDepartmentList = result.departmentList;    // 已选的部门列表  
                 var selectedUserList = result.userList;    // 已选的成员列表  
                 var selectedUserListLen = selectedUserList.length;
                 var userIds="";
                 var userNameSpanDom = '';
                 for (var i = 0; i < selectedUserListLen; i++) {  
	                     var user = selectedUserList[i];  
	                     var userId = user.id;    // 已选的单个成员ID  
	                     var userName = user.name;    // 已选的单个成员名称 
                     	 userIds+=userId+',';  
                         userNameSpanDom+='<span class="f_16 s_gray f_oflow fqr_span" data-id="'+userId+'">'+userName+'<i class="del_fqr">&#10008</i></span>';
                 }  
                 $('#fqrIds').val(userIds);
                 $('#fqr_peopleNum').html(selectedUserListLen);
                 $('#fqr_list').show().html(userNameSpanDom);
                 if(selectedUserListLen == 0){
                 	$('#fqr_list').hide();
                 }
             }else{
             	alert('发起人不能选择全部');
             }
	    })
	});
	}
  
	
	document.querySelector('#cyr_invoke').onclick = function() {
	var selectedUserIds = $('#cyrIds').val().split(',');	
	evalWXjsApi(function() {
	    WeixinJSBridge.invoke("openEnterpriseContact", {
	        "groupId": jgt_group_id,    // 必填，管理组权限验证步骤1返回的group_id
	        "timestamp": jgt_timestamp,    // 必填，管理组权限验证步骤2使用的时间戳
	        "nonceStr":jgt_noncestr,    // 必填，管理组权限验证步骤2使用的随机字符串
	        "signature": jgt_signature,  // 必填，管理组权限验证步骤2生成的签名
	        "params" : {
	            'departmentIds' : [0],    // 非必填，可选部门ID列表（如果ID为0，表示可选管理组权限下所有部门）
	            'tagIds' : [0],    // 非必填，可选标签ID列表（如果ID为0，表示可选所有标签）
	            'userIds' : [],    // 非必填，可选用户ID列表
	            'mode' : 'multi',    // 必填，选择模式，single表示单选，multi表示多选
	            'type' : ['department','user'],    // 必填，选择限制类型，指定department、tag、user中的一个或者多个
	            'selectedDepartmentIds' : [],    // 非必填，已选部门ID列表
	            'selectedTagIds' : [],    // 非必填，已选标签ID列表
	            'selectedUserIds' : selectedUserIds,    // 非必填，已选用户ID列表
	        },
	    }, function(res) {
	    	 if (res.err_msg.indexOf('function_not_exist') > -1) {
	                alert('版本过低请升级');
	            } else if (res.err_msg.indexOf('openEnterpriseContact:fail') > -1) {
	                return;
	            }
             var result = JSON.parse(res.result);    // 返回字符串，开发者需自行调用JSON.parse解析  
               
             var selectAll = result.selectAll;     // 是否全选（如果是，其余结果不再填充）  
             if (!selectAll)  
             {  
                 var selectedDepartmentList = result.departmentList;    // 已选的部门列表  
                 var selectedUserList = result.userList;    // 已选的成员列表  
                 var userIds="";
                 var userNameSpanDom = '';
                 var departmentIds="";
                 var selectedUserListLen = selectedUserList.length;
                 var selectedDepartmentLen = selectedDepartmentList.length;
                 
                 var departmentIdsArr = [];
                 var userIdsArr = [];
                 
                 var userNamesArr = [];
                 var departmentNamesArr = [];
                
                var bindIdsArr = []; //当既选择了部门,又选择成员的时候，会有重叠,这个数组是用来保存剔除有重叠部分后的数组
                var bindNamesArr = [];
                 
                 for (var i = 0; i < selectedDepartmentLen; i++) {
                    var department = selectedDepartmentList[i];
                    var departmentId = department.id;    // 已选的单个部门ID
                    var departemntName = department.name;    // 已选的单个部门名称
                    departmentIds+=departmentId+',';
                }
                
                if(selectedDepartmentLen != 0){ //选了某一个部门为整体
	                $.ajax({
	                 	type:"get",
	                 	url:$('#server').val()+"/wx/qyh/meeting/create/ajax/getUserList.json?isSelectAll=false&deptIds="+departmentIds,
	                 	async:true,
	                 	success:function(json){
	                 		if(json.flag){
	             				for(var i=0, len = json.list.length; i<len; i++){
	             					//alert(json.list[i].userId);
	             					departmentIdsArr.push(json.list[i].userId);
	             					departmentNamesArr.push(json.list[i].userName);
	             				}
	             				for (var i = 0; i < selectedUserListLen; i++) { //选择单个成员  
				                     var user = selectedUserList[i];  
				                     var userId = user.id;    // 已选的单个成员ID  
				                     var userName = user.name;    // 已选的单个成员名称  
				                     userIdsArr.push(userId);
				                     userNamesArr.push(userName);
	                            }  
				                 bindIdsArr = deletRepeat(departmentIdsArr,userIdsArr);
				                 bindNamesArr = deletRepeat(departmentNamesArr,userNamesArr);
				                 for (var i=0; i<bindIdsArr.length; i++) {
				                 	userIds+=bindIdsArr[i]+',';
				                 	userNameSpanDom+='<span class="f_16 s_gray f_oflow cyr_span" data-id="'+bindIdsArr[i]+'">'+bindNamesArr[i]+'<i class="del_cyr">&#10008</i></span>';
				                 }
				                 $('#cyrIds').val(userIds);
				                 $('#cyr_peopleNum').html(bindIdsArr.length);
				                 $('#cyr_list').show().html(userNameSpanDom);
				                 if(bindIdsArr.length == 0){
				                 	$('#cyr_list').hide();
				                 }
	             			}else{
	             				alert('出错了');
	             			}
	                 	},
	                 	error:function(XMLHttpRequest, textStatus, errorThrown){
	                 		alert(textStatus);
	                 	}
	                 });
                }else{ //只选择了人的情况
	                for (var i = 0; i < selectedUserListLen; i++) { //选择单个成员  
	                     var user = selectedUserList[i];  
	                     var userId = user.id;    // 已选的单个成员ID  
	                     var userName = user.name;    // 已选的单个成员名称  
	                     userIdsArr.push(userId);
	                     userNamesArr.push(userName);
	                 }  
	                 bindIdsArr = deletRepeat(departmentIdsArr,userIdsArr);
	                 bindNamesArr = deletRepeat(departmentNamesArr,userNamesArr);
	                 for (var i=0; i<bindIdsArr.length; i++) {
	                 	userIds+=bindIdsArr[i]+',';
	                 	userNameSpanDom+='<span class="f_16 s_gray f_oflow cyr_span" data-id="'+bindIdsArr[i]+'">'+bindNamesArr[i]+'<i class="del_cyr">&#10008</i></span>';
	                 }
//	                 alert(userIds);
//	                 alert(bindIdsArr);
//	                 alert(bindNamesArr);
//	                 alert(selectedDepartmentLen);
//	                 alert(departmentIds);
//	                 alert(departmentIdsArr);
//	                 alert(departmentNamesArr);
//	                 alert(userIdsArr);
//	                 alert(userNamesArr);
	                 $('#cyrIds').val(userIds);
	                 $('#cyr_peopleNum').html(bindIdsArr.length);
	                 $('#cyr_list').show().html(userNameSpanDom);
	                 if(bindIdsArr.length == 0){
	                 	$('#cyr_list').hide();
	                 }
                }
             }else{
             	var userIds="";
                var userNameSpanDom = '';
             	$.ajax({
             		type:"get",
             		url:$('#server').val()+"/wx/qyh/meeting/create/ajax/getUserList.json?isSelectAll=true",
             		async:true,
             		success:function(json){
             			if(json.flag){
             				for(var i=0, len = json.list.length; i<len; i++){
             					userIds+=json.list[i].userId+',';
             					userNameSpanDom+='<span class="f_16 s_gray f_oflow cyr_span" data-id="'+json.list[i].userId+'">'+json.list[i].userName+'<i class="del_cyr">&#10008</i></span>';
             				}
             				$('#cyrIds').val(userIds);
			                $('#cyr_peopleNum').html(json.list.length);
			                $('#cyr_list').show().html(userNameSpanDom);
			                if(json.list.length == 0){
			                 	$('#cyr_list').hide();
			                }
             			}else{
             				alert('出错了');
             			}
             		},
             		error:function(XMLHttpRequest, textStatus, errorThrown){
                 		alert(textStatus);
                 	}
             	});
             }
	    })
	});
	}
};

//删除会议发起人和参会人
$('.m_input_list').on('click','.del_cyr',function(){
	var cyr_num = $('#cyr_peopleNum').html();
	var cyr_arr = $('#cyrIds').val().split(',');
	var deleteId = $(this).parent().attr('data-id');
	cyr_arr.remove(deleteId);
	$(this).parent().remove();
	cyr_num--;
	$('#cyr_peopleNum').html(cyr_num);
	$('#cyrIds').val(cyr_arr.join(','));
	if($('.cyr_span').length == 0){
		$('#cyr_list').hide();
	}
});

$('.m_input_list').on('click','.del_fqr',function(){
	var fqr_num = $('#fqr_peopleNum').html();
	var fqr_arr = $('#fqrIds').val().split(',');
	var deleteId = $(this).parent().attr('data-id');
	fqr_arr.remove(deleteId);
	$(this).parent().remove();
	fqr_num--;
	$('#fqr_peopleNum').html(fqr_num);
	$('#fqrIds').val(fqr_arr.join(','));
	if($('.fqr_span').length == 0){
		$('#fqr_list').hide();
	}
});
	   






 
