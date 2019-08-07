import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PathLibrary} from 'app/public/path-library';

import {PipesDemoComponent} from 'app/pipes/pipes-demo/pipes-demo.component';

const routes: Routes = [
  {path: PathLibrary.pipesDemo, component: PipesDemoComponent},
];

export const pipesRouter: ModuleWithProviders = RouterModule.forChild(routes);
