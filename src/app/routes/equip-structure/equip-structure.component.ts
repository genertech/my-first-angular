import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {HttpClient} from "@angular/common/http";
import {NgxEchartsService} from "ngx-echarts";
import {ActivatedRoute} from "@angular/router";
import {EquipStructureDataService} from "../../service/impl/equip-structure-data.service";

//展示内容范围
const CANVAS_WIDTH = 1750;
const CANVAS_HEIGHT = 750;
const SYMBOL_SIZE = 20;
const PARAM_INFO_FRAME_WIDTH = 400;
const PARAM_INFO_FRAME_HEIGHT = 180;
const PARAM_INFO_FRAME_Z_INDEX = 99;

@Component({
  selector: 'app-equip-structure',
  templateUrl: './equip-structure.component.html',
  styleUrls: ['./equip-structure.component.css']
})
export class EquipStructureComponent implements OnInit {

  frames = FRAMES;

  loadingOpts = {
    text: 'loading',
    color: '#c23531',
    textColor: '#fff',
    maskColor: 'rgba(0, 0, 0, 0.2)',
    zlevel: 0
  };
  private PARAMS_GRAPHS: Array<any> = [];
  private INFO_FRAME_POINTS: Array<any> = [];
  private PARAMS_SERIES: Array<any> = [];

  @ViewChild("equipStructureCharts") equipStructureCharts: ElementRef;
  private echarts: any;
  private echartsInstance: any;
  options: any;
  // ngx-echarts:
  mapLoaded = false;

  equips: any;

  constructor(private http: HttpClient, private nes: NgxEchartsService, private route: ActivatedRoute,
              private dataService: EquipStructureDataService) {
    this.echarts = this.nes.echarts;
  }

  ngOnInit() {

    let sn = this.route.snapshot.paramMap.get('sn');

    this.dataService.getEquipStructure(sn).subscribe(equipStructure => {
        this.dataDisplay(equipStructure);
      },
      error1 => {
        console.log('获取数据异常', error1)
      });
  }

  private displayAreaParams(areaId: any) {

    this.dataService.getAreaParams(areaId).subscribe(areaParams => {

      if (areaParams.image) {

        this.dataService.getImageBlobFromUrl('assets/data/train-head.png').subscribe(imageBlob => {

          this.dataService.blobImage2DataURLObservable(imageBlob).subscribe(imageDataURL => {

              this.dataService.imageDataURL2ImageObservable(imageDataURL).subscribe(image => {

                let bgConfig = this.processBgConfig(image);

                this.dataProcess(areaParams.hotSpots, bgConfig);

                this.mapLoaded = true;

                if(this.echartsInstance === undefined){

                  this.echartsInstance = this.echarts.init(this.equipStructureCharts.nativeElement);

                }
                this.echartsInstance.clear();

                this.options = {
                  title: {
                    text: areaParams.name,
                    textStyle:{
                      color: 'white'
                    },
                    left: 'center',
                    bottom: '0'
                  },
                  color: ['#8EC9EB'],
                  grid: {id: 'grid', width: '100%', height: '100%', left: 0, bottom: 0},
                  xAxis: {
                    type: 'value',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {show: false},
                    splitLine: {show: false},
                    min: 0,
                    max: CANVAS_WIDTH,
                    interval: 100
                  },
                  yAxis: {
                    type: 'value',
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {show: false},
                    splitLine: {show: false},
                    min: 0,
                    max: CANVAS_HEIGHT,
                    interval: 100
                  },
                  graphic: [
                    {
                      id: 'structure',
                      type: 'image',
                      left: 'center',
                      top: 'middle',
                      z: -1,
                      bounding: 'raw',
                      cursor: 'normal',
                      style: {
                        image: imageDataURL,
                        width: bgConfig.width,
                        height: bgConfig.height
                      }
                    },
                    ...this.PARAMS_GRAPHS
                  ],
                  series: [...this.PARAMS_SERIES]
                };

                this.bindDragEvent();

              });
            }
          );

        }, error1 => {
          console.log(error1);

        });
      }
    }, error1 => {
      console.log(error1);
    });
  }

