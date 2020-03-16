// @ts-check
// 可索引接口(用于描述对象字面量的类型)
interface UserArr {
    [index: number]: string;
}

const user: UserArr = ['1', '3'];