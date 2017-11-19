var Sheep = (function () {
    function Sheep() {
    }
    Sheep.prototype.eat = function () {
        console.log('i am eating');
    };
    return Sheep;
}());
var Person = (function () {
    function Person(config) {
        this.config = config;
    }
    return Person;
}());
var p1 = new Person({
    name: 'zhangshan',
    age: 22
});
