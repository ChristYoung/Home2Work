import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PathLibrary} from 'app/public/path-library';

const routes: Routes = [
  {path: PathLibrary.index, redirectTo: PathLibrary.demoList, pathMatch: 'full'},
  {path: PathLibrary.moduleName_article, loadChildren: () => import('app/article/article.module').then(mod => mod.ArticleModule)},
  {path: PathLibrary.moduleName_form, loadChildren: () => import('app/form/form.module').then(mod => mod.FormModule)},
  {path: PathLibrary.moduleName_ngContent, loadChildren: () => import('app/ng-content/ng-content.module').then(mod => mod.NgContentModule)},
  {path: PathLibrary.moduleName_directive, loadChildren: () => import('app/learn-directive/learn-directive.module').then(mod => mod.LearnDirectiveModule)},
  {path: PathLibrary.moduleName_di, loadChildren: () => import('app/di/di.module').then(mod => mod.DiModule)},
  {path: PathLibrary.moduleName_pipes, loadChildren: () => import('app/pipes/pipes.module').then(mod => mod.PipesModule)},
  {path: PathLibrary.moduleName_changeDetection, loadChildren: () => import('app/change-detection/change-detection.module').then(mod => mod.ChangeDetectionModule)},
  {path: PathLibrary.moduleName_compilerAndFactory, loadChildren: () => import('app/compiler-and-factory/compiler-and-factory.module').then(mod => mod.CompilerAndFactoryModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false,
        useHash: true
      }
    )
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
