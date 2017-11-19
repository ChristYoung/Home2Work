requirejs.config({
	paths:{                     //指定文件名和模块名的映射关系
		jquery: 'http://libs.baidu.com/jquery/2.0.0/jquery.min',          //使用CDN上的文件,提高性能
	    jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'            //增加jq ui模块
	}
});

//main.js是应用层
require(['jquery','Window'],function($,w){      //应用层
	$('#a').click(function(){
		var Win = new w.Window().alert({         //new一个Window对象的实例,并调用alert方法
					width:300,
					height:120,
					content:'欢迎来到睿博健康吧!',
					y:20,
					hasCloseBtn:true,
					handler4AlertBtn:function(){alert('you click the confirm button')},
					handler4CloseBtn:function(){alert('you click the close button')},
					text4Btn:'好  的',
					skinClassName:'window_skin_a',
					dragHandle:'.window_header'          //传入把手
		});            
	});
	
	$('#c').click(function(){
		var Win = new w.Window().confirm({
			        width:300,
					height:120,
					content:'确定要退出?',
					y:20,
					skinClassName:'window_skin_a',
					hasCloseBtn:true,
					dragHandle:'.window_header'
		});
	});
	
	$('#p').click(function(){
		var Win = new w.Window().prompt({
			width:300,
			height:150,
			y:50,
			text4PromptBtn:'确认输入',
			defaultValue4PromptInput:'张三',
			handler4PromptBtn:function(inputValue){
				alert('您输入的内容为:'+inputValue);
			},
			skinClassName:'window_skin_a',
			hasCloseBtn:true
		});
	});
	
});