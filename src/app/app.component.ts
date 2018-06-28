import {Component, Renderer2, HostListener} from '@angular/core';
import {OnInit} from '@angular/core';
import {FRAMES} from "./shared/directives/outer-frame.directive";
import {BAR_COLOR_PALETTE} from "./routes/main-page/monitor-base-info/monitor-base-info.component";
import {EquipTypeMonitorDataService} from "./service/impl/monitor/equip-type-monitor-data.service";
import {SystemMonitorDataService} from "./service/impl/monitor/system-monitor-data.service";
import {ComponentMonitorDataService} from "./service/impl/monitor/component-monitor-data.service";

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

  constructor(private renderer: Renderer2) {

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    this.scaleTransform(innerWidth, innerHeight);

  }

  //执行scale transform
  private scaleTransform(innerWidth: number, innerHeight: number ){

    let scale = innerHeight/DEFAULT_CLIENT_HEIGHT;

    this.renderer.setStyle(document.body, "transform", "scale(" + scale +  ")");
    this.renderer.setStyle(document.body, "margin-left", ((innerWidth - DEFAULT_CLIENT_WIDTH*scale) / 2) + "px");
  }

  ngOnInit() {


  }


}
