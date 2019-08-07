// 演示管道的demo
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pipes-demo',
  templateUrl: './pipes-demo.component.html',
  styleUrls: ['./pipes-demo.component.css']
})
export class PipesDemoComponent implements OnInit {

  sortByLetterList: Array<string>;

  constructor() {
    this.sortByLetterList = ['展示', '是的妇科', '师德师风', '水电费', '二', '单人份', '法规回复', '欧阳剖', '酒瓯屁哦'];
  }

  ngOnInit() {
  }

}
