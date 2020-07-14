// 尝试使用子路由
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildRoutesBoxComponent } from './child-routes-box/child-routes-box.component';
import { ChildRoutesRoutingModule } from './child-routes-routing.module';
import { ChildAComponent } from './child-a/child-a.component';
import { ChildBComponent } from './child-b/child-b.component';

@NgModule({
  declarations: [ChildRoutesBoxComponent, ChildAComponent, ChildBComponent],
  imports: [
    CommonModule,
    ChildRoutesRoutingModule,
  ]
})
export class ChildRoutesModule { }
