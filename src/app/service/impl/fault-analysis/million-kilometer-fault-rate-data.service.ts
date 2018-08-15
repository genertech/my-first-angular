import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PHMUtils} from "../../../utils/PHMUtils";

const TIME_OUT = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class MillionKilometerFaultRateDataService {

  constructor(private http: HttpClient, private phmUtils: PHMUtils) { }

  getDataObservable(): Observable<any> {

    let interfaceURL = this.phmUtils.createPHMServerURL("data/gzAnalysis/faultNumber");

    return this.http.jsonp(`${interfaceURL}`, "callback");

  }
}
