// 模块内的路由配置
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PathLibrary} from 'app/public/path-library';

import {ArticleListComponent} from 'app/article/article-list/article-list.component';

const routes: Routes = [
  {path: PathLibrary.articleList, component: ArticleListComponent},
];

export const ArticleRouter: ModuleWithProviders = RouterModule.forChild(routes);
