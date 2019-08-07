/*
 * login.jsp页面请勿调用这个JS文件
 */
function setMainBodyHeight(){
	function f(){
		var h = $(window).height() - $('#header').outerHeight();
		if($('#main_body').outerHeight() < h){
			$('#main_body').css({'min-height': h});
		}
	}
	$(window).on('resize', f);
	f();
}

function bindSideMenu(){
	$('#side_menu dl dt').on('click', function(){
		if(!$(this).parent().hasClass(('active'))){
			
			$('#side_menu dl dd').filter(':animated').stop(true, true);
			$('#side_menu dl').filter('.active').find('dd').css('display', 'block').slideUp(300).parent().removeClass('active');
			$(this).next('dd').slideDown(300).parent().addClass('active');
		}else{
			$(this).next('dd').css('display', 'block').slideUp(300).parent().removeClass('active');
		}
		
		
		$('.m_xxx_ul').animate({"height":0},300);
		
	});
	
	//三级菜单8.31添加 #

	$('.m_xxx').each(function(i){
		$(this).on('click', function(){
			$(this).addClass('on3').siblings().removeClass('on3')
			if($(this).next('ul').height()==0){
				var $ul_li_length= $(this).next('ul').find('li').length
				$(this).parent().find('ul').eq(i).animate({"height":$ul_li_length*30},300).siblings('ul').animate({"height":0},300)
				$(this).find('.m_xxx_span3').addClass('on5').parent().siblings('.m_xxx').find('.m_xxx_span3').removeClass('on5')
				$(this).find('.m_xxx_span1').addClass('on6').parent().siblings('.m_xxx').find('.m_xxx_span1').removeClass('on6')
			}else{
				$(this).next('ul').animate({"height":0},300);
				$(this).removeClass('on3')
				$(this).find('.m_xxx_span3').removeClass('on5')
				$(this).find('.m_xxx_span1').removeClass('on6')
			}
		});
		$(this).on('mouseenter',function(){
			$(this).addClass('on2')
			$(this).find('.m_xxx_span1').addClass('on4')
			$(this).find('.m_xxx_span3').addClass('on4')
		})
		$(this).on('mouseleave',function(){
			$(this).removeClass('on2')
			$(this).find('.m_xxx_span1').removeClass('on4')
			$(this).find('.m_xxx_span3').removeClass('on4')
		})
	})
	
	
}

function setSideMenu(menuID, subMenuID){
	$(menuID).find('dt').trigger('click');
	$(subMenuID).addClass('active');
}

function setThirdSideMenu(menuID, subMenuID,thirdMenuID){
	$(menuID).find('dt').trigger('click');
	$(subMenuID).trigger('click');
	$(thirdMenuID).addClass('active');
}

function getFileInfo(file){
	var fileInfo = {};
	fileInfo.path = $(file).val();
	if(fileInfo.path.lastIndexOf('\\') != -1){
		fileInfo.name = fileInfo.path.substr(fileInfo.path.lastIndexOf('\\') + 1, fileInfo.path.length - 1);
	}else{
		fileInfo.name = fileInfo.path;
	}
	fileInfo.extName = fileInfo.name.substr(fileInfo.name.lastIndexOf('.') + 1 , fileInfo.name.length - 1).toLowerCase();
	return fileInfo;
}

function showFileName(file, showObj){
	var fileInfo = getFileInfo(file);
	$(showObj).html(fileInfo.name);
}
$(function(){
	setMainBodyHeight();
	bindSideMenu();
	
	//bindEditPasswordEvent();//绑定修改头部密码框事件
	
	//selectedAuto();
	
});

function selectedAuto(){
	
	/*
	 * 如果级联下拉，有权限的时候，对应的第一个值可能不是全部。这个时候要加载next下拉是数据
	 * 张威 
	 */
	var insitutesSelect = $('#instituteslist');
	var majorslistSelect = $('#majorslist');
	var isAuto = false;//是否加载
	if(insitutesSelect!=null && typeof(insitutesSelect.val())!="undefined"){
		isAuto = true;
	}
	if(majorslistSelect!=null && typeof(majorslistSelect.val())!="undefined"){
		isAuto = true;
	}
	
	if(isAuto){
		$('#instituteslist').trigger('change');
		//专业下拉的数据加载
		
		var classtypelistSelect = $('#classtypelist');
		//比如查询的时候。做一些自动选中操作
		var selected_institutes = $("#selected_institutes").val();
		var selected_majors = $("#selected_majors").val();
		var selected_enrolYear = $("#selected_enrolYear").val();
		var selected_class = $("#selected_class").val();
		if(selected_institutes!=""){
			insitutesSelect.find("option[value="+selected_institutes+"]").prop("selected", "selected");
		}
		if(selected_majors!=""){
			majorslistSelect.find("option[value="+selected_majors+"]").prop("selected", "selected");
		}
		if(majorslistSelect!=null && majorslistSelect.val()!=null && majorslistSelect.val()!="" ){
			$('#majorslist').trigger('change');
			if(selected_enrolYear!=""){
				classtypelistSelect.find("option[value="+selected_enrolYear+"]").prop("selected", "selected");
			}
			//入学年份的数据加载
			if(classtypelistSelect!=null &&	classtypelistSelect.val()!=rblanguage.oldpage.new36 && classtypelistSelect.val()!="" ){
				$('#classtypelist').trigger('change');
				if(selected_class!=""){
					$("#classlist option[value='"+selected_class+"']").prop("selected", "selected");//$('#classlist option[value="+selected_class+"]")
				}

			}else{
				$('#classlist').hide();
			}
			
		}else{
			$('#classtypelist').hide();
			$('#classlist').hide();
		}
		
		if($('#classtypelist option').size()==0){
			$('#classtypelist').hide();
		}
	}
}

