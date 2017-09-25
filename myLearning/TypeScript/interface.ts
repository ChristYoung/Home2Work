/**
 * Created by yangjie on 2017/9/22.
 *
 * 接口
 * 用来建立某种代码约定,使得其他开发者在调用某个方法或者创建新的类时必须遵循接口所定义的代码约定
 */
interface IPerson {
    name: string;
    age: number;
}

interface Animals {
    eat();
}

class Sheep implements Animals { //定义的sheep类必须实现Animals接口的方法
    eat() {
        console.log('i am eating');
    }
}

class Person {
    constructor(public config: IPerson) {

    }
}

var p1 = new Person({
    name:'zhangshan',
    age:22
})