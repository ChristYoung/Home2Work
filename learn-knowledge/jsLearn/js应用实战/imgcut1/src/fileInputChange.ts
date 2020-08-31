// 引入jquery
import $ from 'jquery';


// 读取图片文件base64码并预览在页面上.
export function fileInputChange() {
    const fileInput$ = $('#fileInput');
    const img$ = $('#imgContainer');
    fileInput$.change(e => {
        console.log('this', this);  // 箭头函数内部没有this, 箭头函数中的this是定义时绑定, 也就是this是继承父执行上下文, 因此此处的this是整个fileInputChange.ts对象
        console.log('eee', e);
        const file = (e.target as HTMLInputElement).files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => img$.attr('src', e.target.result as string);
    });
}

// 使得图片可以拖拽
export function makeImgMoveable(): void {

}