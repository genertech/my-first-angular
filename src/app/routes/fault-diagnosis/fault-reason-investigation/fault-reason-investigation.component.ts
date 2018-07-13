import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FaultReasonInvestigationDataService} from "../../../service/impl/fault-reason-investigation-data.service";
import {RollingTableColumnSetting} from "../../../shared/components/rolling-table/rolling-table-column-setting";

const SWITCH_INTERVAL = 60 * 1000;

@Component({
  selector: 'app-fault-reason-investigation',
  templateUrl: './fault-reason-investigation.component.html',
  styleUrls: ['./fault-reason-investigation.component.css'],
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
export class FaultReasonInvestigationComponent implements OnInit {

  labelText: string = '故障原因排查';

  equipTypeLabelText: string = '车型';
  _equipType: string = 'N/A';
  equipType: string = 'N/A';

  columnInfo: RollingTableColumnSetting;

  preciseInfo: Array<any>;
  aniStatus: string = 'inactive';

  private switchInterval: any;

  constructor(private dataService: FaultReasonInvestigationDataService) {
    this.columnInfo = this.dataService.getDataStructure();
  }

  ngOnInit() {
    this.subscribeDataService();
  }

  subscribeDataService() {

    this.dataService.currentSubject().subscribe(
      val => {

        clearInterval(this.switchInterval);
        this.dataSwitch(val);
      },
      error => {
        console.log(`获取数据异常`, error);
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
   *  equipName	"5824"
   *  areaName	"01车"
   *  areaCode	"01"
   *  partName	"3-16"
   *  equipTypeName	"CRH380BL"
   *  equipSn	"5824"
   *  partBei	"3-16"
   *  healthLevel	"A"
   *  equipType	"CRH380BL"
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
    this.preciseInfo = data.data;

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
