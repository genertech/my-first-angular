import { Injectable } from '@angular/core';
import {PortletUtils} from "../../../utils/PortletUtils";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";

const FETCH_CYCLE = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class MtPurchaseSuggestionDataService {

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private portletUtils: PortletUtils) {
  }

  fetchData(): any {

    let basePortletURL = this.portletUtils.createDefaultResourceURL("reportPortlet", "queryReportData");

    let params = new HttpParams({
      fromObject : {
        'reportCode' : "RP_MD_PJCGJY"}
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
  }}
