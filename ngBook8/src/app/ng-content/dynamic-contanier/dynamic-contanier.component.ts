// 演示动态组件的容器组件
import {AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DynamicChild1Component} from 'app/ng-content/dynamic-child1/dynamic-child1.component';
import {DynamicChild2Component} from 'app/ng-content/dynamic-child2/dynamic-child2.component';

@Component({
  selector: 'app-dynamic-contanier',
  templateUrl: './dynamic-contanier.component.html',
  styleUrls: ['./dynamic-contanier.component.css']
})
export class DynamicContanierComponent implements OnInit, AfterContentInit {

  @ViewChild('dyncomp', {read: ViewContainerRef, static: true})
  dyncomp: ViewContainerRef;

  cmp1: ComponentRef<DynamicChild1Component>;
  cmp2: ComponentRef<DynamicChild2Component>;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log('动态组件创建的实例');
    const child1 = this.resolver.resolveComponentFactory(DynamicChild1Component);
    const child2 = this.resolver.resolveComponentFactory(DynamicChild2Component);

    this.cmp1 = this.dyncomp.createComponent(child1);
    this.cmp1.instance.title = '这是第一个动态组件';

    this.cmp2 = this.dyncomp.createComponent(child2);
    this.cmp2.instance.title = '这是第二个动态组件';
    this.cmp2.instance.trigger.subscribe(item => alert(item));

    // 可以创建多个动态组件
    const temp1 = this.dyncomp.createComponent(child1);
    temp1.instance.title = '这是第3个动态组件';

    const temp2 = this.dyncomp.createComponent(child1);
    temp2.instance.title = '这是第4个动态组件';

    const temp3 = this.dyncomp.createComponent(child2);
    temp3.instance.title = '这是第5个动态组件';
    temp3.instance.destory.subscribe(item => {
      if (item) {
        temp3.destroy();
      }
    });
  }

  destroyAllChild(): void {
    this.cmp1.destroy();
    this.cmp2.destroy();
  }


}
