import {Injectable} from '@angular/core';
import {IDataService} from "../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {PortletUtils} from "../../utils/PortletUtils";
import {RollingTableColumnSetting} from "../../shared/components/rolling-table/rolling-table-column-setting";

const FETCH_CYCLE = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
/**
 * 首屏-健康评估数据供应商服务
 */
export class HealthEvaluationInfoDataService implements IDataService {

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private portletUtils: PortletUtils) {
  }

  getDataStructure(): RollingTableColumnSetting {

    return {
      needIdx: true,
      idxOccupancyRate: 10,
      columns: [
        {title: '车组号', key: 'equipName', style: {width: '20%'}},
        {title: '车辆号', key: 'areaName', style: {width: '20%'}},
        {title: '等级', key: 'healthLevel', style: {width: '20%'}},
        {title: '系统/部件', key: 'partName|sysName', matchPatten:"first", style: {width: '30%'}}
      ]
    };

  }

  fetchData(): any {

    let basePortletURL = this.portletUtils.createDefaultResourceURL("reportPortlet", "queryReportData");

    let params = new HttpParams({
      fromObject: {
        'reportCode': "RP_HEALTH_INDEX"
      }
    });

    this.http.jsonp(`${basePortletURL}&${params.toString()}`, "callback").subscribe(
      data => {

        let _response: any = (data);

        if (_response.status === "success") {
          this.addData(_response.data.result);

        } else {
          this._dataSubject.error(_response.msg)
        }
      },
      error1 => {
        this._dataSubject.error(error1);
      }
    );

    //设置超时，确保请求时间在interval周期内
    /*
    this.http.get('/blueScreen/healthEvaluationInfo', { headers: new HttpHeaders({ timeout: `${FETCH_CYCLE- 50}` })}).subscribe(
      data => {
        this.addData(data);
      },
      error1 => {
        this._dataSubject.error(error1);
      });
      */
  }

  public startTimer() {

    this.fetchData();

    setInterval(() => {

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

}
