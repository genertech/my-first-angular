import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PHMUtils} from "../../../utils/PHMUtils";

const TIME_OUT = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class RuntimeFaultDataService {

  constructor(private http: HttpClient, private phmUtils: PHMUtils) { }

  getDataObservable(): Observable<any> {

    let interfaceURL = this.phmUtils.createPHMServerURL("data/gzAnalysis/operationFailure");

    return this.http.jsonp(`${interfaceURL}`, "callback");

  }
}
