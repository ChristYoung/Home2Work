// 通过ControlValueAccessor接口实现一个自定义的表单控件
import {Component, OnInit, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup} from '@angular/forms';

class ImageListItem {
  imageUrl: string;
  imageValue: string;
  imageTitle?: string;
}

@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomFormControlComponent),
      multi: true
    }
  ]
})
export class CustomFormControlComponent implements ControlValueAccessor {

  imageList: Array<ImageListItem>;

  selected: string;

  constructor() {
    this.imageList = [
      {imageTitle: '住院缴费记录', imageValue: 'inpatient_pay', imageUrl: 'assets/images/icon_hospitalpayrecord.png'},
      {imageTitle: '我的缴费记录', imageValue: 'my_record', imageUrl: 'assets/images/icon_mypaymentrecord.png'},
      {imageTitle: '一卡通充值', imageValue: 'ecard_pay', imageUrl: 'assets/images/icon_one-card-recharge.png'},
      {imageTitle: '门诊缴费', imageValue: 'outpatient_pay', imageUrl: 'assets/images/icon_outpatient-payment.png'},
      {imageTitle: '去支付', imageValue: 'go_pay', imageUrl: 'assets/images/icon_pay.png'},
    ];
  }

  private propagateChange = (_: any) => {};

  onChange(i: number) {
    this.selected = this.imageList[i].imageUrl;
    this.propagateChange(this.selected);
  }

  /*writeValue, registerOnChange, registerOnTouched这三个方法是ControlValueAccessor接口上的三个方法, 都是在表单初始化后立即执行*/

  writeValue(obj: any): void {
    console.log('writeValue', obj);
    this.selected = obj;
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange', fn);
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }


}
