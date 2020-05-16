// 装饰器

//-------------------------------------------------
// 类装饰器
// 第一个装饰器

function logClass(params: any) {
   console.log(params); // params就是当前被装饰的类
   params.prototype.apiUrls = params; // 可以对类进行扩展
}

@logClass()
class HttpClient {
    constructor() {

    }
}

// ---------------------------------------------
// 装饰器工厂(带参数的装饰器)
function logClass2(params: string) {
    // target就是被装饰的对象
    return (target: any) => {
      console.log(target);
      console.log(params);
    }
}

@logClass2('hello')
class HttpClient2 {
    constructor() {

    }
}