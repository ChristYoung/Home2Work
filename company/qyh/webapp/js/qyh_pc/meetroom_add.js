//添加设备
$('#add_eq').click(function(){
	var win = new Window().prompt({
		title:'请输入设备名称',
		handler4PromptBtn:function(v){
			if(v != ''){
		      $('.eq_wp').append('<label class="eq_i textoveflow" title="'+v+'"><input type="checkbox" name="device" id="" value="'+v+'" /><span class="eq_name">'+v+'</span></label>');
	       }
		}
	});
});

//图片上传时预览
function previewImg(){
	var f = getFileInfo('#uploadImg');
	if(f.extName != ''){
		if(f.extName == 'svg' || f.extName == 'psd' || f.extName == 'swf' || f.extName == 'tiff' && f.extName == 'wmf'){
			$(this).parent().siblings('.errorcon').html('平台暂不支持该格式文件上传，请使用（JPG.PNG）格式重新上传');
	        $('#uploadImg').val('');
	        return;
		};
		
		if(f.extName != 'jpg' && f.extName != 'jpeg' && f.extName != 'png' && f.extName != 'bmp' && f.extName != 'gif'){
			$(this).parent().siblings('.errorcon').html('导入失败，请选择图片文件重新导入');
	        $('#uploadImg').val('');
	        return;
		}else{
			$(this).parent().siblings('.errorcon').html(''); //图片格式正确,删除格式错误的提示信息
		};
	}else{
		return;
	};
	
	if(window.FileReader){
		var path = this.value,
        reader = new FileReader(),
        files = this.files[0],
        size = files.size;
        if(parseInt(size)>2097152){
        	$(this).parent().siblings('.errorcon').html('上传图片大小不要超过2M');
        	return;
        };
	    reader.onload = function(e){
	    	if($('#default')[0] !=null){
	    		$('#default')[0].src = e.target.result;
	    	}
	    	if($('#previewImg')[0] !=null){
	    		$('#previewImg')[0].src = e.target.result;
	    	}
	    	
	    };
	    reader.readAsDataURL(files);
	}else{
		alert('您的浏览器版本太低,不支持图片预览,请升级您的浏览器');
	}
};
$('#uploadImg').on('change',function(){
	previewImg.call(this);
});

//表单验证
$('#meetForm').submit(function(){
	if(!$('#roomName').validator({errContainer:$('.errorcon').eq(0),required:true,requiredMsg:'会议室名称不能为空'})
	  ||!$('#roomContainer').validator({errContainer:$('.errorcon').eq(1),required:true,requiredMsg:'可容纳人数不能为空',testType:'onlyNum',errorTips:'容纳人数需要在2人以上（包含2人）',minVal:2,valMsg:'容纳人数需要在2人以上（包含2人）'})
	  ||!$('#roomAddress').validator({errContainer:$('.errorcon').eq(3),required:true,requiredMsg:'会议室地址不能为空'})){
		return false;
	}
});
