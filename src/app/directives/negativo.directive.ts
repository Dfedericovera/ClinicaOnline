import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNegativo]'
})
export class NegativoDirective
{
  @Input() set appNegativo(condicion:boolean){
    if(!condicion){
      this.viewContainer.clear;
    }
    else{
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef)
  {
    
  }



}
