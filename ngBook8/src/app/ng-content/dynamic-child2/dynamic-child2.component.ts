import {Component, EventEmitter, OnInit} from '@angular/core';

let instanceNumber = 0;

@Component({
  selector: 'app-dynamic-child2',
  templateUrl: './dynamic-child2.component.html',
  styleUrls: ['./dynamic-child2.component.css']
})
export class DynamicChild2Component implements OnInit {

  id: number;

  title: string;

  trigger: EventEmitter<string> = new EventEmitter<string>();
  destory: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.id = ++instanceNumber;
  }

  ngOnInit() {
  }

  btnClicked(): void {
    console.log('i has been clicked~')
    this.trigger.emit('动态组件事件的触发');
  }

  destorySelf(): void {
    this.destory.emit(true);
  }

}
