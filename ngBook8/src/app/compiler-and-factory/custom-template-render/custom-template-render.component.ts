import { Component, OnInit, Input, TemplateRef } from '@angular/core';

interface Payload {
  age: number;
  name: string;
}

@Component({
  selector: 'app-custom-template-render',
  templateUrl: './custom-template-render.component.html',
  styleUrls: ['./custom-template-render.component.css']
})
export class CustomTemplateRenderComponent implements OnInit {

  @Input()
  data: Payload[] = [
    {
      age: 10,
      name: '小王',
    },
    {
      age: 12,
      name: '老王',
    }
  ];

  @Input() customRenderer: TemplateRef<{ $implicit: Payload; }>;

  exampleContext = {
    $implicit: 'default context property when none specified',
    aContextProperty: 'a context property'
  };

  constructor() { }

  ngOnInit() {
  }


}
