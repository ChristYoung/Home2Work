//javascript Document
;(function($){
	var LightBox = function(){
		var self = this;
		
		//创建遮罩和弹出框
		this.popupMask = $('<div id="G-lightbox-mask"></div>');
		this.popupWin = $('<div id="G-lightbox-popup"></div>');
		this.bodyNode = $(document.body);
		
		//渲染剩余的dom,并且插入到body中
		this.renderDom();
	    
	    this.picViewArea = this.popupWin.find('div.lightbox-pic-view');  //图片预览区
	    this.popupPic = this.popupWin.find('img.lightbox-image');        //图片
	    this.picCaptionArea = this.popupWin.find('div.lightbox-pic-caption') //图片描述区域
	    this.nextBtn = this.popupWin.find('span.lightbox-next-btn');      //下一张按钮
	    this.prevBtn = this.popupWin.find('span.lightbox-prev-btn');      //上一张按钮
	    
	    this.capText = this.popupWin.find('p.lightbox-pic-desc');       //图片描述
	    this.currentIndex = this.popupWin.find('span.lightbox-of-index');  //图片当前索引
	    this.closBtn = this.popupWin.find('span.lightbox-clos-btn');      //关闭按钮
	    
	    //准备开发事件委托,获取组数据(将点击事件委托给body,防止如果懒加载出现的图片还要再去获取一下这个图片并对其进行事件的绑定)
	    this.groupName = null;
	    this.groupData = [];   //放置同一组数据
	    this.index = 0;        //图片索引值
	    this.bodyNode.delegate('.js-lightbox,*[data-role=lightbox]','click',function(e){
	    	e.stopPropagation();   //阻止事件冒泡
            var CurrentGroupName = $(this).attr('data-group');
            if(CurrentGroupName != self.groupName){  //如果点击了同一组图片,则不会进行下面的判断
            	self.groupName = CurrentGroupName;
            	//根据当前组名获取同一组数据
                self.getGroup();
            };
            self.initPop($(this));
	    });
	    //关闭弹出
	    this.popupMask.click(function(){
	    	$(this).fadeOut();
	    	self.popupWin.fadeOut();
	    });
	    this.closBtn.click(function(){
	    	self.popupMask.fadeOut();
	    	self.popupWin.fadeOut();
	    });
	    //绑定上下切换按钮事件
	    this.isLoaded = true;     //防止用户在图片还没加载出来之前又点击按钮
	    this.nextBtn.hover(function(){
	    	if(!$(this).hasClass('disabled') && self.groupData.length>1){
	    		$(this).addClass('lightbox-next-btn-show');
	    	}
	    },function(){
	    	if(!$(this).hasClass('disabled') && self.groupData.length>1){
	    		$(this).removeClass('lightbox-next-btn-show');
	    	}
	    }).click(function(e){
	    	if(!$(this).hasClass('disabled') && self.isLoaded){
	    		self.isLoaded = false;
	    		e.stopPropagation();
	    		self.Goto('next');
	    	}
	    });
	    this.prevBtn.hover(function(){
	    	if(!$(this).hasClass('disabled') && self.groupData.length>1){
	    		$(this).addClass('lightbox-prev-btn-show');
	    	}
	    },function(){
	    	if(!$(this).hasClass('disabled') && self.groupData.length>1){
	    		$(this).removeClass('lightbox-prev-btn-show');
	    	}
	    }).click(function(e){
	    	if(!$(this).hasClass('disabled') && self.isLoaded){
	    		self.isLoaded = false;
	    		e.stopPropagation();
	    		self.Goto('prev');
	    	}
	    });
	};
	LightBox.prototype = {
		renderDom:function(){
			var strDom = '<div class="lightbox-pic-view"><span class="lightbox-btn lightbox-prev-btn"></span><img class="lightbox-image" src=""/><span class="lightbox-btn lightbox-next-btn"></span></div><div class="lightbox-pic-caption"><div class="lightbox-caption-area"><p class="lightbox-pic-desc"></p><span class="lightbox-of-index">当前图片索引: 0 of 0</span></div><span class="lightbox-clos-btn"></span></div>';
			//插入到this.popupWin
			this.popupWin.html(strDom);
			//把遮罩和弹出框插入到body中
		    this.bodyNode.prepend(this.popupMask,this.popupWin);      //注意插入的先后顺序
		},
		getGroup:function(){
			var self = this;
			//根据当前的组别名称,获取页面中所有相同组别的对象
			var groupList = this.bodyNode.find('*[data-group='+this.groupName+']');
			//清空数组数据
			self.groupData.length = 0;
			groupList.each(function(i,e){
				self.groupData.push({
					src:$(this).attr('data-source'),
					id:$(this).attr('data-id'),
					caption:$(this).attr('data-caption')
				});
			});
		},
		initPop:function(currentObj){
			var self = this,
			    sourceSrc = currentObj.attr('data-source'),
			    currentId = currentObj.attr('data-id');
			this.showMaskAndPop(sourceSrc,currentId);
		},
		showMaskAndPop:function(sourceSrc,currentId){
			var self = this;
			this.popupPic.hide();
			this.picCaptionArea.hide();
			
			this.popupMask.fadeIn();
			var winWidth = $(window).width(),
			    winHeight = $(window).height();
			this.picViewArea.css({
				width:winWidth/2,
				height:winHeight/2
			});
			var viewHeight = winHeight/2+10
			this.popupWin.fadeIn().css({
				width:winWidth/2+10,
				height:viewHeight,
				marginLeft:-(winWidth/2+10)/2,
				top: -(winHeight/2+10)
			}).animate({
				top: (winHeight-viewHeight)/2
			},function(){
				//动画回调,实现加载图片的方法
				self.loadPicSize(sourceSrc);
			});
			
			//根据当前点击的元素ID获取在当前组别里面的索引
			this.index = this.getIndexOf(currentId);
			var groupDataLen = this.groupData.length;
			if(groupDataLen>1){
				if(this.index === 0){
					this.prevBtn.addClass('disabled');
					this.nextBtn.removeClass('disabled');
				}else if(this.index === groupDataLen-1){
					this.prevBtn.removeClass('disabled');
					this.nextBtn.addClass('disabled');
				}else{
					this.prevBtn.removeClass('disabled');
					this.nextBtn.removeClass('disabled');
				}
			}
			//console.log(this.index);
		},
		getIndexOf:function(currentId){
			var index = 0;
			$(this.groupData).each(function(i){
				index = i;
				if(this.id === currentId){
					return false;
				}
			});
			return index;
		},
		loadPicSize:function(sourceSrc){
			var self = this;
			self.popupPic.css({       //每次加载前都将图片容器的宽高设为auto,避免下次加载时宽高还是沿用上一次的,会造成图片的拉伸
				width:'auto',
				height:'auto'
			}).hide();
			//监控图片是否加载完成,图片预加载
			this.preLoadImg(sourceSrc,function(){
				self.popupPic.attr('src',sourceSrc);
				var picWidth = self.popupPic.width(),
				    picHeight = self.popupPic.height();
				//console.log(picWidth);    
				self.changePic(picWidth,picHeight);
			});
		},
		preLoadImg:function(src,callback){
			var img = new Image();
			//兼容IE,IE没有onload方法
			if(!!window.ActiveXObject){
				img.onreadystatechange = function(){
					if(this.readyStatesta == 'complete'){
						callback();
					}
				}
			}else{
				img.onload = function(){
					callback();
				}
			}
			img.src = src;
		},
		changePic:function(picWidth,picHeight){     //根据图片实际大小进行过度效果
			var self = this,
			    winWidth = $(window).width(),
			    winHeight = $(window).height();
			    
			//如果图片的宽高大于浏览器视口的宽高比例,那就看下图片是否溢出,如果溢出则进行缩放
			var scale = Math.min(winWidth/(picWidth+10),winHeight/(picHeight+10),1);  //计算缩放比例
			picWidth = picWidth*scale;
			picHeight = picHeight*scale;
			
			this.picViewArea.animate({
				width:picWidth-10,
				height:picHeight-10
			});
			this.popupWin.animate({
				width:picWidth,
				height:picHeight,
				marginLeft:-(picWidth)/2,
				top: (winHeight-picHeight)/2
			},function(){
				self.popupPic.css({
					width:picWidth-10,
					height:picHeight-10
				}).fadeIn();
				self.picCaptionArea.fadeIn();
				self.isLoaded = true;
			});
		    
		    //设置描述文字和当前索引
		    this.capText.text(this.groupData[this.index].caption);
		    this.currentIndex.text('当前索引: '+(this.index+1)+'of'+this.groupData.length);
		},
		Goto:function(Dir){
			if(Dir == 'next'){
				this.index++;
				if(this.index >= this.groupData.length-1){
					this.nextBtn.addClass('disabled').removeClass('lightbox-next-btn-show');
				}
				if(this.index != 0){
					this.prevBtn.removeClass('disabled');
				}
				var src = this.groupData[this.index].src;
				this.loadPicSize(src);
			}else if(Dir == 'prev'){
				this.index--;
				if(this.index <= 0){
					this.prevBtn.addClass('disabled').removeClass('lightbox-prev-btn-show');
				}
				if(this.index != this.groupData.length-1){
					this.nextBtn.removeClass('disabled');
				}
				var src = this.groupData[this.index].src;
				this.loadPicSize(src);
			}
		}
	};
	window['LightBox'] = LightBox;
})(jQuery);
