1）用js实现读取出字符串中每个字符重复出现的次数
var str = 'aaaabacddbdcc';
var temp = {};
str.replace(/(\w{1})/g,function($1){
   temp[$1] ? temp[$1]+=1 : temp[$1] = 1;
})
console.log(temp) // {a: 3, b: 2, c: 2, d: 1}
