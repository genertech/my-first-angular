import { Injectable } from '@angular/core';
import {IDataService} from "../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const FETCH_CYCLE = 60 * 1000;

@Injectable({
  providedIn: 'root'
})

/**
 * 首屏-车组运行状态数据供应商服务
 */
export class TrainStatusDataService implements IDataService{

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getDataStructure(): any {
    return {
      total: {key: "equipType" },
      dataColumns: [
        {key: "warnCount", title: "预警"},
        {key: "forecastCount", title: "预测"}
      ]
    };
  }

  fetchData(): any{

    //设置超时，确保请求时间在interval周期内
    this.http.get('/blueScreen/trainStatus', { headers: new HttpHeaders({ timeout: `${FETCH_CYCLE- 50}` })}).subscribe(
      data => {
        this.addData(data);
      },
      error1 => {
        this._dataSubject.error(error1);
      });

  }

  public startTimer(){

    this.fetchData();

    setInterval(()=>{

      this.fetchData();

    }, FETCH_CYCLE);
  }


  private addData(subjectData: any): void {
    //console.log("train status data");
    //console.log(subjectData);

    this._dataSubject.next(subjectData);

  }

  public currentSubject(): Observable<any> {
    return this._dataSubject.asObservable();
  }
}