  jump2Equip(area: any) {
    this.mapLoaded = false;
    this.displayAreaParams(area.id);

  }

  private dataDisplay(equipStructure: any) {

    this.updateChildRow(equipStructure);

    let areaIds = equipStructure.areasHaveProblem;
    if (areaIds && areaIds.length) {
      this.displayAreaParams(areaIds[0]);
    } else {
      this.displayAreaParams(equipStructure.areas[0].id)
    }

  }

  private updateChildRow(equipStructure: any){

    let _result = equipStructure, areas = equipStructure.areasHaveProblem;

    if (areas && areas.length) {

      _result = equipStructure.areas.map(area => {

        let special= {} as any;
        if(areas.includes(area.id)){
          special.style = {
            'background-color': '#ff3636'
          }
        }
        return Object.assign(area, special);
      });
    }

    this.equips = _result;

  }

  dataProcess(hotSpots: any, bgConfig: any) {

    this.PARAMS_GRAPHS.length = 0;
    this.PARAMS_SERIES.length = 0;
    this.INFO_FRAME_POINTS.length = 0;

    hotSpots.forEach((hotSpot) => {

      let dataPoint = [
        hotSpot.coordinate[0] * bgConfig.scale + bgConfig.prefixX,
        (bgConfig.naturalHeight - hotSpot.coordinate[1]) * bgConfig.scale + bgConfig.prefixY
      ];

      //数据框锚点，定位于数据框左下
      let dataFrameAnchor = [
        dataPoint[0] + this.randomPNone() * PARAM_INFO_FRAME_WIDTH,
        dataPoint[1] + this.randomPNone() * PARAM_INFO_FRAME_HEIGHT
      ];

      //确保锚点在可视范围内
      if (dataFrameAnchor[0] < SYMBOL_SIZE / 2) {
        dataFrameAnchor[0] = SYMBOL_SIZE / 2
      } else if (dataFrameAnchor[0] > CANVAS_WIDTH - SYMBOL_SIZE / 2 - PARAM_INFO_FRAME_WIDTH) {
        dataFrameAnchor[0] = CANVAS_WIDTH - SYMBOL_SIZE / 2 - PARAM_INFO_FRAME_WIDTH
      }

      if (dataFrameAnchor[1] < SYMBOL_SIZE / 2) {
        dataFrameAnchor[1] = SYMBOL_SIZE / 2
      } else if (dataFrameAnchor[1] > CANVAS_HEIGHT - SYMBOL_SIZE / 2 - PARAM_INFO_FRAME_HEIGHT) {
        dataFrameAnchor[1] = CANVAS_HEIGHT - SYMBOL_SIZE / 2 - PARAM_INFO_FRAME_HEIGHT
      }

      this.INFO_FRAME_POINTS.push(dataFrameAnchor);

      //数据延长线
      this.PARAMS_SERIES.push({
        id: `${hotSpot.id}_pointer`,
        type: 'line',
        symbol: 'circle',
        symbolSize: SYMBOL_SIZE,
        showSymbol: true,
        data: [dataPoint, dataFrameAnchor]
      });

      //数据展示框体
      this.PARAMS_GRAPHS.push({
        id: hotSpot.id,
        type: 'group',
        progressive: true,
        invisible: false,
        left: dataFrameAnchor[0],
        bottom: dataFrameAnchor[1],
        cursor: 'normal',
        children: [
          {
            id: `${hotSpot.id}_bg`,
            type: 'image',
            z: PARAM_INFO_FRAME_Z_INDEX,
            left: 'center',
            top: 'middle',
            cursor: 'normal',
            style: {
              image: 'assets/img/bg-main-3.png',
              width: PARAM_INFO_FRAME_WIDTH,
              height: PARAM_INFO_FRAME_HEIGHT
            }
          },
          {
            id: `${hotSpot.id}_txt`,
            type: 'text',
            z: PARAM_INFO_FRAME_Z_INDEX + 1,
            left: 'center',
            top: 'middle',
            cursor: 'normal',
            style: {
              text: (hotSpot.params.map(param => {

                return `${param.hasProblem ? '[*] ' : ''}${param.name} ${param.value}`;

              })).join('\n'),
              font: '30px Microsoft YaHei',
              fill: "#00ff00"
            }
          }
        ]
      });

    });

  }

