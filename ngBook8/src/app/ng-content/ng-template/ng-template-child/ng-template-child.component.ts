import { Component, Input, OnInit, TemplateRef } from '@angular/core';
type NameValue = { name: string, value: number };

@Component({
  selector: 'app-ng-template-child',
  templateUrl: './ng-template-child.component.html',
  styleUrls: ['./ng-template-child.component.css']
})
export class NgTemplateChildComponent implements OnInit {

  @Input() optionTemplate: TemplateRef<{ $implicit: NameValue }>;

  dataList = [
    { name: 'rr', value: 88 },
    { name: 'drr', value: 858 },
    { name: 'rdr', value: 8 },
    { name: 'rsr', value: 80 },
    { name: 'drr', value: 83 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
