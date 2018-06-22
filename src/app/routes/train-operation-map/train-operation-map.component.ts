import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxEchartsService} from "ngx-echarts";
import {zip, Observable, Subscription } from "rxjs";
import {Observer} from "rxjs/internal/types";
import {validateComponent} from "codelyzer/walkerFactory/walkerFn";

const FETCH_CYCLE: number = 30 * 1000;
const ANIME_CYCLE: number = 50; //以60HZ刷新率为基准
const DEBOUNCE: number = 16;
const ARRAY: Array<number> = [288, 13, 23, 322, 15, 23, 31, 124, 23, 100, 111, 56, 67, 99, 78, 90, 123, 23, 53, 51, 22, 1003, 23, 51, 41, 23];

//用于迭代数据，更好的暂时效果
class DataSource {
  private lastFetchedNumber: number = 0;

  private _idNumberRoll: any;
  private _idInterval: any;

  private count: number = 0;

  ondata: Function;
  oncomplete: Function;
  onerror: Function;

  constructor() {
    this.fetchData();
  }

  private fetchData(){
    //TODO 通过外部请求定时获取数据
     this._idInterval = setInterval(()=> {

      if(ARRAY[this.count]){
        this.updateValue(ARRAY[this.count++]);
      }else{
        clearInterval(this._idInterval);
      }
    }, FETCH_CYCLE)


  }

  private updateValue(v: number){
    let i = this.lastFetchedNumber, timeoutFlag = false;

    //间隔太大，大于动画帧执行时间
    if(Math.abs(v - i) > DEBOUNCE){
      timeoutFlag = true;

    }

    if(i < v){
      timeoutFlag ? i = v - DEBOUNCE : null;
      this._idNumberRoll = setInterval(() => this.emit(i++), ANIME_CYCLE);
    }else{
      timeoutFlag ? i = v + DEBOUNCE : null;
      this._idNumberRoll = setInterval(() => this.emit(i--), ANIME_CYCLE);
    }

    this.lastFetchedNumber = v;
  }

  //数据迭代
  private emit(n) {
    if (this.ondata) {
      this.ondata(n);
    }

    if (n === this.lastFetchedNumber) {
      if (this.oncomplete) {
        this.oncomplete();
      }
      this.destroy();
    }
  }

  destroy() {
    clearInterval(this._idNumberRoll);

  }
}


@Component({
  selector: 'app-train-operation-map',
  templateUrl: './train-operation-map.component.html',
  styleUrls: ['./train-operation-map.component.css']
})
export class TrainOperationMapComponent implements OnInit {

  warn: number = 0;
  forecast: number = 0;

  // show loading spinner:
  mapLoaded = false;
  // empty option before geoJSON loaded:
  options = {};

  warnDatasource: DataSource;

  constructor(private http: HttpClient, private es: NgxEchartsService) { }


  private warnObservable(observer: Observer<number>) {

      let warnDatasource = new DataSource();
      warnDatasource.ondata = (e) => observer.next(e);
      warnDatasource.onerror = (err) => observer.error(err);
      warnDatasource.oncomplete = () => observer.complete();


    return () => {
      warnDatasource.destroy();
    };
  }

  ngOnInit() {

    let that = this;

    let unsub = this.warnObservable({
      next(x) {
          that.warn = x;
          that.forecast = x + Math.floor( Math.random() * 23)
      },
      error(err) {
        console.error(err);
        },
      complete() {
        console.log('done')
      }
    });

    zip(
      this.http.get(`assets/data/CHINA.json`),
      this.http.get('assets/data/CHINA_PROVINCE_COLOR.json'),
    ).subscribe(([geoJson, provinceColor]) => {

        // hide loading:
        this.mapLoaded = true;

        // register map:
        this.es.registerMap('CHINA', geoJson);

        // update options:
        this.options = {
          geo: {
            map: 'CHINA',
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            scaleLimit:{
              min:1,
              max:5
            },
            zoom:1.25,
            itemStyle: {
              normal: {
                areaColor : "#329fec",
                borderColor: '#eee'
              },
              emphasis: {
                areaColor : "#20deec",
              },
            },
            regions: provinceColor,
          },
          series: [
            {
              name: 'Top 5',
              type: 'effectScatter',
              mapType: 'CHINA', // map type should be registered
              coordinateSystem: 'geo',
              data: [
                {name: '5501', value: [113,28.21], warn:12, forecast: 6},
                {name: '5008', value: [118.88,28.97], warn:23, forecast: 13},
                {name: '5654', value: [116.7,39.53], warn:1, forecast: 2},
                {name: '5018', value: [115.480656,35.23375], warn:6, forecast: 2},
                {name: '5372', value: [125.03,46.58], warn:7, forecast: 5},
              ],
              symbolSize: (val: any, dataRow) => (dataRow.data.warn + dataRow.data.forecast),
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: (dataRow: any) => `${dataRow.data.name} ${dataRow.data.warn}/${dataRow.data.forecast}`,
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#f4e925',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 1
            }
          ]
        };
      });
  }

}
