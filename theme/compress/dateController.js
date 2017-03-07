function DateSelect(obj){
        var str = $('<div class="dateWrapper"><div class="date-header">选择日期</div><div class="date-body"><ul><li><div class="plus" id="plusYear">+</div><div class="dateView" id="tYear"></div><div class="reduce" id="reduceYear">-</div></li><li><div class="plus" id="plusMonth">+</div><div class="dateView" id="tMonth"></div><div class="reduce" id="reduceMonth">-</div></li><li><div class="plus" id="plusDate">+</div><div class="dateView" id="tDate"></div><div class="reduce" id="reduceDate">-</div></li></ul></div><div class="date-footer"><ul><li id="cancel">取消</li><li id="confirm">确定</li></ul></div></div>'); 
        var mask = $('<div class="moudleWrapper"></div>'); 
        str.prependTo('body');
        mask.prependTo('body');
        var initYear = parseInt(obj.val().split('-')[0]),
	        initMonth = parseInt(obj.val().split('-')[1]),
	        initDate = parseInt(obj.val().split('-')[2]),
	        MinYear = 2010,
	        MaxYear = new Date().getFullYear();
	    $('#tYear').html(initYear);
	    $('#tMonth').html(initMonth);
	    $('#tDate').html(initDate);
	    
        $('#plusYear').on('click',function(){
        	initYear = initYear>=MaxYear?MaxYear:initYear+1;
        	$('#tYear').html(initYear);
        });
        $('#reduceYear').on('click',function(){
        	initYear = initYear<=MinYear?initYear:initYear-1;
        	$('#tYear').html(initYear);
        });
        $('#plusMonth').on('click',function(){
        	initMonth = initMonth>=12?12:initMonth+1;
        	$('#tMonth').html(initMonth);
        });
        $('#reduceMonth').on('click',function(){
        	initMonth = initMonth<=1?1:initMonth-1;
        	$('#tMonth').html(initMonth);
        });
        $('#plusDate').on('click',function(){
        	if(isLeapYear(initYear) && initMonth == 2){
        		initDate = initDate>=29?29:initDate+1;
        		$('#tDate').html(initDate);
        	}else if(initMonth == 2){
        		initDate = initDate>=28?28:initDate+1;
        		$('#tDate').html(initDate);
        	}else if(isMonth(initMonth)){
        		initDate = initDate>=31?31:initDate+1;
        		$('#tDate').html(initDate);
        	}else{
        		initDate = initDate>=30?30:initDate+1;
        		$('#tDate').html(initDate);
        	}
        });
        $('#reduceDate').on('click',function(){
            initDate = initDate<=1?1:initDate-1;
            $('#tDate').html(initDate);
        });
        $('#cancel').click(function(){
        	oFF();
        });
        $('#confirm').click(function(){
        	if(isLeapYear(initYear) && initMonth == 2){
        		if(initDate>=29) initDate = 29;
        	}else if(initMonth == 2){
        		if(initDate>=28) initDate = 28;
        	}else if(!isMonth(initMonth)){
        		if(initDate>=30) initDate = 30;
        	}
        	initDate = initDate<10?'0'+initDate:initDate;
        	initMonth = initMonth<10?'0'+initMonth:initMonth;
        	obj.val(initYear+'-'+initMonth+'-'+initDate);
        	oFF();
        });
        function oFF(){
        	$('#plusYear').off('click');
        	$('#reduceYear').off('click');
        	$('#plusMonth').off('click');
        	$('#reduceMonth').off('click');
        	$('#plusDate').off('click');
        	$('#reduceDate').off('click');
        	$('.dateWrapper').remove();
        	$('.moudleWrapper').remove();
        }
};
function isLeapYear (Year) {       //判断是否为闰年
	if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {return true;} else { return false;}
};
function isMonth(Month){         //判断大小月
	var bigMonth = [1,3,5,7,8,10,12];
	for(var i=0; i<7; i++){
		if(Month == bigMonth[i]) return true;
	}
	return false;
};
function compareDate(a,b,tips){        //比较日期大小
   if(a>b){
   	  alert(tips);
   	  return false;
   }else{
   	  return true;
   }
}

