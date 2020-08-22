//javascript document
// author jie yang
$(function () {
	var resizeableImage = function (image_target) {
		var $container,
			orig_src = new Image(),
			image_target = $(image_target).get(0),
			event_state = {},     //存放事件的一些状态
			constrain = false,
			min_width = 60,
			min_height = 60,
			max_width = 8800,
			max_height = 8800,
			resize_canvas = document.createElement('canvas');
			orig_src.setAttribute('crossOrigin','Anonymous');

		init = function () {
			orig_src.src = image_target.src;

			//用div容器包装图像,并添加大小手柄
			$(image_target).wrap('<div class="resize-container"></div>')       //wrap() 方法把每个被选元素放置在指定的 HTML 内容或元素中,此处即用div包裹image
				.before('<span class="resize-handle resize-handle-nw"></span>')
				.before('<span class="resize-handle resize-handle-ne"></span>')
				.after('<span class="resize-handle resize-handle-se"></span>')
				.after('<span class="resize-handle resize-handle-sw"></span>');

			//将容器分配给一个变量,简化之后的dom操作
			$container = $(image_target).parent('.resize-container');

			//在容器上添加相关事件
			$container.on('mousedown', '.resize-handle', startResize);     //修改图片大小
			$container.on('mousedown', 'img', startMoving);                //移动图片
			$('.js-crop').on('click', crop);                              //裁剪图片
		};

		//开始调整图片大小
		startResize = function (e) {
			e.preventDefault();
			e.stopPropagation();
			saveEventState(e);
			$(document).on('mousemove', resizing);
			$(document).on('mouseup', endResize);
		};

		endResize = function (e) {
			e.preventDefault();
			$(document).off('mouseup touchend');
			$(document).off('mousemove touchmove');
		};

		//保存事件状态(在进行图片移动或者大小调整前,先将相关状态保存下来)
		saveEventState = function (e) {
			event_state.container_width = $container.width();
			event_state.container_height = $container.height();
			event_state.container_left = $container.offset().left;
			event_state.container_top = $container.offset().top;
			event_state.mouse_x = e.pageX + $(window).scrollLeft();
			event_state.mouse_y = e.pageY + $(window).scrollTop();
			event_state.evnt = e;
		};

		//实时记录图片大小等相关数据
		resizing = function (e) {
			var mouse = {},
				width, height, left, top, offset = $container.offset();
			mouse.x = e.pageX + $(window).scrollLeft();
			mouse.y = e.pageY + $(window).scrollTop();

			//拖动四周的角进行图像的缩放
			if ($(event_state.evnt.target).hasClass('resize-handle-se')) {   //右下角
				width = mouse.x - event_state.container_left;
				height = mouse.y - event_state.container_top;
				left = event_state.container_left;
				top = event_state.container_top;
			} else if ($(event_state.evnt.target).hasClass('resize-handle-sw')) {  //左下角
				width = event_state.container_width - (mouse.x - event_state.container_left);
				height = mouse.y - event_state.container_top;
				left = mouse.x;
				top = event_state.container_top;
			} else if ($(event_state.evnt.target).hasClass('resize-handle-nw')) {   //左上角
				width = event_state.container_width - (mouse.x - event_state.container_left);
				height = event_state.container_height - (mouse.y - event_state.container_top);
				left = mouse.x;
				top = mouse.y
			} else if ($(event_state.evnt.target).hasClass('resize-handle-ne')) {   //右上角
				width = mouse.x - event_state.container_left;
				height = event_state.container_height - (mouse.y - event_state.container_top);
				left = event_state.container_left;
				top = mouse.y;
			}

			//按住shift键,选择保持长宽比,这里选择和原始图片的大小进行比较,因为它是固定不变的,减少出错的几率,但是使用event_state.container_width也是可以的
			if (constrain || e.shiftKey) {
				height = width / orig_src.width * orig_src.height;
			}

			if (width > min_width && height > min_height && width < max_width && height < max_height) {
				// 提高性能的你可能会限制多久resizeimage()
				resizeImage(width, height);

				$container.offset({
					'left': left,
					'top': top
				});
			}
		};

		//调整图片大小
		resizeImage = function (width, height) {
			resize_canvas.width = width;
			resize_canvas.height = height;
			resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
			image_target.src = resize_canvas.toDataURL('image/png');
		};

		startMoving = function (e) {
			e.preventDefault();
			e.stopPropagation();
			saveEventState(e);
			$(document).on('mousemove', moving);
			$(document).on('mouseup', endMoving);
		};

		endMoving = function (e) {
			e.preventDefault();
			$(document).off('mouseup touchend');
			$(document).off('mousemove touchmove');
		};

		moving = function (e) {
			var mouse = {};
			e.preventDefault();
			e.stopPropagation();
			mouse.x = e.pageX + $(window).scrollLeft();
			mouse.y = e.pageY + $(window).scrollTop();

			$container.offset({
				'left': mouse.x - (event_state.mouse_x - event_state.container_left),
				'top': mouse.y - (event_state.mouse_y - event_state.container_top)
			});
		};

		//裁剪
		crop = function () {
			var crop_canvas,
				left = $('.overlay').offset().left - $container.offset().left,
				top = $('.overlay').offset().top - $container.offset().top,
				width = $('.overlay').width(),
				height = $('.overlay').height();

			crop_canvas = document.createElement("canvas");
			crop_canvas.width = width;
			crop_canvas.height = height;

			crop_canvas.getContext('2d').drawImage(image_target, left, top, width, height, 0, 0, width, height);
			window.open(crop_canvas.toDataURL("image/png"));
		};
		init();
	};

	resizeableImage($('.resize-image'));
});