// 自定义结构型指令
// 以上示例中，我们在调用 createEmbeddedView() 方法时，设置了第二个参数 {$implicit: num} 。Angular 为我们提供了 let 模板语法，允许在生成上下文时定义和传递上下文
// 详见https://segmentfault.com/a/1190000009307714
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appRange]'
})
export class StructureRangeDirective {

  _range: number[];

  constructor(private vcr: ViewContainerRef, private tpl: TemplateRef<any>) {
  }

  @Input()
  set appRange(value: number[]) {
    console.log('StructureRangeDirective -> setappRange -> value', value);
    this.vcr.clear();
    this._range = StructureRangeDirective.getRange(value[0], value[1]);
    this._range.forEach((num: number) => {
      this.vcr.createEmbeddedView(this.tpl, { $implicit: num });
    });
  }

  private static getRange(from: number, to: number): number[] {
    const nums: number[] = [];
    for (let i = from; i <= to; i++) {
      nums.push(i);
    }
    return nums;
  }

}
