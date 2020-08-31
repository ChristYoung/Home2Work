import $ from 'jquery';
import { CfgOptions } from './domain/cfg.domain';
import { EventState } from './domain/event-state.domain';

export class ResizeAbleImage {

    cfgOptions: CfgOptions;
    resizeContianer: JQuery<HTMLElement> = null;
    eventState: Partial<EventState> = {};

    constructor(targetImg: JQuery<HTMLImageElement>, cfg?: CfgOptions) {
        this.cfgOptions = cfg ? cfg : {
            image_target: targetImg.get(0),
            orgic: new Image(),
            min_width: 60,
            min_height: 60,
            max_width: 8800,
            max_height: 8800,
            resize_canvas: document.createElement('canvas'),
        }
        this.init();
    }

    private init(): void {
        this.cfgOptions.orgic.src = this.cfgOptions.image_target.src;

        // 用div容器包装图像,并添加大小手柄
        // wrap() 方法把每个被选元素放置在指定的 HTML 内容或元素中,此处即用div包裹image
        $(this.cfgOptions.image_target).wrap('<div class="resize-container"></div>')
            .before('<span class="resize-handle resize-handle-nw"></span>')
            .before('<span class="resize-handle resize-handle-ne"></span>')
            .after('<span class="resize-handle resize-handle-se"></span>')
            .after('<span class="resize-handle resize-handle-sw"></span>');

        // 给移动图片的容器绑定事件    
        this.resizeContianer = $(this.cfgOptions.image_target).parent('.resize-container');
    }

    // 保存事件状态(在进行图片移动或者大小调整前,先将相关状态保存下来)
    saveEventState(e: MouseEvent): void {
        this.eventState = {
            con_width: this.resizeContianer.width(),
            con_height: this.resizeContianer.height(),
            con_left: this.resizeContianer.offset().left,
            con_top: this.resizeContianer.offset().top,
            mouseX: e.pageX + $(window).scrollLeft(),
            mouseY: e.pageY + $(window).scrollTop(),
            event: e,
        };
    }

    // 开始移动
    private startMoving(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this.saveEventState(e);
        $(document).mousemove((e: any) => this.moving(e));
        $(document).mouseup((e: any) => this.moving(e));
    }

    // 正在移动
    private moving(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        const mouse: { x: number, y: number } = { x: e.pageX + $(window).scrollLeft(), y: e.pageY + $(window).scrollTop() };
        this.resizeContianer.offset({
            left: mouse.x - (this.eventState.mouseX - this.eventState.con_left),
            top: mouse.y - (this.eventState.mouseY - this.eventState.con_top)
        });
    }

    // 结束移动
    private endMoving(e: MouseEvent): void {

    }
}
