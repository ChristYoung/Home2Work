//Javascript Document
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}

function startMove(obj,json,endFn){
	clearInterval(obj.iTimer);
	var iCur = 0;
	var iSpeed = 0;
	
	obj.iTimer = setInterval(function(){
		
		iBtn = true;
		for(var attr in json){
			var iTarget = json[attr];
			if(attr == 'opacity'){
				iCur = Math.round(getStyle(obj,'opacity')*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			
			iSpeed = (iTarget - iCur)/8;
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			if(iCur != iTarget){
				iBtn = false;
			    if(attr == 'opacity'){
			    	obj.style.opacity = (iCur+iSpeed)*100;
			    }else{
			    	obj.style[attr] = (iCur+iSpeed)+'px';
			    }
			}
		}
		
		if(iBtn){
			clearInterval(obj.iTimer);
			endFn && endFn();
		}
	},30)
}
