// 演示内容投影的容器组件
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  sayHandler($event: string): void {
    alert($event);
  }

}
