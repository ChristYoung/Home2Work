type Foo<T> = T;
const a: Foo<string> = '5';
// const b: Foo<string> = 8;

// infer表示在 extends 条件语句中待推断的类型变量
// 如果 T 能赋值给 (param: infer P) => any，则结果是 (param: infer P) => any 类型中的参数 P，否则返回为 T
type ParamType<T> = T extends (params: infer P) => any ? P : T;
interface User {
    name: string;
    age?: number;
    gender: number;
}
type Func = (user: User) => void;
type Param = ParamType<Func>; // 表示的类型是User
type AA = ParamType<string>; // 表示的类型是string

const p: Param = { name: 'lh', gender: 1 };
const aa: AA = '7';

