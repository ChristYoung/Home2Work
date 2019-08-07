import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PathLibrary} from 'app/public/path-library';
import {ChangeDetection1Component} from 'app/change-detection/change-detection1/change-detection1.component';

const routes: Routes = [
  {path: PathLibrary.changeDetection1, component: ChangeDetection1Component},
];

export const changeDetectionRouter: ModuleWithProviders = RouterModule.forChild(routes);