//UEditor自定义配置项
var myUEditorOptions = {
	//关闭字数统计
	wordCount: false,
	//关闭elementPath
	elementPathEnabled: false,
	//关闭自动长高
	autoHeightEnabled: false,
	//自定义工具栏
	toolbars: [[
        'fullscreen', 'source', '|', 'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'fontsize', '|',
        'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'link', 'unlink', '|',
        'simpleupload', '|',
        'preview', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deletecol', 'insertcol', 'mergecells'
    ]]
};








//JS命名空间
educationPay = {};

educationPay.desktop = {};

educationPay.desktop.public = {};

educationPay.desktop.public.zIndex = 10000;

//信息提示插件（自动关闭）
educationPay.desktop.autoMsg = function(options){
	if(educationPay.desktop.autoMsg.isOpen) return;
	
	educationPay.desktop.autoMsg.isOpen = true;
	
	this.options = {
		'type': 'success', //支持三种类型：success成功信息、error失败信息、warning警告信息
		'msg': rblanguage.oldpage.new37,
		'fade': true,
		'fadeSpeed': 300,
		'delay': 3000,
		'callBack': function(){},
		'bgColor': {
			'success': '#00a65a',
			'error': '#dd4b39',
			'warning': '#dd4b39'
			//'warning': '#f39c12'
		}
	};
	
	if(typeof(options) == 'object')
		for(var x in options)
			this.options[x] = options[x];
	
	this.obj = $('<div>');
	this.obj.css({
		'display': 'none',
		'position': 'fixed',
		'bottom': '0',
		'left': '0',
		'zIndex': ++ educationPay.desktop.public.zIndex,
		'boxSizing': 'border-box',
		'width': '100%',
		'height': '50px',
		'backgroundColor': this.options.bgColor[this.options.type],
		'boxShadow': '0 0 10px #666',
		'fontSize': '24px',
		'fontWeight': 'bold',
		'color': '#fff',
		'lineHeight': '50px',
		'textAlign': 'center'
	}).html(this.options.msg).appendTo($('body').first());
	
	if(this.options.fade)
		this.obj.fadeIn(this.options.fadeSpeed);
	else
		this.obj.show();
	
	var oThis = this;
	function close(){
		if(oThis.obj){
			function closeFun(){
				oThis.obj.remove();
				oThis.obj = null;
				educationPay.desktop.autoMsg.isOpen = false;
				oThis.options.callBack();
			}
			if(oThis.options.fade)
				oThis.obj.fadeOut(oThis.options.fadeSpeed, function(){closeFun();});
			else
				closeFun();
		}
	}
	
	setTimeout(function(){close();}, this.options.delay);
}
educationPay.desktop.autoMsg.isOpen = false;
autoMsg = educationPay.desktop.autoMsg;

//格式化日期
Date.prototype.format = function(){
	var _year = this.getFullYear(),
	    _month = this.getMonth()+1<10?'0'+(this.getMonth()+1):this.getMonth()+1,
	    _date = this.getDate()<10?'0'+this.getDate():this.getDate();
	return _year+'/'+_month+'/'+_date;    
};







