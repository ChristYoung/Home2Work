// 数据结构--栈(先进后出)
export class Stack<T> {

    private items: T[];

    constructor() {
        this.items = [];
    }

    // 添加元素到栈顶, 也就是栈的末尾
    push(ele: T): void {
        this.items.push(ele);
    }

    // 移除栈顶的元素, 同时返回被移除的元素
    pop(): T {
        return this.items.pop();
    }

    // 查看栈顶的元素
    peek(): T {
        return this.items[this.items.length - 1];
    }

    // 检查栈是否是空
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

}
