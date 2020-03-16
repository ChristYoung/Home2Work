import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

import { formRouter } from './form-router';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormValidateComponent } from './reactive-form-validate/reactive-form-validate.component';
import { CustomFormControlComponent } from './custom-form-control/custom-form-control.component';
import { AgeInputComponent } from './age-input/age-input.component';

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
  ]
})
export class FormModule {
}
