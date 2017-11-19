$(function(){
	      	 //搜索框文字切换
	      	 (function(){
					var aLi=$('#menu li');
					var oText=$('#search').find('.form .text');
					var arrText=[
						'例如：荷塘鱼坊烤鱼 或 樱花日本料理',
						 '例如：昌平区育新站龙骑广场2号楼609室',
						'例如：万达影院双人情侣券',
						'例如：东莞出事了，大老虎是谁？',
						'例如：北京初春降雪，天气变幻莫测',
					];
					var iNow=0;
					oText.val(arrText[iNow]);            //文本框的初始化
					aLi.each(function(index){
						$(this).click(function(){
							//console.log(index);
							aLi.attr('class','gradient');
							$(this).attr('class', 'active');
							iNow=index;
							oText.val(arrText[iNow]); 
						});
					});
					
					oText.focus(function(){
						//console.log(arrText[iNow]);           //当文本框得到焦点时可以获取到文本框的内容
						if($(this).val()==arrText[iNow]){
							$(this).val('');
						};
					});
					oText.blur(function(){
						if($(this).val()==''){
							oText.val(arrText[iNow]); 
						}
					});
				})();
			   
			   
			    //update文字滚动
			    (function(){
			    	var oUl = $(".update ul");
			    	var arrData=[
                      {'name':'芝芝', 'time':4, 'title':'我的爱情在哪'},
					  {'name':'畅畅', 'time':5, 'title':'广东三天抓获涉黄嫌犯'},
					  {'name':'芳芳', 'time':6, 'title':'国台办回应王玉琪'},
					  {'name':'东东', 'time':7, 'title':'那些永远忘不掉的电商1班'},
					  {'name':'戴戴', 'time':8, 'title':'岁月静好'},
					  {'name':'小小', 'time':9, 'title':'只是当时已惘然'},
			          {'name':'杰杰', 'time':10, 'title':'落霞与孤鹜齐飞'},
			          {'name':'洋洋', 'time':10, 'title':'秋水共长天一色'}
					];
					var str = '';
					var iNow = 0;
					var iTimer = null;
					for(var i=0; i<arrData.length; i++){
						str+='<li><a href="#"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span>写了一篇新文章:'+arrData[i].title+'...</a></li>';  			
					}
					oUl.html(str);
			    	var ih = oUl.find('li').height();
//					oUl.animate({'top':-ih},2000);
                    $("#updateUpBtn").click(function(){
                    	doMove(-1);
                    });
                    
                    $("#updateDownBtn").click(function(){
                    	doMove(1);
                    });
                    
                    function doMove(s){
                    	iNow+=s;
                    	if(Math.abs(iNow)>arrData.length-1){
                    		iNow = 0;
                    	}else if(iNow>0){
                    		iNow = -(arrData.length-1);
                    	}
                    	oUl.stop().animate({'top':ih*iNow},1000);    //每次点击时要停掉之前的运动,防止多次点击出现混乱
                    }
                    
                    function autoPlay(){
                    	iTimer = setInterval(function(){
                    		doMove(-1);
                    	},1200);
                    }
                    autoPlay();
                    
                    $(".update").hover(function(){
                    	clearInterval(iTimer);
                    },autoPlay)
			    })();
	      });