//Javascript Document

function id(obj){                               //获取id的方法
	return document.getElementById(obj);
};

function eventBind(obj,ev,fn){                 //事件绑定的方法
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent('on'+ev,function(){
			fn.call(obj);
		})
	}
};

function view(){                              //获取可视区域的宽高的方法
	return {
		w:document.documentElement.clientWidth,
		h:document.documentElement.clientHeight
	}
};

function addClass(obj,newClass){             //添加class方法
	var nowClass = obj.className.split(' '),
	    nowClassLen = nowClass.length;
	
	if(!obj.className){
		obj.className = newClass;
		return;
	}
	
	for(var i=0; i<nowClassLen; i++){
		if(nowClass[i] === newClass){return}
	}
	
	obj.className+=' '+newClass;
};

function removeClass(obj,removeClass){          //删除class的方法
	var nowClass = obj.className.split(' '),
	    nowClassLen = nowClass.length;
	
	if(!obj.className){return}
	
	for(var i=0; i<nowClassLen; i++){
		if(nowClass[i] === removeClass){
			nowClass.splice(i,1);
			obj.className = nowClass.join(' ');
			break;
		}
	}
}; 

function fnLoad(){                            //页面预加载
   var oWelcome = id('welcome'),
       iTime = new Date().getTime(),
       bImgLoad = true,     //判断图片是否全部加载完
       bTime = false;        //判断入场动画是否全部加载完
       
       eventBind(oWelcome,'transitionEnd',end);  //动画执行完毕后执行的方法
       eventBind(oWelcome,'webkitTransitionEnd',end);
       
       function end(){   //oWelcome动画执行完毕后,经它的pageShow属性去掉
       	  removeClass(oWelcome,'pageShow');
       	  fnTab();
       }
       
       
	   var oItime = setInterval(function(){
		       	  if(new Date().getTime() - iTime >=5000){   //动画加载的时间是5s,当满足这个if条件时,说明动画全部加载完了,做这样的判断是防止入场动画还没走完,页面就已经加载完了,一定要保证入场动画的完整性
		       	  	bTime = true;
		       	  }
		       	  if(bImgLoad && bTime){
		       	     clearInterval(oItime);
		       	     oWelcome.style.opacity = 0;
		          }
	       },1000)
//     for(var i=0; i<arr.length; i++){
//		     	var oImg = new Image();
//		     	oImg.src = arr[i];
//		     	oImg.onload = function(){
//		     		
//		     	}
//      }
};


function fnTab(){                //图片切换
	var oTab = id('tabPic'),
	    oList = id('picList'),
	    aA = oTab.getElementsByTagName('a'),
	    iNow = 0,
	    iX = 0,
	    iStartTouchX = 0,  //点击时手指相对于屏幕的坐标
	    iStartX = 0,    
	    iW = view().w;
	    iTimer = null;
	    
	function autoPlay(){
		 iTimer = setInterval(function(){
			iNow++;
			iNow%=aA.length;
			tab();
	    },3500);
	}
	autoPlay();
    fnScore();
    eventBind(oTab,'touchstart',fnStart);
    eventBind(oTab,'touchmove',fnMove);
    eventBind(oTab,'touchend',fnEnd);
    function fnStart(ev){
    	ev = ev.changedTouches[0];   //表示触发当前touch事件的手指列表
    	iStartTouchX = ev.pageX;
    	iStartX = iX;
    	clearInterval(iTimer);
    }
    function fnMove(ev){
    	ev = ev.changedTouches[0];
    	var iDis = ev.pageX - iStartTouchX; //手指移动的距离
        iX = iStartX+iDis;
        oList.style.webkitTransform = oList.style.transform = 'translateX('+iX+'px)';
    }
    function fnEnd(){
    	 iNow = iX/iW; 
    	 iNow = -Math.round(iNow); 
    	 if(iNow<0){
    	 	iNow = 0;
    	 }else if(iNow>aA.length-1){
    	 	iNow = aA.length-1;
    	 }
    	 tab();
    	 autoPlay();
    }
    
    function tab(){
    	iX = -iNow*iW;
    	oList.style.webkitTransform = oList.style.transform = 'translateX('+iX+'px)';
    
        for(var i=0; i<aA.length; i++){
        	removeClass(aA[i],'active');
        	addClass(aA[iNow],'active');
        }
    }
};


