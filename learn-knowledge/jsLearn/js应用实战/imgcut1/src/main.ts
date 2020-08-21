// 1. 获取文件并读取文件
const fileInputChange = () => {
    const fileInput$ = document.getElementById('fileInput') as HTMLInputElement;
    const img$ = document.getElementById('imgContainer') as HTMLImageElement;
    fileInput$.onchange = (e: Event) => {
        const file = fileInput$.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => img$.src = e.target.result as string;
    }
}
fileInputChange();

