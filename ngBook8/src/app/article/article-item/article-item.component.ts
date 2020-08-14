import { Component, Input, OnInit } from '@angular/core';
import { ArticleItem } from 'app/domain/article-item';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input()
  articleItem: ArticleItem;

  constructor() {
  }

  ngOnInit() {
    // this.voteUp();
    this.articleItem = new ArticleItem('oooddd', '999');
  }

  voteUp(): void {
    this.articleItem.voteUp();
  }

  voteDown(): void {
    this.articleItem.voteDown();
  }

}
