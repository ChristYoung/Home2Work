//input verify
//author:jie yang --- 2016.11.26
	//表单验证方法,在jQuery对象下扩展一个validator方法
	$.fn.validator = function(options){
		var me = this;
		var rex = {
			noSpace:/\s/g,
			phoneNum:/(^1[3|4|5|7|8][0-9]{9}$)/,
			contactPhone:/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
			eMail:/^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
			sPecial:/[`~!@#\$%\^\&\，\。\、\……\·\《\》\￥\=\|\：\“\”\；\‘\’\——\！\【\】\（\）\？\s\*\(\)\+<>\?:"\{\},\.\\\/;'\[\]]/g,
			Mac:/[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/,
			fixLine:/^\d{8,}$/,
			onlyNum:/^\d+$/g,
			twoNum:/^((?!0)\d+(\.\d{1,2})?)$/g,//小数点后两位
			onlyChin:/^[\u4e00-\u9fa5]+$/,
			noChin:/^[A-Za-z0-9]+$/,
			webAddress:/^(([hH][tT]{2}[pP][sS]?)|([fF][tT][pP]))\:\/\//,
			iD:/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/,
			strongpassword:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/  //6~32位数字和字母的组合
        };
		var defaults = {
			errContainer:null,
			errorTips:'',
			objEqual:null,
			forbiddenEqual:false,
			required:false,
			requiredMsg:'',
			equalMsg:'',
			equalStr:null,
			equalStrMsg:'',
			minLength:null,
			minMsg:'',
			maxVal:null,
			minVal:null,
			valMsg:'',
			testType:null
		};
		var opts = $.extend({},defaults,options);
		me.init = function(){
			return (me.tocheck(opts.testType) && me.required() && me.minlength(opts.minLength) && me.equal(opts.objEqual) && me.equalStr(opts.equalStr) && me.valCheck(opts.minVal,opts.maxVal));
		};
		me.tocheck = function(type){
			if(type){
				if(this.val() != ''){
    				if(type != 'sPecial' && type != 'noSpace'){
    					if(!rex[type].test(this.val())){
    						if(!opts.errContainer){
    							alert(opts.errorTips);
    						}else{
    							opts.errContainer.show().html(opts.errorTips);
    						}
        					me.focus();
        					return false;
        				}
    				}else{
    					if(rex[type].test(this.val())){
    						if(!opts.errContainer){
    							alert(opts.errorTips);
    						}else{
    							opts.errContainer.show().html(opts.errorTips);
    						}
        					me.focus();
        					return false;
        				}
    				};
    			};
			};
			opts.errContainer && opts.errContainer.html('').hide();
			return true;
		};
		me.required = function(){
			if(opts.required && this.val() == ''){
				if(!opts.errContainer){
    				alert(opts.requiredMsg);
    			}else{
    				opts.errContainer.show().html(opts.requiredMsg);
    			}
				me.focus();
				return false;
			}
			opts.errContainer && opts.errContainer.html('').hide();
			return true;
		};
		me.equal = function(obj){
			if(!opts.forbiddenEqual){
				if(obj && this.val() != obj.val()){
					if(!opts.errContainer){
	    				alert(opts.equalMsg);
	    			}else{
	    				opts.errContainer.show().html(opts.equalMsg);
	    			}
					me.focus();
					return false;
				}
			}else{
				if(obj && this.val() == obj.val()){
					if(!opts.errContainer){
	    				alert(opts.equalMsg);
	    			}else{
	    				opts.errContainer.show().html(opts.equalMsg);
	    			}
					me.focus();
					return false;
				}
			}	
			opts.errContainer && opts.errContainer.html('').hide();
    		return true;
		};
		me.equalStr = function(str){
			if(str && this.val() == str){
				if(!opts.errContainer){
	    			alert(opts.equalStrMsg);
	    		}else{
	    			opts.errContainer.show().html(opts.equalStrMsg);
	    		}
				me.focus();
				return false;
			}	
			opts.errContainer && opts.errContainer.html('').hide();
    		return true;
		};
		me.minlength = function(n){
			if(this.val() != ''){
				if(n && this.val().length<n){
					if(!opts.errContainer){
		    			alert(opts.minMsg);
		    		}else{
		    			opts.errContainer.show().html(opts.minMsg);
		    		}
					me.focus();
					return false;
				}
			}
			opts.errContainer && opts.errContainer.html('').hide();
			return true;
		};
		me.valCheck = function(v1,v2){
			var v = this.val();
			if(v != ''){
				if(v1 && v2){
					if(v>v2 || v<v1){
						if(!opts.errContainer){
			    			alert(opts.valMsg);
			    		}else{
			    			opts.errContainer.show().html(opts.valMsg);
			    		}
						me.focus();
						return false;
					}
				}else if(v1 && !v2){
					if(v<v1){
						if(!opts.errContainer){
			    			alert(opts.valMsg);
			    		}else{
			    			opts.errContainer.show().html(opts.valMsg);
			    		}
						me.focus();
						return false;
					}
				}else if(!v1 && v2){
					if(v>v2){
						if(!opts.errContainer){
			    			alert(opts.valMsg);
			    		}else{
			    			opts.errContainer.show().html(opts.valMsg);
			    		}
						me.focus();
						return false;
					}
				}
			}
			opts.errContainer && opts.errContainer.html('').hide();
			return true;
		};
		return me.init();
   };
   
//全选 -- jie yang 
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

//判断两个数组是否有交集
function ExistsSameValues(a1,a2){
	var flag = false;
	if(a1 instanceof Array && a2 instanceof Array){
		for(var i = 0,len = a1.length; i<len; i++){
			for(var j = 0, lenJ = a2.length; j<lenJ; j++){
				if(a1[i] != "" && a2[j] != "" && a1[i] == a2[j]){
					flag = true;
				}
			}
		}
	    return flag;	
	}else{
		alert('请传入数组类型');
	}
};

function deletRepeat(arr1,arr2){ //删除两个数组的重复的部分,返回删除后的数组,参数必须传入数组类型
	var temp1 = [],
	     temp2 = [];
	for(var i=0; i<arr1.length; i++){
		temp1[arr1[i]] = true;
	};
	for (var i=0; i<arr2.length; i++) {
		if(!temp1[arr2[i]]){
			temp2.push(arr2[i]);
		}
	};
	return arr1.concat(temp2);
};

//寻找数组的指定项目
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
	   if (this[i] == val) return i;
	}
	return -1;
};

//删除指定的数组项目
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
	  this.splice(index, 1);
	}
};

//判断某个元素是否在指定的数组中
Array.prototype.isIn = function(_index){
	for(var i=0; i<this.length; i++){
		if(_index == this[i]){
			return i;
		}
	};
	return -1;
};
