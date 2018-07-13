import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxEchartsService} from "ngx-echarts";
import {zip} from "rxjs";
import {TrainOperationMapDataService} from "../../../service/impl/train-operation-map-data.service";
import {Router} from "@angular/router";

const EQUIP_STRUCTURE_URL = 'equip-structure/';

@Component({
  selector: 'app-train-operation-map',
  templateUrl: './train-operation-map.component.html',
  styleUrls: ['./train-operation-map.component.css'],
  providers: [TrainOperationMapDataService]
})

export class TrainOperationMapComponent implements OnInit {

  warn: number = 0;
  forecast: number = 0;

  // show loading spinner:
  mapLoaded = false;
  // empty option before geoJSON loaded:
  options = {};
  updateOptions = {};

  loadingOpts = {
    text: 'loading',
    color: '#c23531',
    textColor: '#fff',
    maskColor: 'rgba(0, 0, 0, 0.2)',
    zlevel: 0
  };

  warnLabel: string = "预警";
  forecastLabel: string = "预测";

  constructor(private http: HttpClient, private dataService: TrainOperationMapDataService,
              private es: NgxEchartsService, private router: Router) {
  }

  ngOnInit() {

    let that = this;

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
        geo3D: {
          map: 'CHINA',
          roam: true,
          itemStyle: {
            color: '#3fa7dc',
            opacity: 0.9,
            borderWidth: 0.4,
            borderColor: '#eee'
          },
          regionHeight: 1,
          regions: provinceColor,
          label: {
            show: false,
            textStyle: {
              color: '#000', //地图初始化区域字体颜色
              fontSize: 8,
              opacity: 1,
              backgroundColor: 'rgba(0,23,11,0)'
            },
          },
          emphasis: { //当鼠标放上去  地区区域是否显示名称
            label: {
              show: false
            },
            itemStyle:{
              areaColor: '#3fa7dc',
            }
          },
          shading: 'color',
          viewControl:{
            rotateMouseButton: 'left',
            panMouseButton: 'right',
            minDistance: 10,
            maxDistance: 400,
          }
        },
        series: [
          {
            id: 'train-current-position',
            name: 'scatter3D',
            type: "scatter3D",
            coordinateSystem: 'geo3D',
            symbol: 'pin',
            opacity: 1,
            data: [
              {name: '5501', value: [113, 28.21], warn: 2, forecast: 3},
              {name: '5008', value: [118.88, 28.97], warn: 5, forecast: 0},
              {name: '5654', value: [116.7, 39.53], warn: 0, forecast: 2},
              {name: '5018', value: [115.480656, 35.23375], warn: 2, forecast: 2},
              {name: '5372', value: [125.03, 46.58], warn: 1, forecast: 5},
            ],
            symbolSize: (val, item) => {

              return  20 + 10* (item.data.warn * 2 + item.data.forecast)
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: (item) => (item.data.warn || item.data.forecast) ?
                  `${item.data.name} ${item.data.warn}/${item.data.forecast}` : `${item.data.name}`
                ,
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: (item) => {
                  let data = item.data;
                  if (data.warn) {

                    if (data.forecast) {
                      return '#ec3c3f'
                    }
                    return '#f48900'
                  }

                  if(data.forecast){
                    return '#f4e925';
                  }

                  return '#4af43f';
                },
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },

          }
        ]
      };

    });


    this.dataServiceSubscribe();

  }

  //订阅数据源
  private dataServiceSubscribe() {

    this.dataService.currentSubject().subscribe(
      next => {
        this.dataProcess(next);
      },
      error => {
        console.error(`请求异常：${error}`);
      }
    );

    this.dataService.startTimer();
  }

  /**
   * data - >
   * [{equipName: "0504"
   *   equipSn: "0504"
   *   equipType: "CRH380BG"
   *   equipTypeName: "CRH380BG"
   *   posX: 126.5078
   *   posY: 45.6322
   *   prognosCount: 0
   *   updateTime: 1530696234000
   *   warnCount: 0
   * },...]
   */
  private dataProcess(data: Array<any>) {

    let sum_warn = 0, sum_forecast = 0;

    let processedData = data.filter(item =>{
       return (item.posX && item.posY);

    }).map((item) => {

      if(item.warnCount){
        sum_warn += item.warnCount;
      }

      if(item.prognosCount){
        sum_forecast += item.prognosCount;
      }

      return {
        name: item.equipName,
        value: [item.posX, item.posY],
        warn: item.warnCount,
        forecast: item.prognosCount
      };

    });

    this.updateOptions = {
      series: [
        {
          id: 'train-current-position',
          type: 'scatter3D',
          mapType: 'CHINA', // map type should be registered
          coordinateSystem: 'geo3D',
          data: processedData
        }
      ]
    };

    this.warn = sum_warn;
    this.forecast = sum_forecast;

  }

  nav2EquipStructure(event) {
    console.log(event);
    if (event.componentType === 'series') {
      this.router.navigateByUrl(EQUIP_STRUCTURE_URL + event.data.name);
    }
  }

}
