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
   * 首屏-预警/预测实时数据供应商服务
 */
export class WarnForecastInfoDataService implements IDataService{

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getDataStructure(): any {
    return [
      {title:'车组号', key: 'area', style:{ width: '20%'}},
      {title:'部件', key: 'pv', style:{ width: '20%'}},
      {title:'类型', key: 'lx', style:{ width: '10%'}},
      {title:'详情', key: 'attribute', style:{ width: '40%'}}
    ];
  }

  fetchData(): any{

    //设置超时，确保请求时间在interval周期内
    this.http.get('/blueScreen/warnForecastInfo', { headers: new HttpHeaders({ timeout: `${FETCH_CYCLE- 50}` })}).subscribe(
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
    //console.log("warn forecast info data");
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
