import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-form-control2',
  templateUrl: './custom-form-control2.component.html',
  styleUrls: ['./custom-form-control2.component.css']
})
export class CustomFormControl2Component implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userId: ''
    });
  }

  ngOnInit() {
    this.userForm.valueChanges.subscribe(val => console.log('dssssssssssss', val));
  }

  modelChange($event: any): void {
  }

}
