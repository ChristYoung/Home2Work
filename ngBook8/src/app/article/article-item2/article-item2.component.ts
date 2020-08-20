import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ArticleItem2 } from 'app/domain/article-item';

@Component({
  selector: 'app-article-item2',
  templateUrl: './article-item2.component.html',
  styleUrls: ['./article-item2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleItem2Component implements OnInit, OnChanges {

  @Input() articleItem2: ArticleItem2;

  constructor() { }

  ngOnInit() {
    // this.articleItem2.selecteCheck = this.articleItem2.selecteCheck ? this.articleItem2.selecteCheck : [];
  }

  ngOnChanges(): void {
    console.log("ArticleItem2Component -> articleItem2", this.articleItem2);
  }

  changeA2(): void {
    // 该代码修改了articleItem2的内存指向, 将articleItem2重新赋值, 开辟了一个新的内存, 因此, 他的变化不会修改到父组件.
    // this.articleItem2 = { name: 'lhsgsb', title: '555', optSelectedId: [] };

    // 该代码没有给articleItem2重新赋值, 他的内存指向和父组件中的一致, 因此修改articleItem2的name属性, 会同步修改父组件的数据.
    this.articleItem2.name = 'lhsgdsb';
  }

}
