import {Directive, HostListener, Renderer2, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDrag][draggedClass]'
})
export class DragDirective {

  private _isDraggable = false;

  // 当在组件中使用<xx appDrag="true"></xx>时, 可以使用拖拽
  @Input('appDrag')
  set isDraggable(val) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get isDraggable(): boolean {
    return this._isDraggable;
  }

  @Input()
  draggedClass: string;

  constructor(private el: ElementRef, private rd: Renderer2) {
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(e: Event) {
    this.rd.addClass(this.el.nativeElement, this.draggedClass);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(e: Event) {
    this.rd.removeClass(this.el.nativeElement, this.draggedClass);
  }

}
