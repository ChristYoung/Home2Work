// 延迟点击的指令
import {Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {

  // 实现事件的去抖动处理, 然后将它重新发送回父节点
  @Output()
  debounceClick = new EventEmitter();

  // 自定义延迟的时间
  @Input()
  debounceTime = 500;

  private clicks = new Subject<any>();
  private subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.subscription = this.clicks.pipe(
        debounceTime(this.debounceTime),
      ).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(e: MouseEvent) {
     e.preventDefault();
     e.stopPropagation();
     console.log('click from Host Element');
     this.clicks.next(event);
  }

}
