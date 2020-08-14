// 文章列表
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';

import {ArticleRouter} from 'app/article/article-router';
import { ArticleItem2Component } from './article-item2/article-item2.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleRouter,
  ],
  declarations: [
    ArticleListComponent,
    ArticleItemComponent,
    ArticleItem2Component,
  ]
})
export class ArticleModule {
}
