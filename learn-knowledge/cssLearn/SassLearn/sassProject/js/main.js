require.config({ //用于定义别名
	paths:{
		jquery:'http://libs.baidu.com/jquery/2.0.0/jquery.min',  
	}
});

//利用定义好的别名来引入相应的模块,数组中填写文件路径名称
requirejs(['jquery','./sc/scrollTo'],function($,scrollTo){ //引入scroll模块
	var scroll = new scrollTo.scrollTo(); //实例化scroll对象
	
	$('#backTop').on('click', $.proxy(scroll.move,scroll));
});