var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by yangjie on 2017/9/22.
 */
var person = (function () {
    function person(name) {
        this.name = name;
    } //构造函数方法只能在new的时候被调用且只能被调用一次
    person.prototype.eat = function () {
        console.log("i am eating");
    };
    return person;
}());
var p1 = new person('batman');
p1.eat();
/*
* 类的继承
* */
var employee = (function (_super) {
    __extends(employee, _super);
    function employee(name, code) {
        var _this = _super.call(this, name) || this;
        _this.code = code;
        return _this;
    }
    employee.prototype.work = function () {
        _super.prototype.eat.call(this);
        this.doWork();
    };
    employee.prototype.doWork = function () {
        console.log('i am working');
    };
    return employee;
}(person));
var e1 = new employee('kefa', '001');
e1.eat();
e1.work();
