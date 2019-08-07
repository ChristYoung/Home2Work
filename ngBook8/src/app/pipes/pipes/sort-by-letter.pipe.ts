// 按照中文首字母顺序排序
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortByLetter'
})
export class SortByLetterPipe implements PipeTransform {

  transform(value: Array<any>, key?: any): any {
    if (key) {
      if (!value) { return value; }
      const valueKeyArray = value.map(valueItem => valueItem[key]);
      console.log(JSON.stringify(valueKeyArray));
      return valueKeyArray
        .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}));
    } else {
      return value
        .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}));
    }
  }

}
