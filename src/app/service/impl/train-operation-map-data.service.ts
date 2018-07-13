import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";
import {IDataService} from "../interface/idata-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {PortletUtils} from "../../utils/PortletUtils";

const REQUEST_URL = '/blueScreen/trainOperation';
const FETCH_CYCLE: number = 60 * 1000;

@Injectable({
  providedIn: 'root'
})

/**
 * 首屏-车组运行地图实时数据供应商服务
 */
export class TrainOperationMapDataService implements IDataService {

  private _dataSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private portletUtils: PortletUtils) {
  }

  private _idInterval: any;

  fetchData(): any {


    let basePortletURL = this.portletUtils.createDefaultResourceURL("reportPortlet", "queryReportData");

    let params = new HttpParams({
      fromObject : {
        'reportCode' : "RP_MAP_MONITOR"}
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

    //设置超时，确保请求时间在interval周期内
    /*
    this.http.get('/blueScreen/trainOperation', {headers: new HttpHeaders({timeout: `${FETCH_CYCLE - 50}`})}).subscribe(
      data => {
        this.addData(data);
      },
      error1 => {
        this._dataSubject.error(error1);
      });
    */
  }

  public destroy() {
    clearInterval(this._idInterval);

  }

  public startTimer() {

    this.fetchData();

    setInterval(() => {

      this.fetchData();

    }, FETCH_CYCLE);
  }

  private addData(subjectData: any): void {
    //console.log("train operation map data");
    //console.log(subjectData);

    this._dataSubject.next(subjectData);

  }

  public currentSubject(): Observable<any> {
    return this._dataSubject.asObservable();
  }

}
