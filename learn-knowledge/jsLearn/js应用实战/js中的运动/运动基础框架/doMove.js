//javascript Dcument


//1.获取样式的方法
function getStyle(obj, attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];              //获取元素计算后的css样式(有单位),就算是自定义属性也能获取到值
}

//2.普通匀速运动函数
function doMove(obj, direction, attr, target, endFn,doTime){                   //添加回调函数
				 	  direction= parseInt(getStyle(obj, attr))<target?direction:-direction;    //如果当前位置小于目标位置，direction则为正，否则为负
				 	  clearInterval(obj.timer);                  //先清除定时器，每次保证只有一个定时器在运行，防止按多次后，速度变快
                      obj.timer = setInterval(function(){
                    	 var speed=parseInt(getStyle(obj, attr))+direction;
                    	 if(speed>target && direction>0 || speed<target && direction<0){                                         
                    	 	 speed=target;
                    	 }
                    	obj.style[attr] = speed +'px';
                    	if(speed==target){
                    		 clearInterval(obj.timer);
                    		 endFn && endFn();                 //如果endFn存在则执行它
                    	}
                    },doTime);
}


//3.抖动函数
function shake(obj, attr, endFn){
			 	  	    var arr=[];
			 	  	    var pos=parseInt(getStyle(obj, attr));
			 	  	    var num=0;
			 	  	   for(var i=20; i>0; i-=2){
			 	  	    	arr.push(i,-i);
			 	       }
                         arr.push(0);
                         clearInterval(obj.timer);
                         obj.timer=setInterval(function(){
                         	   obj.style[attr]=pos+arr[num]+'px';
                         	   num++;
                         	   if(num==arr.length){
                         	   	     clearInterval(obj.timer);
                         	   	     endFn && endFn();
                         	   }
                         },3);
}


//4.包含透明度的变化的运动 (是2的拓展)
//function moveChange(obj,attr,iTarget, iSpeed,doTime){
//		 if(attr == 'opacity'){
//		 	iSpeed = Math.round(getStyle(obj,'opacity') * 100) < iTarget?iSpeed:-iSpeed;
//		 }else{
//		 	iSpeed = parseInt(getStyle(obj,attr)) < iTarget?iSpeed:-iSpeed;
//		 }
//	    
//	    clearInterval(obj.timer);
//		var iCur = 0;
//		obj.timer = setInterval(function() {                 //用obj.timer作定时器是为了给每一个特定的元素使用不同的定时器开关，防止一个定会器停止后影响到其他定时器
//			if(attr == 'opacity'){
//				iCur = Math.round(getStyle(obj,'opacity') * 100);	//29.999900000045,因为小数存在精度问题,所以*100进行计算，而且可以兼容IE的滤镜
//			}else{
//				iCur =parseInt(getStyle(obj,attr));       //去掉getstyle()方法带着的单位
//			}
//			
//			
//			if( (iCur>iTarget && iSpeed>0)  || (iCur<iTarget && iSpeed<0) ){
//				iCur=iTarget;
//			}else if (iCur == iTarget) {
//				clearInterval(obj.timer);
//			} else {
//				if(attr == 'opacity'){
//					obj.style.opacity = (iCur + iSpeed) / 100;
//				    obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
//				}else{
//					obj.style[attr] = iCur + iSpeed +'px';
//				}
//				
//			}
//		}, doTime);    
//}

//5.同一个元素多个属性值的运动(4的拓展)
function moveChange(obj,attr,iTarget,iSpeed,doTime){
	    clearInterval(obj.iTimer);                  //给每个元素单独加timer
	    var iCur = 0;
	    
	    obj.iTimer = setInterval(function(){
	    	if(attr == 'opacity'){
	    		iCur = Math.round(getStyle(obj,'opacity')*100);
	    	}else{
	    		iCur = parseInt(getStyle(obj,attr));
	    	}
	    	
	    	if(iCur == iTarget){
	    		clearInterval(obj.iTimer);
	    	}else{
	    		if(attr == 'opacity'){
	    			obj.style.opacity = (iCur+iSpeed)/100;
	    			obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
	    		}else{
	    			obj.style[attr] = iCur+iSpeed+'px';
	    		}
	    	}
	    },doTime);
}


//6.多值同时运动
function manyChange(obj,json,iSpeed,doTime){
	    clearInterval(obj.iTimer);                  //给每个元素单独加timer
	    var iCur = 0;
	    
	    obj.iTimer = setInterval(function(){
	    	var iOff = true;   //用来判断所有属性是否运动到目标点
	    	//定时器每走一下,就要把要运动的属性都推进一次
	    	for(var attr in json){
	    		
	    		  //什么时候停止定时器??当多有属性都运动到目标点的时候
	    		  var iTarget = json[attr];
	    		  if(attr == 'opacity'){
	    		        iCur = Math.round(getStyle(obj,'opacity')*100);
			    	}else{
			    		iCur = parseInt(getStyle(obj,attr));
			    	}
			    	
			    	if(iCur != iTarget){
			    		iOff = false;
			    		if(attr == 'opacity'){
			    			obj.style.opacity = (iCur+iSpeed)/100;
			    			obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
			    		}else{
			    			obj.style[attr] = iCur+iSpeed+'px';
			    		}
			    	}
	    	}
	    	
	    	//最后来看下所有属性是否已经运动到了目标点,来判断是否停止定时器
	    	if(iOff) clearInterval(obj.iTimer)
	    },doTime);
}

//7.链式运动,运动回调
function moveBack(obj,json,iSpeed,doTime,endFn){
	    clearInterval(obj.iTimer);                  //给每个元素单独加timer
	    var iCur = 0;
	    
	    obj.iTimer = setInterval(function(){
	    	var iOff = true;   //用来判断所有属性是否运动到目标点
	    	//定时器每走一下,就要把要运动的属性都推进一次
	    	for(var attr in json){
	    		  //什么时候停止定时器??当多有属性都运动到目标点的时候
	    		  var iTarget = json[attr];
	    		  if(attr == 'opacity'){
	    		        iCur = Math.round(getStyle(obj,'opacity')*100);
			    	}else{
			    		iCur = parseInt(getStyle(obj,attr));
			    	}
			    	
			    	if(iCur != iTarget){
			    		iOff = false;
			    		if(attr == 'opacity'){
			    			obj.style.opacity = (iCur+iSpeed)/100;
			    			obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
			    		}else{
			    			obj.style[attr] = iCur+iSpeed+'px';
			    		}
			    	}
	    	}
	    	//最后来看下所有属性是否已经运动到了目标点,来判断是否停止定时器
	    	if(iOff){
	    		 clearInterval(obj.iTimer);
	    		 endFn && endFn.call(obj);           //改变this指向,将this直接指向上次运动的对象
	    	}
	    	
	    },doTime);
}

