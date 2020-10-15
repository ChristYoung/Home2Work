import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormValidateComponent } from './reactive-form-validate/reactive-form-validate.component';
import { CustomFormControlComponent } from './custom-form-control/custom-form-control.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ValidateReactiveFormDynamiclyComponent } from './validate-reactive-form-dynamicly/validate-reactive-form-dynamicly.component';
import { NestedFormComponent } from './nested-form/nested-form.component';

import { formRouter } from './form-router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    formRouter,
  ],
  declarations: [
    ReactiveFormComponent,
    UserLoginComponent,
    ReactiveFormValidateComponent,
    CustomFormControlComponent,
    AgeInputComponent,
    ValidateReactiveFormDynamiclyComponent,
    NestedFormComponent,
  ]
})
export class FormModule {
}
