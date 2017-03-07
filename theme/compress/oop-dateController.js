function DateSelect(){
	this.config={
		MinYear:2010,
		MaxYear:new Date().getFullYear(),
		hasMask:true,
		whichOne:null    //保存触发的返回结果     
	};
	this.MoDate = {
		initYear:0,
		initMonth:0,
		initDate:0
	};
	this.boundingBox=null;
    this.mask = $('<div class="moudleWrapper"></div>');
    this.yearCon = null;
    this.monthCon = null;
    this.dateCon = null;
};

DateSelect.prototype.init = function(options){
	var that = this;
	var opts = $.extend({},this.config,options);
	
    if(opts.hasMask){
        this.mask.prependTo('body');
    }
    this.initYear = parseInt(opts.whichOne.val().split('-')[0]),
	this.initMonth = parseInt(opts.whichOne.val().split('-')[1]),
	this.initDate = parseInt(opts.whichOne.val().split('-')[2]);
    this.boundingBox = $('<div class="dateWrapper"><div class="date-header">选择日期</div><div class="date-body"><ul><li><div class="plus" id="plusYear">+</div><div class="dateView" id="tYear"></div><div class="reduce" id="reduceYear">-</div></li><li><div class="plus" id="plusMonth">+</div><div class="dateView" id="tMonth"></div><div class="reduce" id="reduceMonth">-</div></li><li><div class="plus" id="plusDate">+</div><div class="dateView" id="tDate"></div><div class="reduce" id="reduceDate">-</div></li></ul></div><div class="date-footer"><ul><li id="cancel">取消</li><li id="confirm">确定</li></ul></div></div>');
    this.boundingBox.prependTo('body');
    this.yearCon = this.boundingBox.find('#tYear');
    this.monthCon = this.boundingBox.find('#tMonth');
    this.dateCon = this.boundingBox.find('#tDate');
    this.yearCon.html(this.initYear);
    this.monthCon.html(this.initMonth);
    this.dateCon.html(this.initDate);

    this.boundingBox.delegate('#plusYear','click',function(){
		 that.initYear = that.initYear>=opts.MaxYear?that.initYear:that.initYear+1;
	     that.yearCon.html(that.initYear);
    });
    this.boundingBox.delegate('#reduceYear','click',function(){
		 that.initYear = that.initYear<=opts.MinYear?that.initYear:that.initYear-1;
	     that.yearCon.html(that.initYear);
    });
    this.boundingBox.delegate('#plusMonth','click',function(){
		 that.initMonth = that.initMonth>=12?12:that.initMonth+1;
	     that.monthCon.html(that.initMonth);
    });
    this.boundingBox.delegate('#reduceMonth','click',function(){
		 that.initMonth = that.initMonth<=1?1:that.initMonth-1;
	     that.monthCon.html(that.initMonth);
    });
    this.boundingBox.delegate('#plusDate','click',function(){
    	 if(isLeapYear(that.initYear) && that.initMonth == 2){
    	 	that.initDate = that.initDate>=29?29:that.initDate+1;
    	 }else if(that.initMonth == 2){
    	 	that.initDate = that.initDate>=28?28:that.initDate+1;
    	 }else if(isBigMonth(that.initMonth)){
    	 	that.initDate = that.initDate>=31?31:that.initDate+1;
    	 }else{
    	 	that.initDate = that.initDate>=30?30:that.initDate+1;
    	 }
    	 that.dateCon.html(that.initDate);
    });
    this.boundingBox.delegate('#reduceDate','click',function(){
    	 that.initDate = that.initDate<=1?1:that.initDate-1;
    	 that.dateCon.html(that.initDate);
    });
    this.boundingBox.find('#cancel').click(function(){
    	that.offBind();
    });
    this.boundingBox.find('#confirm').click(function(){
    	if(isLeapYear(that.initYear) && that.initMonth == 2){
        		if(that.initDate>=29) that.initDate = 29;
        	}else if(that.initMonth == 2){
        		if(that.initDate>=28) that.initDate = 28;
        	}else if(!isBigMonth(that.initMonth)){
        		if(that.initDate>=30) that.initDate = 30;
        	}
        	that.initDate = that.initDate<10?'0'+that.initDate:that.initDate;
        	that.initMonth = that.initMonth<10?'0'+that.initMonth:that.initMonth;
        	opts.whichOne.val(that.initYear+'-'+that.initMonth+'-'+that.initDate);
        	that.offBind();
    });
};

DateSelect.prototype.offBind = function(){
    $('#plusYear').off('click');
	$('#reduceYear').off('click');
	$('#plusMonth').off('click');
	$('#reduceMonth').off('click');
	$('#plusDate').off('click');
	$('#reduceDate').off('click');
	this.boundingBox.remove();
	this.mask.remove();
};

 function isLeapYear(Year){
	if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {return true;} else { return false;}
 };

 function isBigMonth(Month){
	var bigMonth = [1,3,5,7,8,10,12];
	for(var i=0; i<7; i++){
		if(Month == bigMonth[i]) return true;
	}
	return false;
 };





