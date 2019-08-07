// 展示所有demo的列表
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoListComponent} from './demo-list/demo-list.component';

import {demoListRouter} from './demo-list-router';

@NgModule({
  imports: [
    CommonModule,
    demoListRouter,
  ],
  declarations: [
    DemoListComponent,
  ]
})
export class DemoListModule {
}
