import {Injectable} from '@angular/core';
import {IDataService} from "../interface/idata-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PortletUtils} from "../../utils/PortletUtils";
import {RollingTableColumnSetting} from "../../shared/components/rolling-table/rolling-table-column-setting";

const FETCH_CYCLE = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})

/**
 * 首屏-预警/预测实时数据供应商服务
 */
export class WarnForecastInfoDataService implements IDataService {

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private portletUtils: PortletUtils) {
  }

  getDataStructure(): RollingTableColumnSetting {
    return {
      needIdx: true,
      idxOccupancyRate: 10,
      columns: [
        {title: '车组', key: 'equipName', style: {width: '10%'}},
        {title: '车辆', key: 'areaName', style: {width: '10%'}},
        {title: '部件', key: 'partName', style: {width: '20%'}},
        {title: '类型', key: 'type', keyTranslate: {warn: '预警', prognos: '预测'}, style: {width: '10%'}},
        {title: '详情', key: 'warnName', style: {width: '40%', 'align-items': 'baseline'}}
      ]
    };
  }

  fetchData(): any {

    let basePortletURL = this.portletUtils.createDefaultResourceURL("reportPortlet", "queryReportData");

    let params = new HttpParams({
      fromObject: {
        'reportCode': "RP_WARN_PROGNOS"
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
    this.http.get('/blueScreen/warnForecastInfo', { headers: new HttpHeaders({ timeout: `${FETCH_CYCLE- 50}` })}).subscribe(
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
    //console.log("warn forecast info data");
    //console.log(subjectData);

    this._dataSubject.next(subjectData);

  }

  public currentSubject(): Observable<any> {
    return this._dataSubject.asObservable();
  }

}
