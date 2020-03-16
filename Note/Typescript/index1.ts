/*泛型就是解决类 接口 方法的复用性, 以及对不特定数据类型的支持, 即将约束的权力给到调用者*/

// -------------------泛型函数----------------------------------
// T表示泛型, 具体什么类型是调用这个方法的时候决定的
function getData<T>(val: T): T {
  return val;
}

getData<string>('123');
getData<number>(22);
// -----------------------------------------------------

// ------------------泛型接口------------------------------------
interface ConfigFn<T> {
    (value: T): T;
}

const getConfig: ConfigFn<string> = (val: string) => val;
getConfig('lisicy');