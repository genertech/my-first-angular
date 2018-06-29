import { Injectable } from '@angular/core';
import {IDataService} from "../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const FETCH_CYCLE = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
/**
 * 首屏-健康评估数据供应商服务
 */
export class HealthEvaluationInfoDataService implements IDataService{

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getDataStructure(): any {

    return [
      {title:'车组号', key: 'area', style:{ width: '20%'}},
      {title:'车辆号', key: 'pv', style:{ width: '20%'}},
      {title:'等级', key: 'attribute', style:{ width: '20%'}},
      {title:'系统/部件',key: 'xt', style:{ width: '30%'}}
    ];

  }

  fetchData(): any{

    //设置超时，确保请求时间在interval周期内
    this.http.get('/blueScreen/healthEvaluationInfo', { headers: new HttpHeaders({ timeout: `${FETCH_CYCLE- 50}` })}).subscribe(
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
    //console.log("health evaluation info data");
    //console.log(subjectData);

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
