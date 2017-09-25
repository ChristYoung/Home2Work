/**
 * Created by yangjie on 2017/9/22.
 */
var arr1 = [1,2,3,4,5];

function getStock(name:string) {
    this.name = name;
    setInterval(() => {
        console.log(this.name);
    },1000)
};

arr1.forEach(item => console.log(item)); //不可以break
for(var n of arr1){
    if(n>2) break;
    console.log(n)
}

console.log(arr1.filter(value => value%2==0));

console.log(getStock("IBM"));