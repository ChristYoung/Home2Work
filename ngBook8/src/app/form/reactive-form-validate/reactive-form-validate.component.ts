import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

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
      userName: ['杨杰'],
      pwd: ['sdsdsd'],
      avatar: [avatarUrl],
      userId: ['']
    });
  }

}
