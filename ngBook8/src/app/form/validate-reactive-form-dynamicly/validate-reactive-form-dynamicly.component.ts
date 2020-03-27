// 动态验证Angular响应式表单
// https://netbasal.com/three-ways-to-dynamically-alter-your-form-validation-in-angular-e5fd15f1e946

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-validate-reactive-form-dynamicly',
  templateUrl: './validate-reactive-form-dynamicly.component.html',
  styleUrls: ['./validate-reactive-form-dynamicly.component.css']
})
export class ValidateReactiveFormDynamiclyComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      optionA: new FormControl(false),
      optionB: new FormControl(false),
      optionC: new FormControl(false),
      optionCExtra: new FormControl('')
    });

    // 根据optionB被选中动态新增optionBExtra输入框
    this.optionB.valueChanges.subscribe(checked => {
      if (checked) {
        const validators = [ Validators.required, Validators.minLength(5) ];
        this.form.addControl('optionBExtra', new FormControl('', validators));
      } else {
        this.form.removeControl('optionBExtra');
      }
      // 针对optionBExtra执行一次验证
      this.optionBExtra.updateValueAndValidity(); // We also call the form’s updateValueAndValidity() method, as we need to recalculate the value and validation status of the form.
    });

    // 根据optionC被选中的状态动态新增optionCExtra输入框的验证规则
    this.optionC.valueChanges.subscribe(checked => {
      if (checked) {
        this.optionCExtra.setValidators([Validators.required, Validators.minLength(5)]);
      } else {
        this.optionCExtra.setValidators(null);
      }
      // 针对optionCExtra执行一次验证
      this.optionCExtra.updateValueAndValidity();
    });

  }

  get optionB() {
    return this.form.get('optionB') as FormControl;
  }

  get optionC() {
    return this.form.get('optionC') as FormControl;
  }

  get optionBExtra() {
    return this.form.get('optionBExtra') as FormControl;
  }

  get optionCExtra() {
    return this.form.get('optionCExtra') as FormControl;
  }

}
