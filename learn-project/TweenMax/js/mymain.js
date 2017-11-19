var miaov = {
	timeScroll:null, //挂载整屏切换动画的实例
	
	currentStep:'step1', //保存整屏切换时的动画状态
	
	init:function(){ //初始化方法
		this.resize();
		this.events();
		this.configInitAnimation();
		this.configTimeScroll();
		this.button3D('.start','.state1','.state2',0.3);
		$('body').height(8000);
	},
	
	resize:function(){ //设置每一屏的高度和top值
		$('.scene').height($(window).height()); //设置每一屏的height
		$(".scene:not(':first')").css("top",$(window).height());
		this.configTimeScroll(); //当窗口改变的时候再执行这个函数,可以避免当浏览器窗口改变时,再次切换到第一屏的情况
		if($(window).width()<=950){ //当视口小于950时
			$('body').addClass('r950');
		}else{
			$('body').removeClass('r950');
			$(".left_nav").css("left",-300);
		}
	},
	
	events:function(){ //配置事件
		var This = this;
		var timer = null;
		$(window).resize(function(){
			This.resize();
		});
		$('.wrapper').on('mousewheel',function(ev,dir){
			ev.preventDefault(); //先干掉浏览器默认的滚动行为
			if(timer){ //函数去抖动,无论滚轮怎么滚动,都是在滚轮停止后1200ms后开始执行
				clearTimeout(timer);
			}
			timer = setTimeout(function(){
				//console.log(dir);
				if(dir>0){ //向上
					This.changeStep('up');
				}else{
					This.changeStep('down');
				}
			},100);	
		});
	},
	
	configInitAnimation:function(){ //配置导航条的动画
		var initAnimation = new TimelineMax();
		initAnimation.to('.menu',0.5,{opacity:1});
		initAnimation.to('.menu',0.5,{left:22},"-=0.3");
		initAnimation.to('.nav',0.5,{opacity:1});
		
		//设置首屏动画
		initAnimation.to('.scene1_logo',0.5,{opacity:1});
		initAnimation.staggerTo('.scene1_1 img',2,{opacity:1,rotationX:0,ease:Elastic.easeOut},0.2);
		initAnimation.to('.light_left',0.7,{rotationZ:0,ease:Cubic.easeOut},'-=2');
		initAnimation.to('.light_right',0.7,{rotationZ:0,ease:Cubic.easeOut},'-=2');
		initAnimation.to('.controls',0.5,{bottom:20,opacity:1},'-=0.7');
		initAnimation.to('body',0,{"overflow-y":"scroll"}); //当首屏所有动画执行完成后,页面出现滚动条
		
		//当屏幕较小时,点击调出左侧的导航
		$('.btn_mobile').on('click',function(){
			var m_animate = new TimelineMax();
			m_animate.to('.left_nav',0.5,{left:0});
		});
		$('.l_close').on('click',function(){
			var l_animate = new TimelineMax();
			l_animate.to('.left_nav',0.5,{left:-300});
		});
	},
	
	changeStep:function(v){ //整屏切换的动画
		var currentStep = this.currentStep;
		if(v == 'down'){ //向下切换
			var currentTime = this.timeScroll.getLabelTime(currentStep); //通过当前状态获取当前的时间
			var afterStep = this.timeScroll.getLabelAfter(currentTime); //通过当前时间获取下一个状态的字符串
			this.timeScroll.tweenTo(afterStep); //运动到下一状态
			this.currentStep = afterStep; //重新记录当前状态
		}else{
			var currentTime = this.timeScroll.getLabelTime(currentStep); //通过当前状态获取当前的时间
			var beforeStep = this.timeScroll.getLabelBefore(currentTime); //通过当前时间获取上一个状态的字符串
			this.timeScroll.tweenTo(beforeStep); //运动到上一状态
			this.currentStep = beforeStep; //重新记录当前状态
		}
	},
	
	configTimeScroll:function(){ //配置整屏切换的动画的状态以及每一屏的小动画
		
		var time = this.timeScroll ? this.timeScroll.time():0;
		
		if(this.timeScroll){
			this.timeScroll.clear();
		};
		this.timeScroll = new TimelineMax();
		this.timeScroll.add('step1'); //添加一个初始状态,每切换一屏添加一个状态
        
        this.timeScroll.to('.scene2',0.8,{top:0,ease:Cubic.easeInOut}); //切换到第二屏
        this.timeScroll.add('step2');
        
        this.timeScroll.to('.scene3',0.8,{top:0,ease:Cubic.easeInOut}); //切换到第三屏
        this.timeScroll.add('step3');
        
        this.timeScroll.to('.scene4',0.8,{top:0,ease:Cubic.easeInOut}); //切换到第四屏
        this.timeScroll.add('step4');
        
        this.timeScroll.to('.scene5',0.8,{top:0,ease:Cubic.easeInOut}); //切换到第五屏
        this.timeScroll.add('step5');
        
        this.timeScroll.stop(); //切换动画不是页面加载完就开始执行的
        this.timeScroll.seek(time); //当改变浏览器大小时,就让动画走到之前已经到达的时间点
	},
	
	button3D:function(obj,element1,element2,d){ //3D翻转的方法,obj鼠标移入时对应的父级,element1正面,element2反面,d持续时间
		var button3D = new TimelineMax();
		//设置正面和反面的初始值
		button3D.to($(obj).find(element1),0,{rotationX:0,transformPerspective:600,transformOrigin:"center bottom"});
		button3D.to($(obj).find(element2),0,{rotationX:-90,transformPerspective:600,transformOrigin:"top center"});
		
		$(obj).on('mouseenter',function(){
			var enterAnimation = new TimelineMax();
			var ele1 = $(this).find(element1);
			var ele2 = $(this).find(element2);
			enterAnimation.to(ele1,d,{rotationX:90,top:-ele1.height(),ease:Cubic.easeInOut},0); //延迟时间都设置为0,那么两个动画就会同时运动
			enterAnimation.to(ele2,d,{rotationX:0,top:0,ease:Cubic.easeInOut},0);
		});
		$(obj).on('mouseleave',function(){
			var leaveAnimation = new TimelineMax();
			var ele1 = $(this).find(element1);
			var ele2 = $(this).find(element2);
			leaveAnimation.to(ele1,d,{rotationX:0,top:0,ease:Cubic.easeInOut},0); //延迟时间都设置为0,那么两个动画就会同时运动
			leaveAnimation.to(ele2,d,{rotationX:-90,top:ele2.height(),ease:Cubic.easeInOut},0);
		});
	},
	
	scale:function(){ //计算滚动条在滚动过程中的一个比例
		var scrollTop = $(window).scrollTop();
		var MaxH = $('body').height() - $(window).height(); //滚动条可以滚动的最大高度,为body的高度减去可视区的高度
		var s = scrollTop/MaxH;
		return s;
	},
	
	scrollStatus:function(){
		var times = this.scale()*this.timeScroll.totalDuration();
		this.timeScroll.seek(times,false);
	}
};

$(document).ready(function(){
	miaov.init();
});