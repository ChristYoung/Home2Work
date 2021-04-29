import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WrapperComponent} from './wrapper/wrapper.component';
import {ngContentRouter} from 'app/ng-content/ng-content-router';
import {CounterComponent} from './counter/counter.component';
import {CounterWrapperComponent} from './counter-wrapper/counter-wrapper.component';
import {CounterTwoComponent} from './counter-two/counter-two.component';
import {DynamicContanierComponent} from './dynamic-contanier/dynamic-contanier.component';
import {DynamicChild1Component} from './dynamic-child1/dynamic-child1.component';
import {DynamicChild2Component} from './dynamic-child2/dynamic-child2.component';
import { NgTemplateComponent } from './ng-template/ng-template.component';
import { NgTemplateChildComponent } from './ng-template/ng-template-child/ng-template-child.component';

@NgModule({
  imports: [
    CommonModule,
    ngContentRouter,
  ],
  declarations: [
    WrapperComponent,
    CounterComponent,
    CounterWrapperComponent,
    CounterTwoComponent,
    DynamicContanierComponent,
    DynamicChild1Component,
    DynamicChild2Component,
    NgTemplateComponent,
    NgTemplateChildComponent,
  ],
  entryComponents: [
    DynamicChild1Component,
    DynamicChild2Component,
  ]
})
export class NgContentModule {
}
