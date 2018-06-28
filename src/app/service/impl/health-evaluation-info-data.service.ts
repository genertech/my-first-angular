import { Injectable } from '@angular/core';
import {IDataService} from "../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

const TIME_INTERVAL = 10 * 60 * 1000;

const AREA_LOOK_UP = ['5001', '5002', '5003', '5004', '5005', '5006', '5007', '5008'];
const ATTRIBUTE_LOOK_UP = ['E', 'D'];
const XT_INFO_LOOK_UP = ['给排水及卫生系统', '网络系统', '主供电系统', '制动系统', '转向架', '牵引变流器', '空气过滤器', '紧急制动阀'];

@Injectable({
  providedIn: 'root'
})
/**
 * 首屏-健康评估数据供应商服务
 */
export class HealthEvaluationInfoDataService implements IDataService{

  getDataStructure(): any {

    return [
      {title:'车组号', key: 'area', style:{ width: '20%'}},
      {title:'车辆号', key: 'pv', style:{ width: '20%'}},
      {title:'等级', key: 'attribute', style:{ width: '20%'}},
      {title:'系统/部件',key: 'xt', style:{ width: '30%'}}
    ];

  }

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor() { }

  fetchData(): Array<any>{

    return ['CR400BF', 'CRH3C', 'CRH5A', 'CRH380BL', 'CRH380B'].map((ele)=>{

      let _amount = 5 + Math.floor(Math.random()*25);
      let data = [];
      while(_amount-- > 0){
        data.push({
          area: (AREA_LOOK_UP[Math.floor(Math.random() * AREA_LOOK_UP.length)]),
          pv: (Math.ceil(1+ Math.random()*15)).toString().padStart(2, "0"),
          attribute: (ATTRIBUTE_LOOK_UP[Math.floor(Math.random() * ATTRIBUTE_LOOK_UP.length)]),
          xt: (XT_INFO_LOOK_UP[Math.floor(Math.random() * XT_INFO_LOOK_UP.length)]),
        });
      }

      return {
        equipType: ele,
        data: data
      }

    });

  }

  public startTimer(){

    this.addData(this.fetchData());

    setInterval(()=>{

      this.addData(this.fetchData());

    }, TIME_INTERVAL);
  }

  private addData(subjectData: any): void {
    this._dataSubject.next(subjectData);

  }

  public currentSubject(): Observable<any> {
    return this._dataSubject.asObservable();
  }

  private generateTemplateData(template: String): string{

    let func = eval.call(null, template);
    return func(Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*16));
  }

}
