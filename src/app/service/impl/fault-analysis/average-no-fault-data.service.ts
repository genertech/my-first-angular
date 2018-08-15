import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PHMUtils} from "../../../utils/PHMUtils";

const TIME_OUT = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AverageNoFaultDataService {

  constructor(private http: HttpClient, private phmUtils: PHMUtils) { }

  getDataByTimeObservable(): Observable<any> {

    let interfaceURL = this.phmUtils.createPHMServerURL("data/gzAnalysis/avgFaultFreeTime");

    return this.http.jsonp(`${interfaceURL}`, "callback");

    /*
    return this.http.post(`${interfaceURL}`, {
      headers: new HttpHeaders({
        timeout: `${TIME_OUT}`
      })
    });
    */
  }

  getDataByKilometerObservable(): Observable<any> {

    let interfaceURL = this.phmUtils.createPHMServerURL("data/gzAnalysis/avgFaultFreeGl");

    return this.http.jsonp(`${interfaceURL}`, "callback");

    /*
    return this.http.post(`${interfaceURL}`, {
      headers: new HttpHeaders({
        timeout: `${TIME_OUT}`
      })
    });
    */
  }
}
