/**
 * Created by yangjie on 2017/9/22.
 *
 * 泛型,参数化的类型,一般用来限制集合的内容
 */
class Person {

    protected gender //在类的内部和继承的子类中可以被访问到

    public id; //访问控制符,表示在该方法或者属性在类的内部和外部都能被访问到

    private age; //private只能在类的内部被访问

    constructor(public name:string) {} //构造函数方法只能在new的时候被调用且只能被调用一次

    eat() {
        console.log("i am eating");
    }
}
var workers: Array<Person> = []; //泛型
workers[0] = new Person('战三');