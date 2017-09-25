/**
 * Created by yangjie on 2017/9/22.
 */
var arr1 = [1, 2, 3, 4, 5];
function getStock(name) {
    var _this = this;
    this.name = name;
    setInterval(function () {
        console.log(_this.name);
    }, 1000);
}
;
arr1.forEach(function (item) { return console.log(item); }); //不可以break
for (var _i = 0, arr1_1 = arr1; _i < arr1_1.length; _i++) {
    var n = arr1_1[_i];
    if (n > 2)
        break;
    console.log(n);
}
console.log(arr1.filter(function (value) { return value % 2 == 0; }));
console.log(getStock("IBM"));
