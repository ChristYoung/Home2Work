// 模块内的路由配置
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathLibrary } from 'app/public/path-library';

import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReactiveFormValidateComponent } from './reactive-form-validate/reactive-form-validate.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CustomFormControl2Component } from './custom-form-control2/custom-form-control2.component';

const routes: Routes = [
  { path: PathLibrary.reactiveForm, component: ReactiveFormComponent },
  { path: PathLibrary.reactiveFormValidate1, component: ReactiveFormValidateComponent },
  { path: PathLibrary.userLoginForm, component: UserLoginComponent },
  { path: PathLibrary.reactiveFormValidate2, component: CustomFormControl2Component },
];

export const formRouter: ModuleWithProviders = RouterModule.forChild(routes);
