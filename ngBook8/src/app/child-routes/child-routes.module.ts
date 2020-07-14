// 尝试使用子路由
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildRoutesBoxComponent } from './child-routes-box/child-routes-box.component';
import { ChildRoutesRoutingModule } from './child-routes-routing.module';

@NgModule({
  declarations: [ChildRoutesBoxComponent],
  imports: [
    CommonModule,
    ChildRoutesRoutingModule,
  ]
})
export class ChildRoutesModule { }
