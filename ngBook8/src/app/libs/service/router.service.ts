// 路由的封装
import {Injectable} from '@angular/core';
import {RouterInfo} from 'app/domain/router-info';
import {NavigationExtras, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private routerTrace: RouterInfo[] = []; // 路由足迹

  constructor(private router: Router) {
  }

  goTo(commands: any[], extras?: NavigationExtras): void {
    // save trace
    const currentRouterInfo: RouterInfo = new RouterInfo(commands, extras);
    this.routerTrace.push(currentRouterInfo);

    // navigate
    if (typeof extras === 'object' && extras !== null) {
      this.router.navigate(currentRouterInfo.commands, currentRouterInfo.extras);
    } else {
      this.router.navigate(currentRouterInfo.commands);
    }
  }

  // 后退
  back() {
    this.routerTrace.pop(); // 有多次路由去掉当前路由信息
    const currentRouterInfo: RouterInfo = this.routerTrace.pop(); // 取出上次路由信息
    this.goTo(currentRouterInfo.commands, currentRouterInfo.extras); // 重做上次路由跳转
  }

  // 清楚路由痕迹
  clearTrace() {
    this.routerTrace = [];
  }

}
