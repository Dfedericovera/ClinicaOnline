import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  @Input() appResaltar;
  @HostListener('mouseenter') onMouseEnter(){
    this.cambiarColor(this.appResaltar);
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.cambiarColor('');
  }
  @HostListener('window:keydown',['$event']) onKeyDown(event:KeyboardEvent){
    console.info("evento",event.key);
  }

  constructor(private el:ElementRef) {
    console.log(this.appResaltar);
    
   }

   private cambiarColor(color){
    this.el.nativeElement.style.backgroundColor = color;
   }

}
