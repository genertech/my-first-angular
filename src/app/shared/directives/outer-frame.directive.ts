import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

// 常量定义
const FRAMES = {
  FRAME1: 'FRAME1' as 'FRAME1',
  FRAME2: 'FRAME2' as 'FRAME2',
  FRAME3: 'FRAME3' as 'FRAME3',
  FRAME4: 'FRAME4' as 'FRAME4',
  FRAME5: 'FRAME5' as 'FRAME5',
  FRAME6: 'FRAME6' as 'FRAME6',
  FRAME7: 'FRAME7' as 'FRAME7',
  FRAMEBG1: 'FRAMEBG1' as 'FRAMEBG1',
  FRAMEBG2: 'FRAMEBG2' as 'FRAMEBG2',
  MODELBG2: 'MODELBG2' as 'MODELBG2',
  MODELBG3: 'MODELBG3' as 'MODELBG3',
  TITLEBG1: 'TITLEBG1' as 'TITLEBG1',
};

type FRAMES = (typeof FRAMES)[keyof typeof FRAMES];
export { FRAMES };

@Directive({
  selector: '[outerFrame]'
})
export class OuterFrameDirective implements OnInit{
  @Input() outerFrame: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {

     let frameImgPath :string;


    switch (this.outerFrame) {
      case FRAMES.FRAME1: {
        frameImgPath = "assets/img/bg-main-1.png";
        break;
      }
      case FRAMES.FRAME2: {
        frameImgPath = "assets/img/bg-main-2.png";
        break;
      }
      case FRAMES.FRAME3: {
        frameImgPath = "assets/img/bg-main-3.png";
        break;
      }
      case FRAMES.FRAME4: {
        frameImgPath = "assets/img/bg-main-4.png";
        break;
      }
      case FRAMES.FRAME5: {
        frameImgPath = "assets/img/bg-main-5.png";
        break;
      }
      case FRAMES.FRAME6: {
        frameImgPath = "assets/img/bg-main-6.png";
        break;
      }
      case FRAMES.TITLEBG1: {
        frameImgPath = "assets/img/title-bg-1.png";
        break;
      }
      case FRAMES.FRAME7: {
        frameImgPath = "assets/img/bg-main-7.png";
        break;
      }
      case FRAMES.FRAMEBG1: {
        frameImgPath = "assets/img/frame-bg-01.png";
        break;
      }
      case FRAMES.FRAMEBG2: {
        frameImgPath = "assets/img/frame-bg-02.png";
        break;
      }
      case FRAMES.MODELBG2: {
        frameImgPath = "assets/img/model-bg-02.png";
        break;
      }
      case FRAMES.MODELBG3: {
        frameImgPath = "assets/img/model-bg-03.png";
        break;
      }
      default: {
        frameImgPath = "assets/img/bg-main-1.png";

        break;
      }
    }

    this.renderer.setStyle(this.el.nativeElement, "background-image", `url(${frameImgPath})`);
    this.renderer.setStyle(this.el.nativeElement, "background-size", "100% 100%");

  }
}
