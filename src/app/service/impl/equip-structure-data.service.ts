import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PortletUtils} from "../../utils/PortletUtils";


const TIME_OUT = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class EquipStructureDataService {


  constructor(private http: HttpClient, private portletUtils: PortletUtils) {
  }

  public getEquipStructure(equipType: string, equipSn: string): Observable<any> {

    let basePortletURL = this.portletUtils.createDefaultResourceURL("exploadViewPortlet", "queryViewsWithProblem");

    let params = new HttpParams({
      fromObject: {
        equipType: equipType,
        equipSn: equipSn
      }
    });

    return this.http.jsonp(`${basePortletURL}&${params.toString()}`, "callback");

    /*
    return this.http.get(`/blueScreen/equipStructure`, {
      params: {sn: `${id}`},
      headers: new HttpHeaders({timeout: `${TIME_OUT}`})
    })
    */
  }

  public getAreaParams(equipSn: string, areaId: string): Observable<any> {

    let basePortletURL = this.portletUtils.createDefaultResourceURL("exploadViewPortlet", "queryExploadViewData");

    let params = new HttpParams({
      fromObject: {
        viewId: areaId,
        equipSn: equipSn
      }
    });

    return this.http.jsonp(`${basePortletURL}&${params.toString()}`, "callback");

    /*
    return this.http.get(`/blueScreen/equipStructure/areaParams`, {
      params: {areaId: `${areaId}`},
      headers: new HttpHeaders({timeout: `${TIME_OUT}`})
    });
    */
  }

}
