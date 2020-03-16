// 实现一个自定义表单控件, 并实现自定义验证器
// myForm.get('websiteUrl').errors, 表示一个formControl是否有错误
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

const pwdConfirmMatcher = (control: AbstractControl): { [key: string]: boolean } => {
  const pwd = control.get('pwd');
  const confirm = control.get('confirm');
  // 只在password输入值后才进行表单判断
  if (pwd.dirty) {
    return pwd.value === confirm.value ? null : { nomatch: true };
  }
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
      userId: ['', [Validators.required, Validators.minLength(6)]],
      account: this.fb.group({
        pwd: ['', Validators.required],
        confirm: ['', [
          Validators.pattern('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$'),
          Validators.minLength(3)]],
      }, { validators: pwdConfirmMatcher }) // 因为account是一个子formCGruop, 因此validator放置在整个子formGroup上, 在模板上验证是否含错的时候, 验证account.hasError
    });
    console.log('看下子formGroup的结构', this.reactiveForm.controls.account);
  }

}
