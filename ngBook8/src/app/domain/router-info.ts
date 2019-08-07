// 路由信息

import {NavigationExtras} from '@angular/router';

export class RouterInfo {
  commands: any[];
  extras: NavigationExtras;

  constructor(commands: any[],
              extras: NavigationExtras = null) {
    this.commands = commands;
    this.extras = extras;
  }
}
