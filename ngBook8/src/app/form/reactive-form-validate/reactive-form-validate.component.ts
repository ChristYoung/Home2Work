// 实现一个自定义表单控件, 并实现自定义验证器
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

const pwdConfirmMatcher = (control: AbstractControl): { [key: string]: boolean } => {
  const pwd = control.get('pwd');
  const confirm = control.get('confirm');
  if (!pwd && !confirm) { return null; }
  return pwd.value === confirm.value ? null : { nomatch: true };
};

@Component({
  selector: 'app-reactive-form-validate',
  templateUrl: './reactive-form-validate.component.html',
  styleUrls: ['./reactive-form-validate.component.css']
})
export class ReactiveFormValidateComponent implements OnInit {

  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    const avatarUrl = 'assets/images/icon_pay.png';
    this.reactiveForm = this.fb.group({
      userName: ['杨杰', Validators.required],
      avatar: [avatarUrl],
      userId: [''],
      account: this.fb.group({
        pwd: ['', Validators.required],
        confirm: ['', Validators.required],
      }, { validator: pwdConfirmMatcher })
    });
  }

}
