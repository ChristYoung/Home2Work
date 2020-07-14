import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathLibrary } from 'app/public/path-library';
import { ChildRoutesBoxComponent } from './child-routes-box/child-routes-box.component';

const routes: Routes = [
    {
        path: PathLibrary.childRoutesBox, component: ChildRoutesBoxComponent,
    }
];

@NgModule({
    imports: [
    ],
    exports: [RouterModule]
})
export class ChildRoutesRoutingModule { }
