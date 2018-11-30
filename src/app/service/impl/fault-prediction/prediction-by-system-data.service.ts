import { Injectable } from '@angular/core';
import {PortletUtils} from "../../../utils/PortletUtils";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";

const FETCH_CYCLE = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class PredictionBySystemDataService{

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private portletUtils: PortletUtils) {
  }

  fetchData(): any {

    let basePortletURL = this.portletUtils.createDefaultResourceURL("reportPortlet", "queryReportData");

    let params = new HttpParams({
      fromObject : {
        'reportCode' : "RP_PROGNOS_SYS"}
    });

    this.http.jsonp(`${basePortletURL}&${params.toString()}`, "callback=JSON_CALLBACK").subscribe(
      data => {

        let _response:any = (data);

        if(_response.status === "success"){
          this.addData(_response.data.result);

        }else{

          this._dataSubject.error(_response.msg)
        }
      },
      error1 => {

        /*
        this.addData([
          {sysName: 'A', lvl: 'A', count:12},
          {sysName: 'B', lvl: 'A', count:31},
          {sysName: 'C', lvl: 'A', count:2},
          {sysName: 'A', lvl: 'B', count:5},
          {sysName: 'B', lvl: 'B', count:10},
          {sysName: 'C', lvl: 'B', count:11},
          {sysName: 'A', lvl: 'C', count:15},
          {sysName: 'B', lvl: 'C', count:12},
          {sysName: 'C', lvl: 'C', count:24}
        ]);
        */
        this._dataSubject.error(error1);
      }
    );

  }

  public startTimer() {

    this.fetchData();

    setInterval(() => {

      this.fetchData();

    }, FETCH_CYCLE);
  }

  private addData(subjectData: any): void {
    //console.log("reason investigation summary data");
    //console.log(subjectData);

    this._dataSubject.next(subjectData);

  }

  public currentSubject(): Observable<any> {
    return this._dataSubject.asObservable();
  }
}
