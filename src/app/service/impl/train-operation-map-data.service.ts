import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";
import {IDataService} from "../interface/idata-service";

const FETCH_CYCLE: number = 5 * 1000;
const MIN_LONGITUDE: number = 90.230;
const MAX_LONGITUDE: number = 125.40;
const MIN_LATITUDE: number = 3.52;
const MAX_LATITUDE: number = 53.33;
const TRAINS_LOOK_UP = [
  '5501', '5008', '5654', '5018', '5372',
  '5502', '5623', '5301', '3782', '3601',
  '3742', '3421', '5573', '3232', '5312',
  '3123', '5782', '3521', '5721', '3001',
  '3523', '5182', '3541', '5100', '3005'
];

@Injectable({
  providedIn: 'root'
})

/**
 * 首屏-车组运行地图实时数据供应商服务
 */
export class TrainOperationMapDataService implements IDataService{

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor() { }

  private _idInterval: any;

  fetchData(): any{

    let result = [], counter = 5 + Math.floor(Math.random() * 15);

    let trainClips = this.randomPickSomeData(TRAINS_LOOK_UP, counter);

    while(counter--){

      result.push({
        train: (trainClips[counter]),
        coordinate: [
          (MIN_LONGITUDE + (MAX_LONGITUDE - MIN_LONGITUDE) * Math.random()),
          (MIN_LATITUDE + (MAX_LATITUDE - MIN_LATITUDE) * Math.random())
        ],
        warn: Math.floor(Math.random() * 25),
        forecast: Math.floor(Math.random() * 15)
      });
    }

    return result;
  }

  public destroy() {
    clearInterval(this._idInterval);

  }

  public startTimer(){

    this.addData(this.fetchData());

    setInterval(()=>{

      this.addData(this.fetchData());

    }, FETCH_CYCLE);
  }

  private addData(subjectData: any): void {
    this._dataSubject.next(subjectData);

  }

  public currentSubject(): Observable<any> {
    return this._dataSubject.asObservable();
  }

  private randomPickSomeData(source : Array<any>, amount: number): Array<any>{

    let _source = [...source];
    let result = [];

    for (let i = 0; i < amount; i++) {

      let ran = Math.floor(Math.random() * _source.length);

      result.push(_source.splice(ran, 1)[0]);

    }

    return result;
  }
}
