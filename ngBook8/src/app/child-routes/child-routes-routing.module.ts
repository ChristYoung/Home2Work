import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathLibrary } from 'app/public/path-library';
import { ChildRoutesBoxComponent } from './child-routes-box/child-routes-box.component';
import { ChildAComponent } from './child-a/child-a.component';
import { ChildBComponent } from './child-b/child-b.component';

const routes: Routes = [
    {
        path: PathLibrary.childRoutesBox,
        component: ChildRoutesBoxComponent,
        children: [
            {
                path: 'childA',
                component: ChildAComponent,
            },
            {
                path: 'childB',
                component: ChildBComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class ChildRoutesRoutingModule { }
