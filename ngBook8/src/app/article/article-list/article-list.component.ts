import {Component, OnInit} from '@angular/core';
import {ArticleItem} from 'app/domain/article-item';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit {

  articleList: Array<ArticleItem> = [];

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
