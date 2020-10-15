// 表单嵌套组件
// 多个formGroup嵌套
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nested-form',
  templateUrl: './nested-form.component.html',
  styleUrls: ['./nested-form.component.css']
})
export class NestedFormComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group({
      workFlowName: [null, [Validators.required]],
      workFlowType: [null, [Validators.required]],
      workFlowContent: this.fb.array([
        this.fb.control(null)
      ])
    });
  }

  ngOnInit() {
  }

}
