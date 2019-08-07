import {Component, OnInit} from '@angular/core';

let instanceNumber = 0; // 被实例化的次数

@Component({
  selector: 'app-dynamic-child1',
  templateUrl: './dynamic-child1.component.html',
  styleUrls: ['./dynamic-child1.component.css']
})
export class DynamicChild1Component implements OnInit {

  id: number;

  title: string;

  constructor() {
    this.id = ++instanceNumber;
  }

  ngOnInit() {
  }

}
