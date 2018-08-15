import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

const DEFAULT_CLIENT_HEIGHT: number = 1080;
const DEFAULT_CLIENT_WIDTH: number = 1920;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{




  //监听窗口大小改变
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let innerWidth = event.target.innerWidth;
    let innerHeight = event.target.innerHeight;

    this.scaleTransform(innerWidth, innerHeight);

  }

  constructor(private renderer: Renderer2, private router: Router) {

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    this.scaleTransform(innerWidth, innerHeight);
  }

  //执行scale transform
  private scaleTransform(innerWidth: number, innerHeight: number ){

    let scaleH = innerHeight/DEFAULT_CLIENT_HEIGHT;
    let scaleW = innerWidth/DEFAULT_CLIENT_WIDTH;

    let scale = scaleH < scaleW ? scaleH : scaleW;

    this.renderer.setStyle(document.body, "transform", `scale(${scale})`);
    this.renderer.setStyle(document.body, "margin-left", `${(innerWidth - DEFAULT_CLIENT_WIDTH*scale) / 2 }px`);
  }

  ngOnInit() {


  }


  goHome() {
    this.router.navigateByUrl('/main-page')
  }
}