  //使用隐藏的原点实现拖动效果
  bindDragEvent() {
    setTimeout(() => {

      this.echartsInstance.setOption({
        graphic: this.echarts.util.map(this.INFO_FRAME_POINTS, (item, idx) => {

          return {
            id: `dragHandle_${idx}`,
            type: 'circle',
            position: this.echartsInstance.convertFromPixel('grid', item),
            shape: {
              cx: 0,
              cy: 0,
              r: SYMBOL_SIZE / 2
            },
            invisible: true,    //设置为false以追踪轨迹
            draggable: true,
            ondrag: ($event) => {
              //console.log($event);

              this.PARAMS_SERIES[idx].data[1] = this.echartsInstance.convertFromPixel('grid', $event.target.position);

              this.PARAMS_GRAPHS[idx].left = $event.target.position[0];
              this.PARAMS_GRAPHS[idx].bottom = CANVAS_HEIGHT - $event.target.position[1];

              // Update data
              this.echartsInstance.setOption({
                series: this.PARAMS_SERIES[idx],
                graphic: this.PARAMS_GRAPHS[idx]
              });
            },
            z: PARAM_INFO_FRAME_Z_INDEX + 2
          };
        })
      });

    }, 0);

  }


  //对底图尺寸进行换算
  processBgConfig(image: HTMLImageElement) {

    //获取图片的原始尺寸
    let adjustHeight = image.naturalHeight;
    let adjustlWidth = image.naturalWidth;
    let fixH = CANVAS_HEIGHT / adjustHeight, fixW = CANVAS_WIDTH / adjustlWidth;

    if (fixH < fixW) {
      adjustlWidth = Math.floor(adjustlWidth * fixH);
      adjustHeight = CANVAS_HEIGHT;
    } else {
      adjustlWidth = CANVAS_WIDTH;
      adjustHeight = Math.floor(adjustHeight * fixW);
    }

    return {
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      width: adjustlWidth,
      height: adjustHeight,
      prefixX: (CANVAS_WIDTH - adjustlWidth) / 2,
      prefixY: (CANVAS_HEIGHT - adjustHeight) / 2,
      scale: fixH < fixW ? fixH : fixW
    }
  }

  onChartEvent(event, type: string) {

    //console.log('chart event:', type, event);

    if (event.seriesId) {
      //数据系列ID，用于匹配
      let seriesId = event.seriesId;
      this.toggleStatus(seriesId);

    }

  }

  toggleStatus(key: String) {

    let identify = key.split('_')[0];

    let graph = this.PARAMS_GRAPHS.find((ele) => {
      return ele.id === identify;
    });

    let serie = this.PARAMS_SERIES.find((ele) => {
      return ele.id === key;
    });

    if (graph && graph.id) {
      graph.invisible = !graph.invisible;

      this.echartsInstance.setOption({
        graphic: [
          {
            id: `${identify}_bg`,
            invisible: graph.invisible
          },
          {
            id: `${identify}_txt`,
            invisible: graph.invisible,
            style: {}  //由于echarts.4.1.0版本存在bug, 这个style必须有
          }
        ],
        series: {
          id: key,
          data: (graph.invisible ? [serie.data[0]] : [...serie.data])
        }
      });
    }


  }

  randomPNone() {
    return [1, -1][Math.floor(Math.random() * 2)];
  }

}
