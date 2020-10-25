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

  addArticle2(): void {

  }

  test1(): void {
    this.articleList2 = this.returnArticleList2();
  }

  test2(): void {
    this.returnArticleList3(this.articleList2);
    // this.articleList2 = this.returnArticleList2();
  }

  returnArticleList2(): Array<ArticleItem2> {
    return [
      { name: 'dddsdd', title: 'ess222eee', optSelectedId: [] },
      { name: 'rre222', title: '@@@@222', optSelectedId: [-1] },
    ];
  }

  returnArticleList3(arr: Array<ArticleItem2>): Array<ArticleItem2> {
    const cloneArr = [...arr];
    console.log("ArticleListComponent -> arr", arr);
    cloneArr.push({ name: 'sss', title: 'ess222eee', optSelectedId: [] });
    cloneArr.forEach(item => item.name = 'lhsdsb');
    console.log("ArticleListComponent -> arr", arr);
    console.log("ArticleListComponent -> cloneArr", cloneArr);
    return cloneArr;
  }

}
