import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[connerKazaro]'
})
export class KazaroDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    //el.nativeElement.style.backgroundColor = 'yellow';

    this.renderer.setStyle(this.el.nativeElement, "background-image",
      'url("/assets/img/conner-lt.gif"),url("/assets/img/conner-tr.gif"),url("/assets/img/conner-lb.gif"),url("/assets/img/conner-br.gif")');
    this.renderer.setStyle(this.el.nativeElement, "background-repeat",
      "no-repeat, no-repeat, no-repeat, no-repeat");
    this.renderer.setStyle(this.el.nativeElement, "background-position",
      "-135px -20px, calc(100% + 25px) -15px, -135px calc(100% + 20px), calc(100% + 25px) calc(100% + 15px)");
    this.renderer.setStyle(this.el.nativeElement, "background-size",
      "425px 240px, 250px 180px, 425px 240px, 250px 180px");

  }

}
