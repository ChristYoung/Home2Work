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

}
