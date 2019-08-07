// 文章列表
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';

import {ArticleRouter} from 'app/article/article-router';

@NgModule({
  imports: [
    CommonModule,
    ArticleRouter,
  ],
  declarations: [
    ArticleListComponent,
    ArticleItemComponent,
  ]
})
export class ArticleModule {
}
