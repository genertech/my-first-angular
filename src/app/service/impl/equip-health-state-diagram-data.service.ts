import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

const TIME_OUT = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class EquipHealthStateDiagramDataService {

  constructor(private http: HttpClient) { }


  getHealthStateDiagram(equipType:string, equipSn:string) :Observable<any> {

    return this.http.get(`/blueScreen/equipHealthStateDiagram`, {
      params: {equipType: `${equipType}`, equipSn: `${equipSn}`},
      headers: new HttpHeaders({timeout: `${TIME_OUT}`})
    });
  }

}
