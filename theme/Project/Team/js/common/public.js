//首页轮播图
(function(){
	var _index = 0,
	    $shuffling = $('.shuffling'),
	    $shuffling_li = $('.shuffling_li'),
	    iTimer = null,
	    $next = $('.next_btn'),
	    $prev = $('.prev_btn');
	
	var fnFade = function(){
		$shuffling_li.each(function(i,e){
			if(i != _index){
				$(e).fadeOut(500);
			}else{
				$(e).fadeIn(500);
			}
		});
	};
	
	var autoPlay = function(){
		iTimer = setInterval(function(){
			_index++;
			_index%=4;
			fnFade();
		},5200);
	};
	
	$next.click(function(){
		console.log(_index);
		_index++;
		_index%=4;
		fnFade();
	});
	
	$prev.click(function(){
		console.log(_index);
		_index--;
		if(_index<0){
			_index = 3;
		};
		fnFade();
	});
	
	$shuffling.hover(function(){
		clearInterval(iTimer);
	},autoPlay);
	
	autoPlay();
})();

//导航栏菜单切换
$('.menu_li').hover(function(){
	$('.drop_ul').hide();
	$(this).find('.drop_ul').show();
},function(){
	$('.drop_ul').hide();
});

//点击弹出搜索框
$('.slide_input_btn').click(function(){
	$('.search_cancel').show();
	$('.head_search').val('');
	$('.head_input').addClass('slide');
	$(this).hide();
	$('.submit_input_btn').show();
});

//点击取消搜索框
$('.search_cancel').click(function(){
	$(this).hide();
	$('.head_input').removeClass('slide');
	$('.submit_input_btn').hide();
	$('.slide_input_btn').show();
});

//小窗口视图下点击弹出左侧菜单
$('.btn_menu').click(function(){
	$('.left_menu').addClass('left_menu_show');
});
//小窗口视图下点击关闭左侧菜单
$('.close_left_menu').click(function(){
	$('.left_menu').removeClass('left_menu_show');
});

//小窗口视图下,点击左侧菜单的一级菜单显示二级菜单
$('.menu_1_li').click(function(){
	var $menu_2 = $(this).find('.menu_2_ul');
	if($menu_2.length == 0){
		return;
	};
	if($menu_2.css('display') != 'none'){
		$menu_2.slideUp(300);
	}else{
		$menu_2.slideDown(300);
	}
});

//设置自定义的滚动条
$('.left_menu').mCustomScrollbar({scrollInertia:50});

//press and partner页面信息展开和收缩
$('.slide_arrow').click(function(){
	var $slide_list = $(this).parent().next('.slide_list_wp');
	if($(this).hasClass('arrow_down')){
		$(this).removeClass('arrow_down');
		$slide_list.slideDown(300);
	}else{
		$(this).addClass('arrow_down');
		$slide_list.slideUp(300);
	}
});

//resources页面(helpful links && blogs...)导航切换 
$('.j-nav-tabs li').click(function(){
	var _index = $(this).index();
	$('.j-nav-tabs-contents').hide().eq(_index).show();
	$('.j-nav-tabs li').removeClass('active');
	$(this).addClass('active');
});

//read more
$('.read_more_href').click(function(){
	var $item = $(this).parent().siblings('.item'),
	     $item_p = $item.find('p');
	     if($item_p.hasClass('txt_overflow')){
	     	$item_p.removeClass('txt_overflow');
	     	$item.css('height','auto');
	     	$(this).html('LESS');
	     }else{
	     	if($item_p.height()>375){
	     		$item_p.addClass('txt_overflow');
	     	    $item.css('height','375px');
	     	    $(this).html('READ MORE >');
	     	}
	     }
});

//打印
$('.print-icon').click(function(){
	window.print();
});

//scroll
$('body').mousewheel(function(ev,dir){
	var _top = $(window).scrollTop();
	//console.log(dir);
	if(dir<0){
		if(_top>180){
		  $('.head_wp').removeClass('slideUp').addClass('slideDown');
	    }
	}else{
		if(_top>180){
			$('.head_wp').removeClass('slideDown').addClass('slideUp');
		}else{
			$('.head_wp').removeClass('slideDown slideUp');
		}
	}
});
