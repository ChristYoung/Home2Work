import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PathLibrary} from 'app/public/path-library';

import {DebounceClickComponent} from './debounce-click/debounce-click.component';
import {DragComponent} from './drag/drag.component';
import {RangeComponent} from './range/range.component';

const routes: Routes = [
  {path: PathLibrary.debounceClick, component: DebounceClickComponent},
  {path: PathLibrary.drag, component: DragComponent},
  {path: PathLibrary.range, component: RangeComponent},
];

export const directiveRouter: ModuleWithProviders = RouterModule.forChild(routes);
