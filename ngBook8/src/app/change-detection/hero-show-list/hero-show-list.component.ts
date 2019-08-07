// 用于显示检索出来的heroes
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hero-show-list',
  templateUrl: './hero-show-list.component.html',
  styleUrls: ['./hero-show-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroShowListComponent implements OnInit {

  @Input()
  heroes: string[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  getHeroes(hero: string) {
    console.log('触发了变更检测~~~', hero);
  }

}
