import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WarnForecastInfoDataService} from "../../../service/impl/warn-forecast-info-data.service";
import {RollingTableColumnSetting} from "../../../shared/components/rolling-table/rolling-table-column-setting";

const SWITCH_INTERVAL = 60 * 1000;

@Component({
  selector: 'app-warn-forecast-info',
  templateUrl: './warn-forecast-info.component.html',
  styleUrls: ['./warn-forecast-info.component.css'],
  providers: [WarnForecastInfoDataService],
  animations: [
    trigger('equipTypeStatus', [
      state('inactive', style({
        transform: 'rotateX(0)'
      })),
      state('active', style({
        transform: 'rotateX(90deg)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class WarnForecastInfoComponent implements OnInit {

  labelText: string = '预警/预测信息';
  equipTypeLabelText: string = '车型';
  _equipType: string = 'N/A';
  equipType: string = 'N/A';

  columnInfo: RollingTableColumnSetting;

  warnForecastInfo: Array<any>;
  private switchInterval: any;
  aniStatus: string = 'inactive';

  constructor(private dataService: WarnForecastInfoDataService) {
    this.columnInfo = this.dataService.getDataStructure();
  }

  ngOnInit() {
    this.subscribeDataService();

  }

  //订阅DataService，解耦data-model与view
  subscribeDataService() {

    this.dataService.currentSubject().subscribe(
      val => {

        clearInterval(this.switchInterval);
        this.dataSwitch(val);
      },
      error => {
        console.log(`获取数据异常:${error}`)
      }
    );

    this.dataService.startTimer();

  }

  private dataSwitch(data: Array<any>) {
    //console.log(anies);

    if (data && data.length > 0) {

      let anies = this.dataProcess(data);

      anies.push(this.data2View(anies.shift()));

      this.switchInterval = setInterval(() => {

        anies.push(this.data2View(anies.shift()));

      }, SWITCH_INTERVAL);

    }

  }

  /**
   * data -> [{
   *  warnName	"轴温性能趋势预警"
   *  time	1529652658000
   *  equipName	"长客标动-5001"
   *  areaName	"01车"
   *  areaCode	"01"
   *  partName	"TC01车一位转向架"
   *  equipTypeName	"CR400BF"
   *  equipSn	"CR400BF5001"
   *  partBei	"3-9"
   *  type	"warn"
   *  quipType	"CR400BF"
   * }]
   */
  private dataProcess(data: Array<any>): Array<any> {
    let _equipTypes = [];
    let anies = [];

    data.forEach((item) => {

      let equipTypeName = item.equipTypeName;

      let idx = _equipTypes.indexOf(equipTypeName);

      if (idx > -1) {
        anies[idx].data.push(item);

      } else {
        _equipTypes.push(equipTypeName);
        anies.push({
          equipType: equipTypeName,
          data: [item]
        });
      }
    });

    return anies;
  }

  private data2View(data: any) {

    this.aniStatus = 'active';

    this._equipType = data.equipType;
    this.warnForecastInfo = data.data;


    return data;
  }

  /**
   *
   * @param $event
   * {
   *  disabled: false
   *  element: DOM
   *  fromState: "active"
   *  phaseName: "done"
   *  toState: "inactive"
   *  totalTime: 500
   *  triggerName: "firstDisappear"
   * }
   */
  switchCallback($event) {

    if ($event.fromState === 'inactive' || $event.fromState === 'void') {
      this.equipType = this._equipType;
      this.aniStatus = 'inactive'
    }

  }

}
