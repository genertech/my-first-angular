import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PortletUtils} from "../../utils/PortletUtils";

const TIME_OUT = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class EquipHealthStateDiagramDataService {

  constructor(private http: HttpClient, private portletUtils: PortletUtils) { }


  getHealthStateDiagram(equipType: string, equipSn: string): Observable<any> {


    if (equipSn === "DEMO" && equipType === "CRH3C") {
      return this.http.get(`/blueScreen/equipHealthStateDiagram`, {
        params: {equipType: `${equipType}`, equipSn: `${equipSn}`},
        headers: new HttpHeaders({timeout: `${TIME_OUT}`})
      });
    }


    let basePortletURL = this.portletUtils.createDefaultResourceURL("exploadViewPortlet", "queryExploadViewHealthIndex");

    let params = new HttpParams({
      fromObject: {
        equipType: equipType,
        equipSn: equipSn
      }
    });

    return this.http.jsonp(`${basePortletURL}&${params.toString()}`, "callback");
  }

}
