import {Injectable} from '@angular/core';
import {IDataService} from "../../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

const TIME_INTERVAL = 5 * 1000;


@Injectable({
  providedIn: 'root'
})
export class SystemMonitorDataService implements IDataService {

  constructor() {
  }

  private _idInterval: any;

  private count: number = 0;

  private _dataSubject: Subject<any> = new Subject<any>();


  fetchData() {
    //TODO 通过外部请求定时获取数据

    return {
      "牵引":{
        "预警": Math.floor(Math.random()*100),
        "预测": Math.floor(Math.random()*100)
      },
      "制动":{
        "预警": Math.floor(Math.random()*100),
        "预测": Math.floor(Math.random()*100)
      },
      "门":{
        "预警": Math.floor(Math.random()*100),
        "预测": Math.floor(Math.random()*100)
      },
      "空调":{
        "预警": Math.floor(Math.random()*100),
        "预测": Math.floor(Math.random()*100)
      },
      "转向架":{
        "预警": Math.floor(Math.random()*100),
        "预测": Math.floor(Math.random()*100)
      }
    };

  }

  public startTimer() {

    this.addData(this.fetchData());

    this._idInterval = setInterval(() => {

      this.addData(this.fetchData());

    }, TIME_INTERVAL);
  }

  private addData(subjectData: any): void {
    this._dataSubject.next(subjectData);

  }

  public currentSubject(): Observable<any> {
    return this._dataSubject.asObservable();
  }


  public destroy() {
    clearInterval(this._idInterval);

  }
}
