import $ from 'jquery'; // 引入jquery

export interface CfgOptions {
    image_target: HTMLImageElement;
    orgic: HTMLImageElement;
    min_width: number;
    min_height: number;
    max_width: number;
    max_height: number;
    resize_canvas: HTMLElementTagNameMap['canvas'];
}

export class ResizeAbleImage {

    constructor(cfg: CfgOptions) {
    }

    private init(): void {

    }
}
