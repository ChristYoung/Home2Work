define(['jquery'],function($){
	function ScrollTo(opts){
		this._defaults = {
			dest:0, //滚动条的位置
			speed:800 //滚动条完成滚动的时间
		};
		this.$el = $('html,body');
		this.opts = $.extend({},this._defaults,opts);
		this.isAnimateStop = true; //动画停止的开关,防止多次点击动画被执行多次
	};
	ScrollTo.prototype.move = function(){
		var _this = this;
		if(this.isAnimateStop){
			this.isAnimateStop = false;
			_this.$el.animate({
				scrollTop:_this.opts.dest
			},_this.opts.speed,function(){
				_this.isAnimateStop = true;
			});
		}
	};
	return {scrollTo:ScrollTo};
});