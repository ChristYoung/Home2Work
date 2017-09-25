/**
 * Created by yangjie on 2017/9/22.
 */
class person {

    protected gender //在类的内部和继承的子类中可以被访问到

    public id; //访问控制符,表示在该方法或者属性在类的内部和外部都能被访问到

    private age; //private只能在类的内部被访问

    constructor(public name:string) {} //构造函数方法只能在new的时候被调用且只能被调用一次

    eat() {
        console.log("i am eating");
    }
}


var p1 = new person('batman');
p1.eat();

/*
* 类的继承
* */
class employee extends person {

    constructor(name: string, code: string) {
        super(name); //super关键字调用父类的构造方法
        this.code = code;
    }

    code: string;

    work() {
      super.eat();
      this.doWork();
    }

    private doWork() { //私有方法
        console.log('i am working');
    }
}

var e1 = new employee('kefa','001');
e1.eat();
e1.work();