import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-debounce-click',
  templateUrl: './debounce-click.component.html',
  styleUrls: ['./debounce-click.component.css']
})
export class DebounceClickComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  debounceClickHandler($event): void {
    console.log($event);
    alert('延迟一段时间后点击按钮触发~~~按钮1');
  }

}
