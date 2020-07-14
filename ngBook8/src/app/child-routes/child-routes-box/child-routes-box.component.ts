import { Component, OnInit } from '@angular/core';
import { RouterService } from 'app/libs/service/router.service';
import { PathLibrary } from 'app/public/path-library';

@Component({
  selector: 'app-child-routes-box',
  templateUrl: './child-routes-box.component.html',
  styleUrls: ['./child-routes-box.component.css']
})
export class ChildRoutesBoxComponent implements OnInit {

  constructor(private routerService: RouterService) { }

  ngOnInit() {
  }

  goA(): void {
    this.routerService.goTo([PathLibrary.moduleName_article + '/' + PathLibrary.childRoutesBox + '/childA']);
  }

  goB(): void {
    this.routerService.goTo([PathLibrary.moduleName_article + '/' + PathLibrary.childRoutesBox + '/childB']);
  }

}
