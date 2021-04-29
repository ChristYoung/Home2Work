// 模块内的路由配置
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PathLibrary} from 'app/public/path-library';

import {WrapperComponent} from 'app/ng-content/wrapper/wrapper.component';
import {DynamicContanierComponent} from 'app/ng-content/dynamic-contanier/dynamic-contanier.component';
import { NgTemplateComponent } from './ng-template/ng-template.component';

const routes: Routes = [
  {path: PathLibrary.ngContent, component: WrapperComponent},
  {path: PathLibrary.dynamicContainer, component: DynamicContanierComponent},
  {path: PathLibrary.ngTemplate, component: NgTemplateComponent},
];

export const ngContentRouter: ModuleWithProviders = RouterModule.forChild(routes);
