// Change Detection在默认情况下只要有事件发生就会开始，并且Change Detection的范围是整个界面中的所有组件, 不管子组件是否有@Input属性

// 组件初始化完成后, 在我们点击Search按钮之后，因为这是一次click事件。所以Change Detection开始运行（Angular内部会调用detectChanges这个方法），
// 得到一条数据之后app-hero-show-list组件的输入属性heroes发生变化, 因此调用了app-hero-show-list模板中的方法，打印出一条M的英雄的log。
// 但是由于我们现在正在开发模式下运行Angular，所以Angular还会执行checkNoChanges这个方法去检验之前运行的Change Detection是否导致了别的改动。
// 这个方法也会导致我们视图中定义的getGender被再次调用。
// 所以说现在打印两条记录在开发环境是完全正常的行为。但是接下来出现的各种行为可能就不是我们所想的了。
// 我们点击Add按钮，数字增加了1，但是我们发现Console中又打印了两条M。接着，我们想去修改search输入框里的值，
// 但是我们发现每当我们删除或者添加一个字符，就会多打印两条英雄的log。
// 而在这个过程中，我们的Hero列表并没有任何变化，这些事件触发了Change Detection，ChangeDetection默认情况下会去检测整个界面，这就导致了getGender方法被反复调用。
// 而如果搜索返回的Hero数组有很多条数据，getGender方法中的逻辑比较复杂时，我们整个界面中除了点击Search按钮之外的其他操作的性能就会被`app-heroes`这个component大大拖慢。

// 事实上，我们作为应用的开发者，我们是知道数据在什么时候是应当去更新，什么时候不用去更新的。当前这个例子，app-heroes中的heroes数组，
// 只在点击Search按钮查出新的结果之后才会变化。而别的一些操作，如点击Add按钮、修改search input的内容时，
// 都不会导致heroes数组的变化，从而Angular Change Deteciton不应该在这种情况下去对app-heroes这个component进行Change Detetion。
// 但是应用的逻辑是由我们而不是Angular所编写，所以Angular并不知道这些时候它不该进行Change Detection。

// 解决办法:
// app-hero-show-list组件的ChangeDetectionStrategy设置成onPush

// 在开启了OnPush之后，只有两种情况下Change Detection会在该Component内部运行
// @Input发生变化
// 由Component内部的事件引起的Change Detection

// 如果一个组件没有@Input属性, 且开启了OnPush策略, 如果想要主动触发变更检测, 则需要使用ChangeDetectorRef的detectChanges方法

import {Component, OnInit} from '@angular/core';
import {HeroService} from 'app/change-detection/service/hero.service';

@Component({
  selector: 'app-change-detection1',
  templateUrl: './change-detection1.component.html',
  styleUrls: ['./change-detection1.component.css'],
  providers: [HeroService],
})
export class ChangeDetection1Component implements OnInit {

  keyWord = '';
  heroes = [];
  count = 0;

  constructor(private h: HeroService) {
  }

  ngOnInit() {
  }

  update() {
    console.log('Add Click');
    this.count++;
  }

  search() {
    console.log('Search click');
    this.heroes = this.h.getHeroes(this.keyWord);
  }

}