//查询四级联动
function searchChangeLink(server,obj){
	
//	$("#paytopersonname").val("");
//	$("#paymentCode").val("");
    var tag = obj.attr('tag');
    if(tag == '0'){
    	var majorValue=$("#majorslist").val();
        for(var i=1; i<4; i++){
            $('select[tag="'+i+'"]').hide();
            $('select[tag="'+i+'"]').find('option').remove();
        }
        //如果是查询缴费码人群
        if(obj.val() == "paymentCode_value"){
        	$("#paytopersonname").hide();
        	$("#paymentCode").show();
        	return;
        }else{
        	$("#paymentCode").hide();
        	$("#paytopersonname").hide();
        }
        
      //如果是自定义收费对象
        if(obj.val() == "zdypayitem"){
        	$("#paymentCode").hide();
        	$("#paytopersonname").show();
        	return;
        }else{
        	$("#paymentCode").hide();
        	$("#paytopersonname").hide();
        }
        
        if(obj.val() == ''||obj.val()=="zdypayitem"||obj.val()=="zsjepayitem"){
        	$("#only_query_new_student").show();//这个为了控制学生列表页面中搜索是否显示“仅显示新生”
        	return;
        }else{
        	$("#only_query_new_student").hide();
        	$("#only_query_new").attr("checked",false);
        }
       
        $.ajax({
            type:"post",
            dataType : "json",
            url:server+"ed/schpayItem/getschmajors",
            async:false,
            data:{"institutesid" : obj.val()},
            success:function(json){
                var majorsList = json.majors,
                    enrolYearList = json.enyears,
                    opt_year = '',
                    opt_major = '';
                if(majorsList.length != 0){
                    for(var i=0; i<majorsList.length; i++){
                    	if(majorValue==majorsList[i].majorUid)
                		{
                		opt_major+='<option value="'+majorsList[i].majorUid+'" selected="selected">'+majorsList[i].majorName+'</option>';
                		}
                	else
                		{
                		opt_major+='<option value="'+majorsList[i].majorUid+'">'+majorsList[i].majorName+'</option>';
                		}
                    }
                    $('#majorslist').find('option').remove();
                    $('#majorslist').show().append($(opt_major));
                    
                    if(majorsList.length == 1){
                    	$('#majorslist').trigger('change');
                    }
                    
                }else{
                    for(var i=0; i<enrolYearList.length; i++){
                    	if(enrolYearList[i].enrolYear=='全部入学年份'){
                    		opt_year+='<option value="">'+enrolYearList[i].enrolYear+'</option>';
                    	}else{
                    		opt_year+='<option value="'+enrolYearList[i].enrolYear+'">'+enrolYearList[i].enrolYear+'</option>';
                    	}
                        
                    }
                    $('#majorslist').hide();
                    $('#classtypelist').find('option').not('option[value=""]').remove();
                    $('#classtypelist').show().append($(opt_year));
                }
            },
            error:function(){
            	new autoMsg({'type': 'error', 'msg': rblanguage.oldpage.new07});
                setTimeout(function(){
      				location.href = server + 'login.jsp';
      			}, 2000);
            }
        });
    }else if(tag == '1'){
    	var enrolYearValue=$("#classtypelist").val();
        for(var i=2; i<4; i++){
            $('select[tag="'+i+'"]').hide();
            $('select[tag="'+i+'"]').find('option').remove();
        }
        if(obj.val() == ''){return;};
        $.ajax({
            type:"post",
            dataType : "json",
            url:server+"ed/schpayItem/getschclasstypelist",
            async:false,
            data:{"institutesid" : $('#instituteslist').val(),"majorid":obj.val()},
            success:function(json){
                     opt_year = '';
                     for(var i=0; i<json.length; i++){
                    	 if(enrolYearValue==json[i].enrolYear)
                		 {
                    			 opt_year+='<option value="'+json[i].classUid+'" selected="selected">'+json[i].enrolYear+'</option>';
                		
                		 }
                	 else
                		 {
                			 opt_year+='<option value="'+json[i].classUid+'">'+json[i].enrolYear+'</option>';
                		 }
                     }
                     $('#classtypelist').find('option').not('option[value=""]').remove();
                     $('#classtypelist').show().append($(opt_year));
                     if(json.length == 1){
                     	$('#classtypelist').trigger('change');
                     }else if(json.length == 0){
                    	 $('#classtypelist').hide();
                     }
                     
            },
            error:function(){
            	new autoMsg({'type': 'error', 'msg': rblanguage.oldpage.new07});
                setTimeout(function(){
      				location.href = server + 'login.jsp';
      			}, 2000);
            }
        });
    }else if(tag == '2'){
    	var classValue=$('#classlist').val();
        for(var i=3; i<4; i++){
            $('select[tag="'+i+'"]').hide();
            $('select[tag="'+i+'"]').find('option').remove();
        }
        if(obj.val() == ''){return;};
        $.ajax({
            type:"post",
            dataType : "json",
            url:server+"ed/schpayItem/getschclasstypelist",
            async:false,
            data:{"institutesid" : $('#instituteslist').val(),"majorid":$('#majorslist').val(),"enrolYear":obj.val()},
            success:function(json){
                     opt_classes = '';
                     for(var i=0; i<json.length; i++){
                    	 if(classValue==json[i].classUid)
                		 {
                		 opt_classes+='<option value="'+json[i].classUid+'" selected="selected">'+json[i].className+'</option>';
                		 }
                	 else
                		 {
                		 opt_classes+='<option value="'+json[i].classUid+'">'+json[i].className+'</option>';
                		 }
                     }
                     if(json.length == 0){
                    	 $('#classlist').hide();
                     }else{
                    	 $('#classlist').find('option').remove();
                         $('#classlist').show().append($(opt_classes));
                     }
                     
            },
            error:function(){
            	new autoMsg({'type': 'error', 'msg': rblanguage.oldpage.new07});
                setTimeout(function(){
      				location.href = server + 'login.jsp';
      			}, 2000);            }
        });
    }
};

 //全选
			$.fn.checkAll = function(options){
				var me = this;
				var Len = options.length;
				this.on('click',function(){
					options.prop('checked',$(this).prop('checked'));
				});
				options.on('click',function(){
					me.prop('checked',options.filter(':checked').length == Len?true:false);
				});
				return this;
			};