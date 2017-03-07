//事件绑定的写法
function evBind(obj,ev,fn){
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent('on'+ev,function(){
			fn.call(this);
		});
	}
};

//添加class方法
function addClass(obj,newClass){
	var nowClass = obj.className.split(' '),
	nowClassLen = nowClass.length;
	
	if(!obj.className){
		obj.className = newClass;
		return;
	}
	
	for(var i=0; i<nowClassLen; i++){
		if(nowClass[i] === newClass) return;
	}
	
	obj.className+=' '+newClass;
};
//删除class方法
function removeClass(obj,removeClass){
	var nowClass = obj.className.split(' ');
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
