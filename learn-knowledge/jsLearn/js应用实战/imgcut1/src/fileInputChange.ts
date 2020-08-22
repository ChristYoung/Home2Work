export function fileInputChange() {
    const fileInput$ = document.getElementById('fileInput') as HTMLInputElement;
    const img$ = document.getElementById('imgContainer') as HTMLImageElement;
    fileInput$.addEventListener('change', (e) => {
        console.log('this', this);  // 箭头函数内部没有this, 箭头函数中的this是定义时绑定, 也就是this是继承父执行上下文
        const file = (e.target as HTMLInputElement).files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => img$.src = e.target.result as string;
    });
}