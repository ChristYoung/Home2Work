(function(){
	     	
      function makeQuestionHtml(questionIndex,questionTagId,questionTitle,allQuestionCount,optionNum,b1,b2,b3,b4,b5) {
       
        var optionHtml = '<ul class="row"><li class="col-xs-2-5" value="1">'+b1+'</li><li class="col-xs-2-5" value="2">'+b2+'</li><li class="col-xs-2-5" value="3">'+b3+'</li><li class="col-xs-2-5" value="4">'+b4+'</li><li class="col-xs-2-5" value="5">'+b5+'</li></ul><input name="question['+questionTagId+']"  type="hidden"/>';

        var html = '<div class="question disabled" question-no="'+questionIndex+'" question-tag="'+questionTagId+'"><h3><span class="question-no"><b>'+questionIndex+'</b>/'+allQuestionCount+'</span><span class="real-title">'+questionTitle+'</span></h3><div class="question-options">'+optionHtml+'</div></div>';
        
        return html;
      }

      function addSectionHeader(title,extraTag) {
        return '<div class="section_header_placeholder" ' + extraTag + '><div class="section_header"><h2>' + title + '</h2></div></div>';
      }

      function in_array(needle, haystack) {
          for(var i in haystack) {
              if(haystack[i] == needle) return true;
          }
          return false;
      }

//    function setQuestionVisibilityByTags(tags, isShow) {
//        $(tags).each(function(i) {
//          if (isShow) {
//            $('div[question-tag="'+tags[i]+'"]').show();
//          } else {
//            $('div[question-tag="'+tags[i]+'"]').find('input').removeAttr('checked');
//            $('div[question-tag="'+tags[i]+'"]').find('li').removeClass('active');
//            $('div[question-tag="'+tags[i]+'"]').hide().attr('class','question disabled');
//          }
//        });
//    }

      $(function(){
        var Questions =  jQuery.parseJSON('[{"tagID":1,"tag":"您精力充沛吗？"},{"tagID":2,"tag":"您容易疲乏吗？"},{"tagID":3,"tag":"您容易气短，呼吸短促，接不上气吗？"},{"tagID":4,"tag":"您说话声音低弱无力吗?"},{"tagID":5,"tag":"您感到闷闷不乐、情绪低沉吗?"},{"tagID":6,"tag":"您容易精神紧张、焦虑不安吗?"},{"tagID":7,"tag":"您因为生活状态改变而感到孤独、失落吗？"},{"tagID":8,"tag":"您容易感到害怕或受到惊吓吗?"},{"tagID":9,"tag":"您感到身体超重不轻松吗?"},{"tagID":10,"tag":"您眼睛干涩吗?"},{"tagID":11,"tag":"您手脚发凉吗?"},{"tagID":12,"tag":"您胃脘部、背部或腰膝部怕冷吗？"},{"tagID":13,"tag":"您比一般人耐受不了寒冷吗？"},{"tagID":14,"tag":"您容易患感冒吗?"},{"tagID":15,"tag":"您没有感冒时也会鼻塞、流鼻涕吗?"},{"tagID":16,"tag":"您有口粘口腻，或睡眠打鼾吗？"},{"tagID":17,"tag":"您容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时)吗?"},{"tagID":18,"tag":"您的皮肤容易起荨麻疹吗? "},{"tagID":19,"tag":"您的皮肤在不知不觉中会出现青紫瘀斑、皮下出吗?"},{"tagID":20,"tag":"您的皮肤一抓就红，并出现抓痕吗?"},{"tagID":21,"tag":"您皮肤或口唇干吗?"},{"tagID":22,"tag":"您有肢体麻木或固定部位疼痛的感觉吗?"},{"tagID":23,"tag":"您面部或鼻部有油腻感或者油亮发光吗?"},{"tagID":24,"tag":"您面色或目眶晦黯，或出现褐色斑块/斑点吗?"},{"tagID":25,"tag":"您有皮肤湿疹、疮疖吗?"},{"tagID":26,"tag":"您感到口干咽燥、总想喝水吗？"},{"tagID":27,"tag":"您感到口苦或嘴里有异味吗?"},{"tagID":28,"tag":"您腹部肥大吗?"},{"tagID":29,"tag":"您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗？"},{"tagID":30,"tag":"您有大便黏滞不爽、解不尽的感觉吗?"},{"tagID":31,"tag":"您容易大便干燥吗?"},{"tagID":32,"tag":"您舌苔厚腻或有舌苔厚厚的感觉吗?"},{"tagID":33,"tag":"您舌下静脉瘀紫或增粗吗？"}]'),
             QuestionTagsWithSepacilOptionName = jQuery.parseJSON('["2","4","5","13"]'), //需要反向计分的问题列表
             currentQuestion = 1,
             allQuestionNum = Questions.length,
             maximumOffset;
        $(Questions).each(function(i){
		    if (in_array(this.tagID,QuestionTagsWithSepacilOptionName))
			  var questionHtml = makeQuestionHtml(i+1,this.tagID,this.tag,allQuestionNum,4,'总是','经常','有时','很少','没有');
			else
			  var questionHtml = makeQuestionHtml(i+1,this.tagID,this.tag,allQuestionNum,4,'没有','很少','有时','经常','总是');

		  if(i == 0)
			$('#questions').append(addSectionHeader('请根据您最近一年的体验和感觉回答',''));
            $('#questions').append(questionHtml);
        });

        $('#questions').find('.question[question-no="1"]').removeClass('disabled');      /*初始化*/
        $('#questions').find('.question[question-no="1"]').addClass('active');           

        //CLICK OPTION!
        $(".question-options li").on('click',function() {
          //控制题目显示状态
          if ($(this).parents('.question').attr('question-no') == currentQuestion)
          {
            $(this).parents('.question').attr('class','question normal');

            if (currentQuestion < allQuestionNum) {
              $('#questions').find('[question-no="'+(currentQuestion+1)+'"]').attr('class','question active');
              $(window).scrollTop($('#questions').find('[question-no="'+(currentQuestion+1)+'"]').offset().top-60);
              $('body').find('.section_header').removeClass('fixed');
              $(this).parents('.question').prev('.section_header').addClass('fixed');
            };
            
            currentQuestion++;
          };
          //操作选项
          var thisTag = $(this).parents('.question').attr('question-tag');
          $('input[name="question['+thisTag+']"]').attr("value",$(this).attr("value"));
          
          $(this).parent().find('li').removeClass('active');
          $(this).addClass('active');
          maximumOffset = $('.basicinfo-container').offset().top - 70;
        });

        $(".question-options li").on('tap',function() {
          $(this).css('background','#E57990');
        });

        $(".dontknow").on('tap',function() {
          $(this).css('background','#AAA');
        });

        //提交，检测表单完成情况
        $('#submitButton').click(function(){
          var alreadyTested = $('#questions').find('input[value]').length;
          var isErrorComing = false;

          //答题完成度检测
          if (alreadyTested < allQuestionNum && !isErrorComing) {
            if (alreadyTested == 0) {
              $(window).scrollTop($('.question:first').offset().top);
              alert('请先完成测试再提交！');
            } else {
              $(window).scrollTop($('#questions').find('.question[question-no="'+(currentQuestion-1)+'"]').offset().top);
              alert('你还有题目尚未回答！');
            }
            isErrorComing = true;
          }

          if (isErrorComing == true) {
            return false;
          }else{
          	 var pinghe = 0;
          	 var qixu = 0;
          	 var yangxu = 0;
          	 var yinxu = 0;
          	 var tanshi = 0;
          	 var shire = 0;
          	 var xueyu = 0;
          	 var qiyu = 0;
          	 var tebing = 0;
          	 var arr=[];
          	 var address=['pinghe.htm','qixu.htm','yangxu.htm','yinxu.htm','tanshi.htm','shire.htm','xueyu.htm','qiyu.htm','tebing.htm'];
          	 var arrStatus=['pinghezhi','qixuzhi','yangxuzhi','yinxuzhi','tanshizhi','shirezhi','xueyuzhi','qiyuzhi','tebingzhi'];
          	 var majorStatus='';        //主体质
          	 var minorStatus='';        //倾向体质
          	 var andStatus='';          //兼有体质
          	 var _normal = true;
             for(var a=2; a<=9; a++){
          	   	   pinghe+=parseInt($('input[name="question['+a+']"]').val());
          	 }
             
             for(var b=10; b<=15;b++){
             	   qixu+=parseInt($('input[name="question['+b+']"]').val());
             }
             
             for(var c=16;c<=21;c++){
             	   yangxu+=parseInt($('input[name="question['+c+']"]').val());
             }
             
             for(var d=22;d<=29;d++){
             	  yinxu+=parseInt($('input[name="question['+d+']"]').val());
             }
             
             for(var e=30;e<=37;e++){
             	tanshi+=parseInt($('input[name="question['+e+']"]').val());
             }
             
             for(var f=38;f<=43;f++){
             	shire+=parseInt($('input[name="question['+f+']"]').val());
             }
             
             for(var g=44;g<=50;g++){
             	xueyu+=parseInt($('input[name="question['+g+']"]').val());
             }
             
             for(var h=51;h<=57;h++){
             	qiyu+=parseInt($('input[name="question['+h+']"]').val());
             }
             
             for(var i=58; i<=64;i++){
             	tebing+=parseInt($('input[name="question['+i+']"]').val());
             }
             
             var z_pinghe =Math.round(((pinghe-8)/32)*100);
             var z_qixu =Math.round(((qixu-6)/24)*100);
             var z_yangxu =Math.round(((yangxu-6)/24)*100);
             var z_yinxu =Math.round(((yinxu-8)/32)*100);
             var z_tanshi =Math.round(((tanshi-8)/32)*100);
             var z_shire =Math.round(((shire-6)/24)*100);
             var z_xueyu =Math.round(((xueyu-7)/28)*100);
             var z_qiyu = Math.round(((qiyu-7)/28)*100);
             var z_tebing =Math.round(((tebing-7)/28)*100);
             
             arr.push(z_pinghe,z_qixu,z_yangxu,z_yinxu,z_tanshi,z_shire,z_xueyu,z_qiyu,z_tebing);   //将得到的转换分保存到数组中
//           alert(arr);
             function find_array(needle, haystack) {                                     //该方法用于 寻找某个数据在指定数组中的位置
				          for(var i=0; i<haystack.length; i++) {
				              if(haystack[i] == needle){
				              	return i;
				              };
				          }
	             }
                    
				 if(arr[0]>=60){                                                       
		               arr.splice(0,1);                                   //先把平和质数据在数组中删掉，判断剩下的8个数据
		               if(Math.max.apply(Math,arr)<30){                   //如果剩下的8个数据的最大值都小于30的话，那么其他的肯定都小于30，判定为最合格的平和质!
		               	  majorStatus = arrStatus[0];
		               	  minorStatus='';
		               	  andStatus='';
		               }else if(Math.max.apply(Math,arr)<40 && Math.max.apply(Math,arr)>=30){      //判定为平和质并有某偏颇质倾向
		               	   for(var i=0; i<arr.length; i++){
		               	   	    if(arr[i]>=30 && arr[i]<40){
		               	   	    	minorStatus+=arrStatus[i+1];
		               	   	    }
		               	   }
		               	   andStatus='';
		               	   majorStatus = arrStatus[0];
		               }else{                                                    //虽然平和质大于60，但是有偏颇体质大于40，那么主体质就不再是平和质
		               	    var oloca1 = find_array(Math.max.apply(Math,arr),arr);         
		               	    majorStatus = arrStatus[oloca1+1];
		               	    arr.splice(oloca1,1);                                //找到偏颇质大于40的数据中的最大值，将他判定为主体质
		               	    for(var m=0; m<arr.length; m++){
		               	    	if(arr[i]>=30 && arr[i]<39){
		               	    	  if(i>=oloca1){
		               	    	  	minorStatus+=arrStatus[i+2];
		               	    	  }else{
		               	    	  	minorStatus+=arrStatus[i+1];
		               	    	  }
		               	    		
		               	    	}else if(arr[i]>=40){
		               	    		if(i>=oloca1){
		               	    		  andStatus+=arrStatus[i+2];
		               	    		}else{
		               	    		  andStatus+=arrStatus[i+1];	
		               	    		}
		               	    		
		               	    	}
		               	    }
		               }
		             	
	             }else{
	             	   arr.splice(0,1);                     //如果平和质转化分小于60，那就不可能是平和质，将其在数组中去掉，然后判断剩下的8个数据
	             	   if(Math.max.apply(Math,arr)>=40){
	             	   	  var oLoca = find_array(Math.max.apply(Math,arr),arr);
	             	   	  majorStatus = arrStatus[oLoca+1];
	             	   	  arr.splice(oLoca,1);
	             	   	  for(var i=0; i<arr.length; i++){
	             	   	  	 if(arr[i]>=30 && arr[i]<39){
	             	   	  	 	if(i>=oLoca){
	             	   	  	 		minorStatus+=arrStatus[i+2];
	             	   	  	 	}else{
	             	   	  	 		minorStatus+=arrStatus[i+1];
	             	   	  	 	}
	             	   	  	 	
	             	   	  	 }else if(arr[i]>=40){
	             	   	  	 	if(i>=oLoca){
	             	   	  	 		andStatus+=arrStatus[i+2];
	             	   	  	 	}else{
	             	   	  	 		andStatus+=arrStatus[i+1];
	             	   	  	 	}
	             	   	  	 	
	             	   	  	 }
	             	   	  }
	             	   }else{                                 //如果平和质不大于60分，又没有任何偏颇质大于40分，判定为不科学
	             	   	 alert('您提交的答案不科学，请刷新后重新作答!');
	             	   	 _normal = false;
	             	   }
	             }
	              
          }
//                alert(majorStatus);
//				  alert(andStatus);
//				  alert(minorStatus);
				  if(_normal){
				  	window.location.href=address[find_array(majorStatus,arrStatus)]+'?'+'jianyou='+andStatus+'&'+'qingxiang='+minorStatus+'&'+'logtype=wxbase';
				  }
				  
	          //if everything is fine, submit the form.
	        // $('#questionForm').appendTo($("body")).submit();
        });

        minimumOffset = $('.section_header').first().offset().top;

        $(window).scroll(function(event){
			maximumOffset = $('.option-container').offset().top - 70;
            var currentScrollTop = $(this).scrollTop();
            if (currentScrollTop < minimumOffset || currentScrollTop > maximumOffset) {
              $('body').find('.section_header').removeClass('fixed');
            } else {
              $('.section_header:visible').each(function(){
                if(currentScrollTop >= $(this).offset().top) {
                  if(!$(this).hasClass('fixed')) {
                    $('body').find('.section_header').removeClass('fixed');
                    $(this).addClass('fixed');
                  }
                }
              });
            }
        });
      });
})();
