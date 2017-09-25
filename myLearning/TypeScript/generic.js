/**
 * Created by yangjie on 2017/9/22.
 *
 * 泛型,参数化的类型,一般用来限制集合的内容
 */
var Person = (function () {
    function Person(name) {
        this.name = name;
    } //构造函数方法只能在new的时候被调用且只能被调用一次
    Person.prototype.eat = function () {
        console.log("i am eating");
    };
    return Person;
}());
var workers = []; //泛型
workers[0] = new Person('战三');
