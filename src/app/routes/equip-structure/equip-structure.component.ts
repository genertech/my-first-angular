import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {NgxEchartsService} from "ngx-echarts";
import {ActivatedRoute, Router} from "@angular/router";
import {EquipStructureDataService} from "../../service/impl/equip-structure-data.service";
import {ImageCommonService} from "../../shared/service/image-common.service";

//展示内容范围
const CANVAS_WIDTH = 1550;
const CANVAS_HEIGHT = 750;
const SYMBOL_SIZE = 20;
const PARAM_INFO_FRAME_WIDTH = 400;
const PARAM_INFO_FRAME_HEIGHT = 180;
const PARAM_INFO_FRAME_Z_INDEX = 99;

const MAIN_PAGE_URL = 'main-page';

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

  private INFO_FRAME_POINTS: Array<any> = [];
  private PARAMS_SERIES: Array<any> = [];

  private areasHaveProblem = [];

  @ViewChild("equipStructureCharts") equipStructureCharts: ElementRef;
  private echarts: any;
  private echartsInstance: any;
  options: any;
  // ngx-echarts:
  mapLoaded = false;

  equips: any;

  constructor(private nes: NgxEchartsService, private route: ActivatedRoute, private router: Router,
              private dataService: EquipStructureDataService, private imageService: ImageCommonService) {
    this.echarts = this.nes.echarts;
  }

  private currEquipType;
  private currEquipSn;

  //单个热点区域的参数太多时，通过time line 切分显示
  private timeLineOptions = [];

  ngOnInit() {

    this.currEquipType = this.route.snapshot.paramMap.get('equipType');
    this.currEquipSn = this.route.snapshot.paramMap.get('equipSn');

    this.dataService.getEquipStructure(this.currEquipType, this.currEquipSn).subscribe(response => {
        //console.log(response);

        if (response.status === 'success') {
          this.dataDisplay(response.data.result)
        }

      },
      error1 => {
        console.log('获取数据异常', error1)
      });
  }

  private displayAreaParams(areaId: any) {

    this.dataService.getAreaParams(this.currEquipSn, areaId).subscribe(response => {

      let areaParams;
      console.log(response);

      if (response.status !== 'success') {
        //异常处理

      } else {
        areaParams = response.data.result;

        if (areaParams.image) {

          this.imageService.getImageBlobFromUrl(areaParams.image).subscribe(imageBlob => {

            this.imageService.blobImage2DataURLObservable(imageBlob).subscribe(imageDataURL => {

                this.imageService.imageDataURL2ImageObservable(imageDataURL).subscribe(image => {

                  let bgConfig = this.processBgConfig(image);

                  this.mapLoaded = true;

                  if (this.echartsInstance === undefined) {

                    this.echartsInstance = this.echarts.init(this.equipStructureCharts.nativeElement);

                  }
                  this.echartsInstance.clear();

                  let baseOption = {
                    title: {
                      text: areaParams.name,
                        textStyle: {
                          color: 'white',
                          fontSize: 30
                      },
                      left: 'center',
                      bottom: 80
                    },
                    color: ['#8EC9EB'],
                      grid: {id: 'grid', width: '100%', height: '100%', left: 0, top: 0},
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
                        id: 'halo',
                        type: 'image',
                        //left: 'center',
                        //top: 'middle',
                        z: -1,
                        bounding: 'raw',
                        cursor: 'normal',
                        style: {
                          image: 'assets/img/halo.png',
                          width: 1500,
                          y: -60,
                          x: -20
                          //height: bgConfig.height
                        }
                      }
                      ,{
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
                      }
                    ],
                    series: null
                  };

                  this.dataProcess(areaParams.hotSpots, bgConfig, true);

                  //baseOption.series = [...this.PARAMS_SERIES];

                  this.options = this.buildTimeLine(baseOption);

                  this.bindDragEvent();

                });
              }
            );

          }, error1 => {
            console.log(error1);

          });
        }
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

    let areaIds = this.areasHaveProblem;

    if (areaIds && areaIds.length) {
      this.displayAreaParams(areaIds[0]);
    } else {
      this.displayAreaParams(equipStructure[0].id)
    }

  }

  private updateChildRow(equipStructure: any) {

    if (equipStructure && equipStructure.length) {

      this.equips = equipStructure.map(area => {

        let special = {} as any;
        if (area.hasOwnProperty('hasProblem') && area.hasProblem === true) {
          this.areasHaveProblem.push(area.id);
          special.style = {
            'background-color': '#ff3636'
          }
        }
        return Object.assign(area, special);
      });

    }

  }

  dataProcess(hotSpots: any, bgConfig: any, isParameterSeparate:boolean = false) {

    let options;
    //this.PARAMS_GRAPHS.length = 0;
    this.PARAMS_SERIES.length = 0;
    this.INFO_FRAME_POINTS.length = 0;

    if (!hotSpots || hotSpots.length == 0) {
      return;
    }

    if(isParameterSeparate){
      options = [];
    }

    this.timeLineOptions.length = 0;

    hotSpots.forEach((hotSpot) => {

      let dataPoint = [
        hotSpot.posX * bgConfig.scale + bgConfig.prefixX,
        (bgConfig.naturalHeight - hotSpot.posY) * bgConfig.scale + bgConfig.prefixY
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

      this.INFO_FRAME_POINTS.push({
        id: hotSpot.id,
        coordinate: dataFrameAnchor
      });


      if(isParameterSeparate){
        let parameterSeparatesArray = hotSpot.params.reduce((prev, next, index) => {
          index % 3 === 0 ? prev.push([next]) : prev[prev.length-1].push(next);
          return prev
        },[]);

        parameterSeparatesArray.forEach((spParams, idx) => {
          if(!this.timeLineOptions[idx]) this.timeLineOptions[idx] = {series:[]};
          this.timeLineOptions[idx].series.push(this.buildSeries(hotSpot.id, dataPoint, dataFrameAnchor, spParams));
        });

      }else{

        //数据延长线
        this.PARAMS_SERIES.push(this.buildSeries(hotSpot.id, dataPoint, dataFrameAnchor, hotSpot.params));

      }

    });

  }

  private buildTimeLine(baseOption: any): any{
    baseOption.timeline = {
      // y: 0,
      axisType: 'category',
      // realtime: false,
      // loop: false,
      autoPlay: true,
      // currentIndex: 2,
      playInterval: 3000,
      // controlStyle: {
      //     position: 'left'
      // },
      data: this.timeLineOptions.map((ele, idx) => (idx)),
      label: {
        formatter : (s) => s
      }
    };
    baseOption.calculable = true;

    console.log(this.timeLineOptions);

    return {
      baseOption: baseOption,
      options: this.timeLineOptions
    }
  }

  buildSeries(dataId, dataPoint: number[], dataFrameAnchor: number[], params): any{
    return {
      id: `${dataId}_pointer`,
      type: 'line',
      symbol: 'circle',
      symbolSize: SYMBOL_SIZE,
      showSymbol: true,
      data: [
        {value: dataPoint},
        {
          value: dataFrameAnchor,
          label: {
            show: true,
            position: 'right',
            formatter: (data) => {

              let paramsInfo = params.map(param => {

                //每14个字符长度换行
                let name = param.name.replace(/[^\x00-\xff]/g,"$&\x01").replace(/.{14}\x01?/g,"$&\n").replace(/\x01/g,"");
                return `${param.hasProblem ? '{problemParam' : '{normalParam'}|${name}} ${param.hasProblem ? '{problemValue' : '{normalValue'}|${param.value}}`;

              });

              return [...paramsInfo].join('\n{hr|}\n');
            },
            backgroundColor: {
              image: 'assets/img/bg-main-3.png'
            },
            padding: [20, 0, 20, 50],
            width: 400,
            height: 200,
            rich: {
              hr: {
                borderColor: '#61b8ff',
                width: '90%',
                borderWidth: 0.5,
                height: 0
              },
              normalParam: {
                fontSize: 24,
                color: '#d99252',
                width: 150,
                padding: 5,
                align: 'left'
              },
              problemParam: {
                fontSize: 24,
                color: '#ff3636',
                width: 150,
                padding: 5,
                align: 'left'
              },
              normalValue: {
                fontSize: 24,
                color: '#d99252',
                width: 130,
                padding: [5, 0, 5, 100],
                align: 'left'
              },
              problemValue: {
                fontSize: 24,
                color: '#ff3636',
                width: 130,
                padding: [5, 0, 5, 100],
                align: 'left'
              },
            }
          }
        }
      ],

    };
  }

  //使用隐藏的点实现拖动效果
  bindDragEvent() {
    setTimeout(() => {

      this.echartsInstance.setOption({
        graphic: this.echarts.util.map(this.INFO_FRAME_POINTS, (item, idx) => {

          return {
            id: `dragHandle_${item.id}`,
            type: 'circle',
            position: this.echartsInstance.convertFromPixel('grid', item.coordinate),
            shape: {
              cx: 0,
              cy: 0,
              r: SYMBOL_SIZE / 2
            },
            invisible: true,    //设置为false以追踪轨迹
            draggable: true,
            ondragstart: $event => {
              this.echartsInstance.dispatchAction({
                type: 'timelineChange',
                // 时间点的 index
                currentIndex: 0
              });
            },
            ondrag: ($event) => {
              //console.log($event);
              this.timeLineOptions.forEach((option) => {

                let matcher = option.series.find((ele) =>{
                  return ele.id === `${item.id}_pointer`;
                });

                if(matcher){
                  //console.log(matcher);
                  matcher.data[1].value = this.echartsInstance.convertFromPixel('grid', $event.target.position);
                }

              });

              this.echartsInstance.setOption({
                options: this.timeLineOptions,
              });

              //this.PARAMS_SERIES[idx].data[1].value = this.echartsInstance.convertFromPixel('grid', $event.target.position);

              // Update data
              /*
              this.echartsInstance.setOption({
                series: this.PARAMS_SERIES[idx],
              });
              */
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

  onClick($event){
    this.router.navigateByUrl(`${MAIN_PAGE_URL}`);

  }

  //显示/隐藏参数面板
  toggleStatus(key: String) {

    let identify = key.split('_')[0];


    this.echartsInstance.dispatchAction({
      type: 'timelineChange',
      // 时间点的 index
      currentIndex: 0
    });

    let serie = this.PARAMS_SERIES.find((ele) => {
      return ele.id === key;
    });

    if (serie && serie.id) {
      serie.invisible = !serie.invisible;

      this.echartsInstance.setOption({
        series: {
          id: key,
          data: (serie.invisible ? [serie.data[0]] : [...serie.data])
        }
      });
    }

    this.timeLineOptions.forEach((option) => {

      let matcher = option.series.find((ele) =>{
        return ele.id === `${identify}_pointer`;
      });

      if(matcher){
        matcher.invisible = !matcher.invisible;
        //TODO 操作series的第二个DATA

      }

    });



  }

  randomPNone() {
    return [1, -1][Math.floor(Math.random() * 2)];
  }

}
