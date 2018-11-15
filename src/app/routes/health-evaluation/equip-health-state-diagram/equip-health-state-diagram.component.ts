import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {NgxEchartsService} from "ngx-echarts";
import {EquipHealthStateDiagramDataService} from "../../../service/impl/equip-health-state-diagram-data.service";
import {ImageCommonService} from "../../../shared/service/image-common.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

//展示内容范围
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 660;
const SYMBOL_SIZE = 20;

const COLOR_PALETTE = {
  'D': '#fff525',
  'E': '#c23531',
}

@Component({
  selector: 'app-equip-health-state-diagram',
  templateUrl: './equip-health-state-diagram.component.html',
  styleUrls: ['./equip-health-state-diagram.component.css'],
  animations: [
    trigger('labelSwitch', [
      state('inactive', style({
        transform: 'rotateX(0)'
      })),
      state('active', style({
        transform: 'rotateX(90deg)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class EquipHealthStateDiagramComponent implements OnInit, OnChanges {

  aniStatus: string = 'inactive';

  equipTypeLabelText = '车型';
  equipSnLabelText = '车组';
  @Input() equipType: string = 'CRH3C';
  _equipType: string = 'N/A';
  @Input() equipSn: string = 'DEMO';
  _equipSn: string = 'N/A';

  loadingOpts = {
    text: 'loading',
    color: '#c23531',
    textColor: '#fff',
    maskColor: 'rgba(0, 0, 0, 0.2)',
    zlevel: 0
  };

  equips: Array<any> = [];
  private areasHaveProblem = [];

  @ViewChild("equipStructureCharts") equipStructureCharts: ElementRef;
  private echarts: any;
  private echartsInstance: any;
  options: any;
  // ngx-echarts:
  mapLoaded = false;

  private PARAMS_SERIES: Array<any> = [];

  constructor(private nes: NgxEchartsService, private dataService: EquipHealthStateDiagramDataService,
              private imageService: ImageCommonService) {
    this.echarts = this.nes.echarts;
  }

  ngOnInit() {

  }

  ngOnChanges() {

    this.aniStatus = 'active';
    this.mapLoaded = false;
    this.dataService.getHealthStateDiagram(this.equipType, this.equipSn).subscribe(response => {
        console.log(response);


        if (response.status === 'success') {

          this.dataDisplay(response.data.result)
        } else {
          console.log('获取数据异常', response);

        }

      },
      error1 => {
        console.log('获取数据异常', error1)
      });

  }

  private dataDisplay(equipStructure: any) {

    this.areasHaveProblem.length = 0;
    this.equips.length = 0;

    this.updateChildRow(equipStructure);

    let areaIds = this.areasHaveProblem;

    if (areaIds && areaIds.length) {
      this.displayHealthStateDiagram(areaIds[0]);
    } else if (equipStructure && equipStructure.length) {
      this.displayHealthStateDiagram(equipStructure[0].id)
    } else {
      this.displayHealthStateDiagram(null);
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

  private displayHealthStateDiagram(areaId: string) {

    if (this.echartsInstance === undefined) {

      this.echartsInstance = this.echarts.init(this.equipStructureCharts.nativeElement);

    }

    this.echartsInstance.clear();

    let area = this.equips.filter(ele => {
      return ele.id === areaId;
    });

    if (!area || area.length == 0) {
      this.mapLoaded = true;

      //显示N/A
      this.options = {
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
            type: 'text',
            left: 'center',
            top: 'middle',
            z: -1,
            bounding: 'raw',
            cursor: 'normal',
            style: {
              text: 'N/A',
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              fill: 'red',
              font: 'italic bolder 40px "Microsoft YaHei"'
            }
          },
        ]
      }

    } else {

      let f_area = area[0];

      if (f_area.image) {

        this.imageService.getImageBlobFromUrl(f_area.image).subscribe(imageBlob => {

          this.imageService.blobImage2DataURLObservable(imageBlob).subscribe(imageDataURL => {

              this.imageService.imageDataURL2ImageObservable(imageDataURL).subscribe(image => {

                let bgConfig = this.processBgConfig(image);

                this.dataProcess(f_area.hotSpots, bgConfig);

                this.mapLoaded = true;

                this.options = {
                  title: {
                    text: f_area.name,
                    textStyle: {
                      color: 'white',
                      fontSize: 30
                    },
                    left: 'center',
                    bottom: 160
                  },
                  color: ['#8EC9EB'],
                  grid: {id: 'grid', width: '100%', height: '100%', left: 0, bottom: 0},
                  tooltip : {
                    // trigger: 'axis',
                    showDelay : 0,
                    formatter : function (params) {

                      if(params.data){
                        return `${params.data.hotSpot.name}:${params.data.hotSpot.healthLevel}`;

                      }else{
                        return "";
                      }

                    }
                  },
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
                        width: 1100,
                        x: -20,
                        y: -20,
                        //height: bgConfig.height
                      }
                    },
                    {
                      id: 'structure',
                      type: 'image',
                      left: 'center',
                      //top: 'middle',
                      z: -1,
                      bounding: 'raw',
                      cursor: 'normal',
                      style: {
                        image: imageDataURL,
                        width: bgConfig.width,
                        height: bgConfig.height,
                        y: 180,

                      }
                    },
                  ],
                  series: [...this.PARAMS_SERIES]
                };

              });
            }
          );

        }, error1 => {
          console.log(error1);

        });
      }
    }


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

  dataProcess(hotSpots: any, bgConfig: any) {

    //this.PARAMS_GRAPHS.length = 0;
    this.PARAMS_SERIES.length = 0;

    if (!hotSpots || hotSpots.length == 0) {
      return;
    }

    hotSpots.forEach((hotSpot) => {

      let dataPoint = [
        hotSpot.posX * bgConfig.scale + bgConfig.prefixX,
        (bgConfig.naturalHeight - hotSpot.posY) * bgConfig.scale + bgConfig.prefixY,
        hotSpot.index
      ];

      this.PARAMS_SERIES.push({
        id: `${hotSpot.id}_pointer`,
        type: 'line',
        symbol: 'circle',
        symbolSize: SYMBOL_SIZE,
        showSymbol: true,
        itemStyle: {
          color: COLOR_PALETTE[hotSpot.healthLevel]
        },
        data: [
          {value: dataPoint, hotSpot:hotSpot},
        ],

      });

    });

  }

  switchCallback($event) {

    if ($event.fromState === 'inactive' || $event.fromState === 'void') {
      this._equipType = this.equipType;
      this._equipSn = this.equipSn;

      this.aniStatus = 'inactive'
    }

  }

  jump2Equip(area: any) {
    this.mapLoaded = false;
    this.displayHealthStateDiagram(area.id);

  }


}
