import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-counter-two',
  templateUrl: './counter-two.component.html',
  styleUrls: ['./counter-two.component.css']
})
export class CounterTwoComponent implements OnInit {

  @Output()
  saySomething: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  btnClicked(): void {
    this.saySomething.emit('hello, world');
  }

}
