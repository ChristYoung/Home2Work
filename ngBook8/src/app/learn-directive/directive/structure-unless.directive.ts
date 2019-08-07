import {Directive, Input, ViewContainerRef, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class StructureUnlessDirective {

  private hasView = false;

  constructor(private vcr: ViewContainerRef, private tpl: TemplateRef<any>) {
  }

  @Input()
  set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.vcr.createEmbeddedView(this.tpl);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.vcr.clear();
      this.hasView = false;
    }
  }

}
