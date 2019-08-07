// 模块内的路由配置
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PathLibrary} from 'app/public/path-library';

import {DemoListComponent} from './demo-list/demo-list.component';

const routes: Routes = [
  {path: PathLibrary.demoList, component: DemoListComponent},
];

export const demoListRouter: ModuleWithProviders = RouterModule.forChild(routes);
