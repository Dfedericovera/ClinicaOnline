import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltarHabilitado]'
})
export class ResaltarHabilitadoDirective
{

  @Input() isApproved: any;

  constructor(private el: ElementRef)
  {

  }

  ngOnChanges()
  {
    if (this.isApproved == true)
    {
      this.changeColor("green")
    } else
    {
      this.changeColor("red");
    }
  }

  private changeColor(color)
  {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
