//resizeImage
//author jie yang
function resizeableImage(imgObj) {
	this.cfg = {
		image_target: imgObj.get(0),
		orgic: new Image(),
		min_width: 60,
		min_height: 60,
		max_width: 8800,
		max_height: 8800,
		resize_canvas: document.createElement("canvas")
	};
	this.container = null;
	this.event_state = {}; //存放一些事件的初始状态
	this.init();
};

resizeableImage.prototype = {
	constructor: resizeableImage,

	//初始化方法
	init: function (options) {
		var me = this;
		$.extend(this.cfg, options);
		this.cfg.orgic.src = this.cfg.image_target.src;

		//用div容器包装图像,并添加大小手柄
		$(this.cfg.image_target).wrap('<div class="resize-container"></div>')       //wrap() 方法把每个被选元素放置在指定的 HTML 内容或元素中,此处即用div包裹image
			.before('<span class="resize-handle resize-handle-nw"></span>')
			.before('<span class="resize-handle resize-handle-ne"></span>')
			.after('<span class="resize-handle resize-handle-se"></span>')
			.after('<span class="resize-handle resize-handle-sw"></span>');

		//将容器分配给一个变量
		this.container = $(this.cfg.image_target).parent('.resize-container');
		console.log('container', this.container);

		//在容器上添加相关事件 
		this.container.on('mousedown', '.resize-handle', function (e) {
			me.startResize(e);
		});
		this.container.on('mousedown', 'img', function (e) {
			me.startMoving(e);
		});
		$('.js-crop').on('click', function () {
			me.crop();
		});
	},

	//保存事件状态(在进行图片移动或者大小调整前,先将相关状态保存下来)
	saveEventState: function (e) {
		var me = this;
		this.event_state.con_width = this.container.width();
		this.event_state.con_height = this.container.height();
		this.event_state.con_left = this.container.offset().left;
		this.event_state.con_top = this.container.offset().top;
		this.event_state.mouseX = e.pageX + $(window).scrollLeft();
		this.event_state.mouseY = e.pageY + $(window).scrollTop();
		this.event_state.evnt = e;
	},

	//开始调整图片大小
	startResize: function (e) {
		var me = this;
		e.preventDefault();
		e.stopPropagation();
		me.saveEventState(e);
		$(document).on('mousemove', function (e) {
			me.resizing(e);
		});
		$(document).on('mouseup', function (e) {
			me.endResize(e)
		});
	},

	endResize: function (e) {
		e.preventDefault();
		$(document).off('mouseup');
		$(document).off('mousemove');
	},

	//实时记录图片大小等相关数据
	resizing: function (e) {
		var me = this,
			mouse = {},
			width, height, left, top, offset = me.container.offset();
		mouse.x = e.pageX + $(window).scrollLeft();
		mouse.y = e.pageY + $(window).scrollTop();

		//拖动四周的角进行图像的缩放
		if ($(me.event_state.evnt.target).hasClass('resize-handle-se')) { //右下角
			width = mouse.x - me.event_state.con_left;
			height = mouse.y - me.event_state.con_top;
			left = me.event_state.con_left;
			top = me.event_state.con_top;
		} else if ($(me.event_state.evnt.target).hasClass('resize-handle-sw')) { //左下角
			width = me.event_state.con_width - (mouse.x - me.event_state.con_left);
			height = mouse.y - me.event_state.con_top;
			left = mouse.x;
			top = me.event_state.con_top;
		} else if ($(me.event_state.evnt.target).hasClass('resize-handle-nw')) { //左上角
			width = me.event_state.con_width - (mouse.x - me.event_state.con_left);
			height = me.event_state.con_height - (mouse.y - me.event_state.con_top);
			left = mouse.x;
			top = mouse.y;
		} else if ($(me.event_state.evnt.target).hasClass('resize-handle-ne')) { //右上角
			width = mouse.x - me.event_state.con_left;
			height = me.event_state.con_height - (mouse.y - me.event_state.con_top);
			left = me.event_state.con_left;
			top = mouse.y;
		}

		//按住shift键,选择保持长宽比,这里选择和原始图片的大小进行比较,因为它是固定不变的,减少出错的几率,但是使用event_state.container_width也是可以的
		if (e.shiftKey) {
			height = width / me.cfg.orgic.width * me.cfg.orgic.height;
		}

		if (width > me.cfg.min_width && height > me.cfg.min_height && width < me.cfg.max_width && height < me.cfg.max_height) {
			me.resizeImage(width, height);
			me.container.offset({
				'left': left,
				'top': top
			});
		}
	},

	//调整图片大小
	resizeImage: function (width, height) {
		var me = this;
		me.cfg.resize_canvas.width = width;
		me.cfg.resize_canvas.height = height;
		me.cfg.resize_canvas.getContext('2d').drawImage(me.cfg.orgic, 0, 0, width, height);
		me.cfg.image_target.src = me.cfg.resize_canvas.toDataURL('image/png');
	},

	//开始移动
	startMoving: function (e) {
		var me = this;
		e.preventDefault();
		e.stopPropagation();
		me.saveEventState(e);
		$(document).on('mousemove', function (e) {
			me.moving(e);
		});
		$(document).on('mouseup', function (e) {
			me.endMoving(e);
		});
	},

	endMoving: function (e) {
		e.preventDefault();
		$(document).off('mousemove');
		$(document).off('mouseup');
	},

	moving: function (e) {
		var me = this;
		var mouse = {};
		e.preventDefault();
		e.stopPropagation();
		mouse.x = e.pageX + $(window).scrollLeft();
		mouse.y = e.pageY + $(window).scrollTop();
		me.container.offset({
			'left': mouse.x - (me.event_state.mouseX - me.event_state.con_left),
			'top': mouse.y - (me.event_state.mouseY - me.event_state.con_top)
		});
	},

	//裁剪
	crop: function () {
		var crop_canvas;
		var me = this;
		var left = $('.overlay').offset().left - me.container.offset().left;
		var top = $('.overlay').offset().top - me.container.offset().top;

		var width = $('.overlay').width();
		var height = $('.overlay').height();

		crop_canvas = document.createElement("canvas");
		crop_canvas.width = width;
		crop_canvas.height = height;
		crop_canvas.getContext('2d').drawImage(me.cfg.image_target, left, top, width, height, 0, 0, width, height);
		window.open(crop_canvas.toDataURL("image/png"));
		//      var me = this;
		//      alert(me.innerHTML);
	}
};
