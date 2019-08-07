import {Component, OnInit, Input} from '@angular/core';

import {User} from 'app/domain/user-model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public user: User = new User();
  public error: Error;

  constructor() {
  }

  ngOnInit() {
  }

  public doLogin(f): void {
    console.log('form', f); // f是NgForm类型
    console.log('form.submitted', f.submitted);
    console.log('form.valid', f.valid);
    console.log('form.form.valid', f.form.valid);
    console.log('form.form', f.form);
  }

  public doLogout(): void {
  }

  public forgetPwd(): void {
  }
}
