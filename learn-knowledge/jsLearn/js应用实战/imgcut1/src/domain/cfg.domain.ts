// ResizeAbleImage 对象的入参
export interface CfgOptions {
    image_target: HTMLImageElement;
    orgic: HTMLImageElement;
    min_width: number;
    min_height: number;
    max_width: number;
    max_height: number;
    resize_canvas: HTMLElementTagNameMap['canvas'];
}
