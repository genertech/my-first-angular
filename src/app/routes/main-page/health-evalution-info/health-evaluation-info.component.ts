import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HealthEvaluationInfoDataService} from "../../../service/impl/health-evaluation-info-data.service";

const SWITCH_INTERVAL = 60 * 1000;

@Component({
  selector: 'app-health-evaluation-info',
  templateUrl: './health-evaluation-info.component.html',
  styleUrls: ['./health-evaluation-info.component.css'],
  providers: [HealthEvaluationInfoDataService],
  animations: [
    trigger('equipTypeStatus', [
      state('inactive', style({
        transform: 'translateY(-100%)'
      })),
      state('active',   style({
        transform: 'translateY(0)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class HealthEvaluationInfoComponent implements OnInit {

  labelText: string = '健康评估结果';

  equipTypeLabelText: string = '车型';
  _equipType: string = 'N/A';
  equipType: string = 'N/A';

  columnInfo: Array<any>;

  healthEvaluationInfo: Array<any>;
  aniStatus: string = 'active';

  private switchInterval: any;

  constructor(private dataService: HealthEvaluationInfoDataService) {
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
        console.log(`获取数据异常:${error}`)
      }
    );

    this.dataService.startTimer();

  }

  private dataSwitch(anies: Array<any>) {
    //console.log(anies);

    if(anies && anies.length > 0){

      anies.push(this.data2View(anies.shift()));


      this.switchInterval = setInterval(()=>{

        anies.push(this.data2View(anies.shift()));

      }, SWITCH_INTERVAL);

    }

  }

  private data2View(data: any){

    this.aniStatus = 'inactive';

    this._equipType = data.equipType;
    this.healthEvaluationInfo = data.data;


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
  switchCallback($event){

    if($event.fromState === 'active' || $event.fromState === 'void'){
      this.equipType = this._equipType;
      this.aniStatus='active'
    }

  }


}
