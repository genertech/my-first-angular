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
        },
        series: [
          {
            id: 'train-current-position',
            name: 'scatter3D',
            type: "scatter3D",
            coordinateSystem: 'geo3D',
            symbol: 'circle',
            opacity: 1,
            data: [
              {name: '5501', value: [113, 28.21], warn: 12, forecast: 6},
              {name: '5008', value: [118.88, 28.97], warn: 23, forecast: 0},
              {name: '5654', value: [116.7, 39.53], warn: 0, forecast: 2},
              {name: '5018', value: [115.480656, 35.23375], warn: 6, forecast: 2},
              {name: '5372', value: [125.03, 46.58], warn: 7, forecast: 5},
            ],
            symbolSize: (val, item) => {

              return item.data.warn * 2 + item.data.forecast
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: (item) => `${item.data.name} ${item.data.warn}/${item.data.forecast}`,
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

                  return '#f4e925';
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

  private dataProcess(data: Array<any>) {

    let sum_warn = 0, sum_forecast = 0;

    let processedData = data.map((item) => {

      sum_warn += item.warn;
      sum_forecast += item.forecast;
      return {
        name: item.train,
        value: item.coordinate,
        warn: item.warn,
        forecast: item.forecast
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

/*  3D中国地图
option = {
       geo3D: {
         map: 'CHINA',
         roam: true,
         itemStyle: {
             areaColor: '#3fa7dc',
             opacity: .9,
             borderWidth: 0.4,
             borderColor: '#fff'
         },
         regionHeight: 0.15,
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
                 show: false,
                 textStyle: {
                     color: '#fff',
                     fontSize: 3,
                     backgroundColor: 'rgba(0,23,11,0)'
                 }
             }
         },
         //shading: 'lambert',
         light: { //光照阴影
             main: {
                 color: '#fff', //光照颜色
                 intensity: 1.2, //光照强度
                 //shadowQuality: 'high', //阴影亮度
                 shadow: false, //是否显示阴影
                 alpha:55,
                 beta:10

             },
              ambient: {
                 intensity: 0.3
             }
         }
     },
        series: [
         {
         name: 'scatter3D',
         type: "scatter3D",
         coordinateSystem: 'geo3D',
         symbol: 'circle',
         opacity: 1,
         data: [
              {name: '5501', value: [113, 28.21], warn: 12, forecast: 6},
              {name: '5008', value: [118.88, 28.97], warn: 23, forecast: 0},
              {name: '5654', value: [116.7, 39.53], warn: 0, forecast: 2},
              {name: '5018', value: [115.480656, 35.23375], warn: 6, forecast: 2},
              {name: '5372', value: [125.03, 46.58], warn: 7, forecast: 5},
            ],
            symbolSize: (val, item) => {

              return item.data.warn * 2 + item.data.forecast
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: (item) => `${item.data.name} ${item.data.warn}/${item.data.forecast}`,
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

                  return '#f4e925';
                },
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },

     }
        ]
    };
*/
