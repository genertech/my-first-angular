import { Injectable } from '@angular/core';
import {IDataService} from "../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

const TIME_INTERVAL = 5 * 1000;

@Injectable({
  providedIn: 'root'
})

/**
 * 首屏-车组运行状态数据供应商服务
 */
export class TrainStatusDataService implements IDataService{

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor() {}

  fetchData(): any {

    let builderJson = {
      "all": 0 as any,
      "status": {
        "车组总数": 0 as any,
        "上线": Math.floor(Math.random() * 100),
        "未上线": Math.floor(Math.random() * 100),
        "热备": Math.floor(Math.random() * 100),
        "高级修": Math.floor(Math.random() * 100),
        "扣修": Math.floor(Math.random() * 100),
        "库停": Math.floor(Math.random() * 100),
      }
    };

    builderJson.status["车组总数"] = builderJson.all = Object.values(builderJson.status).reduce((p, c) => {
      return p + c;
    });

    return builderJson;
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
}
