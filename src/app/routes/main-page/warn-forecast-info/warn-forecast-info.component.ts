import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WarnForecastInfoDataService} from "../../../service/impl/warn-forecast-info-data.service";

const SWITCH_INTERVAL = 60 * 1000;

@Component({
  selector: 'app-warn-forecast-info',
  templateUrl: './warn-forecast-info.component.html',
  styleUrls: ['./warn-forecast-info.component.css'],
  providers:[WarnForecastInfoDataService],
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
export class WarnForecastInfoComponent implements OnInit {

  labelText: string = '预警/预测信息';
  equipTypeLabelText: string = '车型';
  _equipType: string = 'N/A';
  equipType: string = 'N/A';

  columnInfo: Array<any>;

  warnForecastInfo: Array<any>;
  private switchInterval: any;
  aniStatus: string = 'active';

  constructor(private dataService: WarnForecastInfoDataService) {
    this.columnInfo = this.dataService.getDataStructure();
  }
co
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
  switchCallback($event){

    if($event.fromState === 'active' || $event.fromState === 'void'){
        this.equipType = this._equipType;
        this.aniStatus='active'
    }

  }

}
