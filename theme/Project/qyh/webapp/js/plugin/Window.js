//window plugin
//author:jie yang -- 2015.10.06
	
	function Window(){
		this.cfg = {          //默认参数
			width:300,
			height:135,
			title:'系统消息',
			content:"",
			x:0,
			y:120,
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
			testRules:null,          //简单的表单验证
			hasMask:true,           //模态弹窗,如果用户不执行弹窗上的事件,则其他事件被阻塞
		    winType:'alert'
		};
		this._mask = null;
		this._promptInput = null;
	}
	
	Window.prototype = $.extend({},new Widget(),{           //继承widget类
						renderUI:function(){
							var footContent = '';
							switch(this.cfg.winType){
								case 'alert':
								      footContent = '<input type="button" value="'+this.cfg.text4AlertBtn+'" class="emng-btn btn-bg-blue window_alertBtn">';
								      break;
								case 'confirm':
								     footContent = '<input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn"><input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="input_btn btn_blue window_confirmBtn">';
								     break;
								case 'prompt':   
								     this.cfg.content+='<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword?"password":"text")+'" placeholder="'+this.cfg.defaultValue4PromptInput+ '" maxlength="'+
								                          this.cfg.maxlength4PromptInput+ '" value="" class="window_promptInput"><label class="labelError"></label></p>';
								     footContent = '<input type="button" value="' + this.cfg.text4CancelBtn + '" class="window_cancelBtn"><input type="button" value="'+this.cfg.text4PromptBtn+'" class="input_btn btn_blue window_promptBtn">';
								     break;
							};
							
							this.boundingBox = $('<div class="window_boundingBox">'+
							                         '<div class="window_header">'+this.cfg.title+'</div>'+
							                         '<div class="window_body">'+this.cfg.content+'</div>'+
							                         '<div class="window_footer">'+footContent+'</div>'+
							                    '</div>');
							this._promptInput = this.boundingBox.find('.window_promptInput');                    
							if(this.cfg.hasMask){
								this._mask = $('<div class="emng-mask"></div>');
								this._mask.appendTo('body');
							}
							
							this.boundingBox.appendTo(document.body);
						},
						
						bindUI:function(){
							var that = this;
							this.boundingBox.delegate('.window_alertBtn','click',function(){
								that.fire('alert');
								that.destroy();
							}).delegate('.window_confirmBtn','click',function(){
								that.fire('confirm');
								that.destroy();
							}).delegate('.window_cancelBtn','click',function(){
								that.fire('cancel');
								that.destroy();
							}).delegate('.window_promptBtn','click',function(){
								if(that.cfg.testRules){
									if(that.cfg.testRules(that._promptInput.val())){
										 that.fire('prompt',that._promptInput.val());
								         that.destroy();
									}else{
										alert('您填写的值不满足要求');
									}
							    }else{
							       that.fire('prompt',that._promptInput.val());
								   that.destroy();
							    }
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
								left:(this.cfg.x || ($(window).width() - this.cfg.width)/2)+'px',
								top:(this.cfg.y || ($(window).height() - this.cfg.height)/2)+'px'
							});
						},
						
						destructor:function(){
							this._mask && this._mask.remove();
						},
						
						//在应用层调用的方法
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