import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {PortletUtils} from "../../utils/PortletUtils";
import {Subject} from "rxjs/internal/Subject";
import {RollingTableColumnSetting} from "../../shared/components/rolling-table/rolling-table-column-setting";

const FETCH_CYCLE = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class FaultReasonInvestigationDataService {

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private portletUtils: PortletUtils) {
  }

  getDataStructure(): RollingTableColumnSetting {

    return {
      needIdx: true,
      idxOccupancyRate: 5,
      columns: [
        {title: '车组号', key: 'equipName', style: {width: '15%'}},
        {title: '车箱', key: 'equipName', style: {width: '10%'}},
        {title: '故障详情', key: 'warnName', style: {width: '30%'}},
        {
          title: '排查方法', key: 'diagnosisType', style: {width: '15%'},
          keyTranslate:
            {
              '1': '自动定位',
              '2': '专家库匹配',
              '3': '交互式排故',
              '4': '原因排名'
            }
        },
        {title: '排查结果', key: 'maintenanceName', style: {width: '25%'}}
      ]
    };

  }

  fetchData(): any {


    let basePortletURL = this.portletUtils.createDefaultResourceURL("reportPortlet", "queryReportData");

    let params = new HttpParams({
      fromObject: {
        'reportCode': "RP_DIAGNOSIS_YYPC"
      }
    });

    this.http.jsonp(`${basePortletURL}&${params.toString()}`, "callback=JSON_CALLBACK").subscribe(
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
    this.http.get('/blueScreen/faultReasonInvestigation', { headers: new HttpHeaders({ timeout: `${FETCH_CYCLE- 50}` })}).subscribe(
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
