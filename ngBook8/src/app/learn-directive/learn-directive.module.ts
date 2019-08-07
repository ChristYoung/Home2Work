import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebounceClickComponent} from './debounce-click/debounce-click.component';
import {directiveRouter} from './learn-directive-router';
import {StructureRangeDirective} from 'app/learn-directive/directive/structure-range.directive';

import {DebounceClickDirective} from 'app/learn-directive/directive/debounce-click.directive';
import {DragDirective} from 'app/learn-directive/directive/drag.directive';
import {StructureUnlessDirective} from 'app/learn-directive/directive/structure-unless.directive';
import {DragComponent} from './drag/drag.component';
import {RangeComponent} from './range/range.component';

@NgModule({
  imports: [
    CommonModule,
    directiveRouter,
  ],
  declarations: [
    DebounceClickDirective,
    StructureUnlessDirective,
    DragDirective,
    StructureRangeDirective,
    DragComponent,
    RangeComponent,
    DebounceClickComponent,
  ]
})
export class LearnDirectiveModule {
}
