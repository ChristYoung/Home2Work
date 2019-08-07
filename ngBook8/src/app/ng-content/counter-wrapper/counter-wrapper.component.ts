import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-counter-wrapper',
  templateUrl: './counter-wrapper.component.html',
  styleUrls: ['./counter-wrapper.component.css']
})
export class CounterWrapperComponent implements OnInit {

  show: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
