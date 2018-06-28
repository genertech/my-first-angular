import { Injectable } from '@angular/core';
import {IDataService} from "../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

const TIME_INTERVAL = 10 * 60 * 1000;

const AREA_LOOK_UP_TABLE = ['550301', '550702', '557201', '531402', '565708', '531808', '560408', '501509'];
const PV_LOOK_UP_TABLE = ['转向架', '牵引电机', '制动'];
const LX_LOOK_UP_TABLE = ['预警', '预测'];
const INFO_LOOK_UP_TEMPLATE = [
  '(n1,n2, n3, n4) => `轴承温度 超温${n1}℃≥${n2}℃;超差${n3}℃≥${n4}℃`',
  '(n1,n2) => `定子温度 超温${n1}℃>${n2}℃`',
  '(n1,n2, n3, n4, n5) => `转向架${n5}一轴右侧温度整体水平发生突变，平均水平由${n1}变成${n2}`',
  '(n1,n2) => `轴承温度 超温${n1}℃≥${n2}℃`'
];

@Injectable({
  providedIn: 'root'
})

/**
   * 首屏-预警/预测实时数据供应商服务
 */
export class WarnForecastInfoDataService implements IDataService{

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor() {}

  getDataStructure(): any {
    return [
      {title:'车组号', key: 'area', style:{ width: '20%'}},
      {title:'部件', key: 'pv', style:{ width: '20%'}},
      {title:'类型', key: 'lx', style:{ width: '10%'}},
      {title:'详情', key: 'attribute', style:{ width: '40%'}}
    ];
  }

  fetchData(): Array<any>{

    console.log("fetched one data");

    return ['CR400BF', 'CRH3C', 'CRH5A', 'CRH380BL', 'CRH380B'].map((ele)=>{

      let _amount = 5 + Math.floor(Math.random()*25);
      let data = [];
      while(_amount-- > 0){
        data.push({
          area: (AREA_LOOK_UP_TABLE[Math.floor(Math.random() * AREA_LOOK_UP_TABLE.length)]),
          pv: (PV_LOOK_UP_TABLE[Math.floor(Math.random() * PV_LOOK_UP_TABLE.length)]),
          lx: (LX_LOOK_UP_TABLE[Math.floor(Math.random() * LX_LOOK_UP_TABLE.length)]),
          attribute: this.generateTemplateData(INFO_LOOK_UP_TEMPLATE[Math.floor(Math.random() * INFO_LOOK_UP_TEMPLATE.length)]),
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
