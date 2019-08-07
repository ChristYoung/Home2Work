// 变更检测的相关模块
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {changeDetectionRouter} from 'app/change-detection/change-detection-router';
import {ChangeDetection1Component} from './change-detection1/change-detection1.component';
import {HeroShowListComponent} from './hero-show-list/hero-show-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    changeDetectionRouter,
  ],
  declarations: [ChangeDetection1Component, HeroShowListComponent]
})
export class ChangeDetectionModule {
}
