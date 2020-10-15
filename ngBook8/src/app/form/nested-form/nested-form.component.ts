// 表单嵌套组件
// 多个formGroup嵌套

// 参考CSDN地址:
// https://blog.csdn.net/wjyyhhxit/article/details/92730621?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522159341234019724843352603%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=159341234019724843352603&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v25-2-92730621.nonecase&utm_term=formarray+formgroup%E5%8C%BA%E5%88%AB 
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  get workFlowContent() {
    return this.validateForm.get('workFlowContent') as FormArray;
  }

  addStage(): void {
    this.workFlowContent.push(
      this.fb.group({
        stageName: [null, [Validators.required]],
        stageType: [null, [Validators.required]],
        stageContent: this.fb.array([
          this.fb.control(null)
        ]),
      })
    );
  }

  removeStage(workflowIndex: number): void {
    this.workFlowContent.removeAt(workflowIndex);
  }

  ngOnInit() {
  }

}
