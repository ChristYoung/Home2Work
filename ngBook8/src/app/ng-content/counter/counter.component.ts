import {Component, OnInit} from '@angular/core';

let instances = 0;

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  id: number;

  constructor() {
    this.id = ++instances;
  }

  ngOnInit() {
  }

}