function fnScore(){        //评分  
	var oScore = id('score'),
	    aLi = oScore.getElementsByTagName('li'),
        arr = ['好失望','没有那么好','很一般','良好','棒极了'];
	    for(var i=0; i<aLi.length; i++){
	    	fn(aLi[i]);
	    };
	    
	    function fn(oLi){
	    	var aNav = oLi.getElementsByTagName('a');
	    	var oInput = oLi.getElementsByTagName('input')[0];
	    	for(var i=0; i<aNav.length; i++){
	    		aNav[i].index = i;
	    		eventBind(aNav[i],'touchstart',function(){
	    			for(var i=0; i<aNav.length; i++){
	    				if(i<=this.index){
	    					addClass(aNav[i],'active');
	    				}else{
	    					removeClass(aNav[i],'active');
	    				}
	    			}
	    			oInput.value = arr[this.index];
	    		})
	    	}
	    }
	    fnIndex();   //评分之后调用表单验证
};

function fnInfo(oInfo,sInfo){           //提交时弹出提示信息
	oInfo.innerHTML = sInfo;
	oInfo.style.webkitTransform = 'scale(1)';
	oInfo.style.opacity = 1;
	setTimeout(function(){
		oInfo.style.webkitTransform = 'scale(0)';
	    oInfo.style.opacity = 0;
	},1500);
}

function fnIndex(){         //首页表单验证
	var oIndex = id('indexPage'),
	    obtn = oIndex.getElementsByClassName('btn')[0],
	    oInfo = oIndex.getElementsByClassName('subInfo')[0];
	    
	    eventBind(obtn,'touchend',fnEnd);
	    
	    function fnEnd(){
	    	if(fnScoreCheck()){
	    		if(!bTag()){
	    			fnInfo(oInfo,'给景区添加标签')
	    		}else{
	    			IndexOut();
	    		}
	    	}else{
	    		fnInfo(oInfo,'给景区评分');
	    	}
	    }
	    function fnScoreCheck(){  //判断是否进行了评分
	    	var oScore = id('score'),
	    	    aInput = oScore.getElementsByTagName('input');
	    	    for(var i=0; i<aInput.length; i++){
	    	    	if(aInput[i].value == 0){
	    	    		return false;
	    	    	}
	    	    }
	    	    return true;
	    }
	    function bTag(){     //判断是否给景区加上了标签
	    	var viewTags = id('viewTags'),
	    	    aCheck = viewTags.getElementsByTagName('input');
	    	    for(var i=0; i<aCheck.length; i++){
	    	    	if(aCheck[i].checked){
	    	    		return true;
	    	    	}
	    	    }
	    	    return false;
	    }
}

function IndexOut(){       //首页的退出
	oMask = id('mask');
	oNews = id('news');
	addClass(oMask,'pageShow');
	addClass(oNews,'pageShow');
	setTimeout(function(){      //因为oMask突然由display:none变成display:block,这个渲染的过程opacity的transition是不起效果的,所以用定时器延迟一下
		 oMask.style.opacity = 1;
	},20);
	setTimeout(function(){      //遮罩层显示3秒钟
		oMask.style.opacity = 0;
		removeClass(oMask,'pageShow');
		oNews.style.opacity = 1;
	},3000);
}

function fnNews(){
	var oNews = id('news');
	var oInfo = oNews.getElementsByClassName('subInfo')[0];
	var aInput = oNews.getElementsByTagName('input');
	aInput[0].onchange = function(){
		//console.log(this.files);
		//console.log(this.files[0].size/1024);  //files表示上传的文件,里面包含了文件的各种信息
        if(this.files[0].type.split('/')[0] == 'video'){        //一次只能上传一个文件所以用this.files[0]
        	fnNewsOut()
        }else{
        	fnInfo(oInfo,'请上传视频文件');
        }
	}
	aInput[1].onchange = function(){
        if(this.files[0].type.split('/')[0] == 'image'){        //一次只能上传一个文件所以用this.files[0]
        	fnNewsOut()
        }else{
        	fnInfo(oInfo,'请上传图片文件');
        }
	}
}
function fnNewsOut(){
	var oNews=id("news");
	var oForm=id("form");
	addClass(oForm,"pageShow");
	oNews.style.cssText="";
	removeClass(oNews,"pageShow");
		formIn();
}
