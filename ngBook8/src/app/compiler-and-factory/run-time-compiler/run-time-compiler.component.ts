// 根据用户的输入动态编译组件
import {
  Compiler,
  Component,
  ComponentFactory, ComponentRef,
  ModuleWithComponentFactories,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-run-time-compiler',
  templateUrl: './run-time-compiler.component.html',
  styleUrls: ['./run-time-compiler.component.css']
})
export class RunTimeCompilerComponent implements OnInit {

  @ViewChild('vc', {read: ViewContainerRef, static: true})
  container: ViewContainerRef;

  template: string; // 用户输入的动态html模板
  componentRef: ComponentRef<any>; // 动态创建的组件引用

  constructor(private _compiler: Compiler) {
  }

  ngOnInit() {
  }

  // createComponentFactorySync函数需要一个自定义元数据（metadata）和可选的组件类（componentClass）
  // 创建组件，如果没有提供组件类，则使用RuntimeComponent类，创建组件，然后用metadata装饰组件
  private createComponentFactorySync(
    compiler: Compiler,
    metadata: Component,
    componentClass: any
  ): ComponentFactory<any> {
    const cmpClass = componentClass || class RunTimeComponent {
      name = 'denys';
    };
    const decorateCmp = Component(metadata)(cmpClass);

    // 声明RuntimeComponentModule 模块，模块中导入CommonModule
    // 并且在declarations属性中声明了先前定义的 decoratedCmp 组件
    @NgModule({imports: [CommonModule], declarations: [decorateCmp]})
    class RunTimeComponentModule {
    }

    // 最后该函数用angular的Compiler服务编译模块及其组件
    // 编译后的模块提供对底层组件工厂的访问，这个工厂正是我们需要的
    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RunTimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decorateCmp);
  }

  // 编译用户在文本框中输入的template
  compileInputTemplateByUser(): void {
    const metadata = {
      selector: `runtime-component-sample`,
      template: this.template,
    };

    const factory = this.createComponentFactorySync(this._compiler, metadata, null);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.componentRef = this.container.createComponent(factory);
  }

}
