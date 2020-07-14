import { Component, OnInit } from '@angular/core';
import { DemoListItem } from 'app/domain/demoListItem';

import { RouterService } from 'app/libs/service/router.service';
import { PathLibrary } from 'app/public/path-library';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.css']
})
export class DemoListComponent implements OnInit {

  demoListItem: Array<DemoListItem>;

  constructor(private routerService: RouterService) {

    this.demoListItem = [
      {
        demoClass: '入门case',
        demoItems: [
          { demoName: '文章发布组件(ArticleListComponent)', demoRouter: PathLibrary.moduleName_article + '/' + PathLibrary.articleList },
        ]
      },
      {
        demoClass: 'Angular表单',
        demoItems: [
          { demoName: '模板驱动型表单(userLoginComponent)', demoRouter: PathLibrary.moduleName_form + '/' + PathLibrary.userLoginForm },
          { demoName: '响应式表单(ReactiveFormComponent)', demoRouter: PathLibrary.moduleName_form + '/' + PathLibrary.reactiveForm },
          { demoName: '实现一个自定义表单控件(ReactiveFormValidateComponent)', demoRouter: PathLibrary.moduleName_form + '/' + PathLibrary.reactiveFormValidate1 },
          { demoName: '动态验证Reactive表单', demoRouter: PathLibrary.moduleName_form + '/' + PathLibrary.validateReactiveFormDynamicly },
        ]
      },
      {
        demoClass: 'Angular动态',
        demoItems: [
          { demoName: '内容投影(WrapperComponent)', demoRouter: PathLibrary.moduleName_ngContent + '/' + PathLibrary.ngContent },
          { demoName: '动态组件(DynamicContanierComponent)', demoRouter: PathLibrary.moduleName_ngContent + '/' + PathLibrary.dynamicContainer },
        ]
      },
      {
        demoClass: '指令',
        demoItems: [
          { demoName: 'debounce click指令(DebounceClickComponent)', demoRouter: PathLibrary.moduleName_directive + '/' + PathLibrary.debounceClick },
          { demoName: '实现一个可拖拽的指令(DragComponent)', demoRouter: PathLibrary.moduleName_directive + '/' + PathLibrary.drag },
          { demoName: '实现一个结构型指令range(RangeComponent)', demoRouter: PathLibrary.moduleName_directive + '/' + PathLibrary.range },
        ]
      },
      {
        demoClass: '变更检测',
        demoItems: [
          { demoName: '学习变更检测1, 此demo来自于https://zhuanlan.zhihu.com/p/37553497(ChangeDetection1Component)', demoRouter: PathLibrary.moduleName_changeDetection + '/' + PathLibrary.changeDetection1 },
        ]
      },
      {
        demoClass: '管道',
        demoItems: [
          { demoName: 'Angular管道(PipesDemoComponent)', demoRouter: PathLibrary.moduleName_pipes + '/' + PathLibrary.pipesDemo }
        ]
      },
      {
        demoClass: '子路由',
        demoItems: [
          { demoName: '子路由应用', demoRouter: PathLibrary.moduleName_ChildRoutes + '/' + PathLibrary.childRoutesBox }
        ]
      },
      {
        demoClass: '学习使用编译器和工厂方法构建动态组件',
        demoItems: [
          { demoName: '学习使用编译器和工厂方法构建动态组件(ContainerComponent)', demoRouter: PathLibrary.moduleName_compilerAndFactory + '/' + PathLibrary.dynamicContainerByFactory },
          { demoName: '根据用户的输入动态编译组件template(RunTimeCompilerComponent', demoRouter: PathLibrary.moduleName_compilerAndFactory + '/' + PathLibrary.runTimeCompiler },
          {
            demoName: 'Angular自定义渲染模板, 此demo来自https://zhuanlan.zhihu.com/p/146501023?utm_source=wechat_session&utm_medium=social&utm_oi=557177781184700416',
            demoRouter: PathLibrary.moduleName_compilerAndFactory + '/' + PathLibrary.customRender
          },
        ]
      }
    ];
  }

  ngOnInit() {
  }

  demoListItemClicked(demoRouter: string): void {
    this.routerService.goTo([demoRouter]);
  }

}
