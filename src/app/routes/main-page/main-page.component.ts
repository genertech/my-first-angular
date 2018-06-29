import {Component, OnInit} from '@angular/core';
import {ComponentMonitorDataService} from "../../service/impl/monitor/component-monitor-data.service";
import {SystemMonitorDataService} from "../../service/impl/monitor/system-monitor-data.service";
import {EquipTypeMonitorDataService} from "../../service/impl/monitor/equip-type-monitor-data.service";
import {BAR_COLOR_PALETTE} from "./monitor-base-info/monitor-base-info.component";
import {FRAMES} from "../../shared/directives/outer-frame.directive";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [
    EquipTypeMonitorDataService,
    SystemMonitorDataService,
    ComponentMonitorDataService
  ]
})
export class MainPageComponent implements OnInit {

  title = '运维监控平台';
  equipTypeLabel: string= "车型";
  systemLabel: string= "系统";
  componentLabel: string= "部件";

  frames = FRAMES;
  palettes = BAR_COLOR_PALETTE;
  equipTypeMoniInfoData: any;
  systemMoniInfoData: any;
  componentMoniInfoData: any;
  systemMoniOption: any;
  private equipTypeMoniOption: any;
  private componentMoniOption: any;

  constructor(private equipTypeMoniDataService: EquipTypeMonitorDataService,
              private systemMoniDataService: SystemMonitorDataService,
              private componentMoniDataService: ComponentMonitorDataService) {

    this.equipTypeMoniOption = this.equipTypeMoniDataService.getDataStructure();
    this.systemMoniOption = this.systemMoniDataService.getDataStructure();
    this.componentMoniOption = this.componentMoniDataService.getDataStructure();

  }
  private equipTypeMoniSubscribe() {

    this.equipTypeMoniDataService.currentSubject().subscribe(
      next => {
        this.equipTypeMoniInfoData = next;

      },
      error1 => {
        console.log(`异常信息${error1}`);
      }
    );

    this.equipTypeMoniDataService.startTimer();

  }

  private systemMoniSubscribe() {

    this.systemMoniDataService.currentSubject().subscribe(
      next => {
        this.systemMoniInfoData = next;

      },
      error1 => {
        console.log(`异常信息${error1}`);
      }
    );

    this.systemMoniDataService.startTimer();
  }

  private componentMoniSubscribe() {

    this.componentMoniDataService.currentSubject().subscribe(
      next => {
        this.componentMoniInfoData = next;

      },
      error1 => {
        console.log(`异常信息${error1}`);
      }
    );

    this.componentMoniDataService.startTimer();
  }

  ngOnInit() {
    this.equipTypeMoniSubscribe();
    this.systemMoniSubscribe();
    this.componentMoniSubscribe();

  }

}
