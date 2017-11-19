//javascript Document
define(['Widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Window(){
		this.cfg = {          //默认参数
			width:500,
			height:300,
			title:'系统消息',
			content:"",
			x:0,
			y:0,
			skinClassName:null,   //设置皮肤样式
			handler4AlertBtn:null,
			handler4CloseBtn:null,
			handler4ConfirmBtn:null,
			handler4CancelBtn:null,
			text4AlertBtn:'确定',
			text4ConfirmBtn:'确定',
			text4CancelBtn:'取消',
			text4PromptBtn:'确定',
			isPromptInputPassword:false,
			defaultValue4PromptInput:'',
			maxlength4PromptInput:10,
			handler4PromptBtn:null,
			hasCloseBtn:false,      //默认不出现关闭按钮
			hasMask:true,           //模态弹窗,即如果用户不执行弹窗上的事件,则其他事件被阻塞,也就是加一个遮罩层
		    isDraggable:true,       //默认可拖动 
		    dragHandle:null,        //拖动把手
		    winType:'alert'
		};
		this._mask = null;
		this._promptInput = null;
	}
	
	Window.prototype = $.extend({},new widget.Widget(),{           //继承widget类
						renderUI:function(){
							var footContent = '';
							switch(this.cfg.winType){
								case 'alert':
								      footContent = '<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn">';
								      break;
								case 'confirm':
								     footContent = '<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="window_confirmBtn"><input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn">';
								     break;
								case 'prompt':   
								     this.cfg.content+='<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword?"password":"text")+'" placeholder="'+this.cfg.defaultValue4PromptInput+ '" maxlength="'+
								                          this.cfg.maxlength4PromptInput+ '" value="" class="window_promptInput"></p>';
								     footContent = '<input type="button" value="'+this.cfg.text4PromptBtn+'" class="window_confirmBtn"><input type="button" value="' +
								                    this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
								     break;
							};
							
							this.boundingBox = $('<div class="window_boundingBox">'+
							                         '<div class="window_header">'+this.cfg.title+'</div>'+
							                         '<div class="window_body">'+this.cfg.content+'</div>'+
							                         '<div class="window_footer">'+footContent+'</div>'+
							                    '</div>');
							this._promptInput = this.boundingBox.find('.window_promptInput');                    
							if(this.cfg.hasMask){
								this._mask = $('<div class="window_mask"></div>');
								this._mask.appendTo('body');
							}
							
							if(this.cfg.hasCloseBtn){
								this.boundingBox.append('<span class="window_closeBtn">✘ </span>');
							}
							this.boundingBox.appendTo(document.body);
						},
						
						bindUI:function(){
							var that = this;
							this.boundingBox.delegate('.window_alertBtn','click',function(){
								that.fire('alert');
								that.destroy();
							}).delegate('.window_closeBtn','click',function(){
								that.fire('close');
								that.destroy();
							}).delegate('.window_confirmBtn','click',function(){
								that.fire('confirm');
								that.destroy();
							}).delegate('.window_cancelBtn','click',function(){
								that.fire('cancel');
								that.destroy();
							}).delegate('.window_promptInput','click',function(){
								that.fire('prompt',that._promptInput.val());
								that.destroy();
							});
							
							if(this.cfg.handler4AlertBtn){            //如果传入回调则绑定自定义事件
								this.on('alert',this.cfg.handler4AlertBtn);
							}
							if(this.cfg.handler4CloseBtn){
								this.on('close',this.cfg.handler4CloseBtn);
							}
							if(this.cfg.handler4ConfirmBtn){
								this.on('confirm',this.cfg.handler4ConfirmBtn);
							}
							if(this.cfg.handler4CloseBtn){
								this.on('cancel',this.cfg.handler4CancelBtn)
							}
							if(this.cfg.handler4PromptBtn){
								this.on('prompt',this.cfg.handler4PromptBtn);
							}
						},
						
						syncUI:function(){
							this.boundingBox.css({
								width:this.cfg.width+'px',
								height:this.cfg.height+'px',
								left:(this.cfg.x || (window.innerWidth - this.cfg.width)/2)+'px',
								top:(this.cfg.y || (window.innerHeight - this.cfg.height)/2)+'px'
							});
							if(this.cfg.skinClassName){
								this.boundingBox.addClass(this.cfg.skinClassName);
							}
							if(this.cfg.isDraggable){
								if(this.cfg.dragHandle){
									this.boundingBox.draggable({handle:this.cfg.dragHandle});
								}else{
									this.boundingBox.draggable();
								}
							}
						},
						
						destructor:function(){
							this._mask && this._mask.remove();
						},
						
						alert:function(options){
							$.extend(this.cfg,options,{winType:'alert'});
							this.render();
							return this;             //方便链式调用
						},
						
						confirm:function(options){
							$.extend(this.cfg,options,{winType:'confirm'});
							this.render();
							return this;
						},
						
						prompt:function(options){
							$.extend(this.cfg,options,{winType:'prompt'});
							this.render();
							this._promptInput.focus();        //让输入框自动获得焦点
							return this;
						}
						

	});
	
	return {Window:Window}
});