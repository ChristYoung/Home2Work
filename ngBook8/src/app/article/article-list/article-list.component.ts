import { Component, OnInit } from '@angular/core';
import { ArticleItem, ArticleItem2 } from 'app/domain/article-item';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit {

  articleList: Array<ArticleItem> = [];
  articleList2: Array<ArticleItem2> = [
    { name: 'ddd', title: 'eeee', optSelectedId: [] },
    { name: 'rre', title: '2@@@@', optSelectedId: [-1] },
  ];

  constructor() {
  }

  ngOnInit() {
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    if (title.value !== '' && link.value !== '') {
      this.articleList.push(new ArticleItem(title.value, link.value));
      title.value = '';
      link.value = '';
    }
  }

}
