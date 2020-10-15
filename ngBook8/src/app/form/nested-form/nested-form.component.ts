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
    // 初始化表单构建
    this.validateForm = this.fb.group({
      workFlowName: [null, [Validators.required]],
      workFlowType: [null, [Validators.required]],
      workFlowContent: this.fb.array([ // formArray嵌套
        this.fb.group({
          stageName: [null, [Validators.required]],
          stageType: [null, [Validators.required]],
          stageContent: this.fb.array([
            this.fb.control(null)
          ]),
        })
      ])
    });
  }

  ngOnInit() {
  }

}
