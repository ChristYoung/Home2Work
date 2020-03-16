import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'app/domain/user-model';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  public userForm: FormGroup;
  public userInfo: User = new User();

  public formErrors = {
    userName: '',
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
    formError: '',
    vcode: ''
  };
  validationMessages = {
    userName: {
      required: '用户名必须输入。',
      minlength: '用户名4到32个字符。'
    },
    nickName: {
      required: '昵称必须输入。',
      minlength: '昵称2到32个字符。'
    },
    email: {
      required: '邮箱必须输入。',
      pattern: '请输入正确的邮箱地址。'
    },
    password: {
      required: '密码必须输入。',
      minlength: '密码至少要8位。'
    },
    confirmPassword: {
      required: '重复密码必须输入。',
      minlength: '密码至少要8位。',
      validateEqual: '两次输入的密码不一致'
    },
    vcode: {
      required: '验证码必须输入',
      minlength: '4位验证码',
      maxlength: '4位验证码'
    },
  };

  constructor(public fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      userName: [
        this.userInfo.userName,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
      nickName: [
        this.userInfo.nickName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32)
        ]
      ],
      email: [
        this.userInfo.email,
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$')
        ]
      ],
      password: [
        this.userInfo.password,
        [
          Validators.required,
          Validators.minLength(8),
        ]
      ],
      confirmPassword: [
        this.userInfo.confirmPassword,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      vcode: [
        this.userInfo.vcode,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ]
      ]
    });
    this.userForm.valueChanges
      .subscribe(data => {
        console.log('当前表单的变更数据是: ', data);
        this.onValueChanged(data);
      });
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  doRegister() {
    if (this.userForm.valid) {
      this.userInfo = Object.assign(new User(), this.userForm.value);
      console.log(JSON.stringify(this.userInfo));
    } else {
      this.formErrors.formError = '存在不合法的输入项，请检查';
    }
    console.log(this.userInfo);
  }

  testEmail() {
    const email = this.userForm.get('email').value;
    console.log(email);
  }
}
