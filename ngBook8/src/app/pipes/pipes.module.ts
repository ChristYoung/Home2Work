// 管道相关的模块
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipesDemoComponent} from 'app/pipes/pipes-demo/pipes-demo.component';
import {pipesRouter} from 'app/pipes/pipe-router';
import {SortByLetterPipe} from './pipes/sort-by-letter.pipe';

@NgModule({
  imports: [
    CommonModule,
    pipesRouter,
  ],
  declarations: [SortByLetterPipe, PipesDemoComponent]
})
export class PipesModule {
}
