import { Component, OnInit, Input } from '@angular/core';
import { ArticleItem2 } from 'app/domain/article-item';

@Component({
  selector: 'app-article-item2',
  templateUrl: './article-item2.component.html',
  styleUrls: ['./article-item2.component.css']
})
export class ArticleItem2Component implements OnInit {

  @Input() articleItem2: ArticleItem2;

  constructor() { }

  ngOnInit() {
    this.articleItem2.selecteCheck = this.articleItem2.selecteCheck ? this.articleItem2.selecteCheck : [];
  }

}
