import {Injectable} from '@angular/core';
import {IDataService} from "../../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

const TIME_INTERVAL = 5 * 1000;


@Injectable({
  providedIn: 'root'
})
export class EquipTypeMonitorDataService implements IDataService {

  constructor() {
  }

  private _idInterval: any;

  private count: number = 0;

  private _dataSubject: Subject<any> = new Subject<any>();


  fetchData() {
    //TODO 通过外部请求定时获取数据

    return {
      "CR400BF": {
        "预警": Math.floor(Math.random() * 100),
        "预测": Math.floor(Math.random() * 100)
      },
      "CRH380B": {
        "预警": Math.floor(Math.random() * 100),
        "预测": Math.floor(Math.random() * 100)
      },
      "CRH5G": {
        "预警": Math.floor(Math.random() * 100),
        "预测": Math.floor(Math.random() * 100)
      },
      "CRH5A": {
        "预警": Math.floor(Math.random() * 100),
        "预测": Math.floor(Math.random() * 100)
      },
      "CRH3A": {
        "预警": Math.floor(Math.random() * 100),
        "预测": Math.floor(Math.random() * 100)
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
