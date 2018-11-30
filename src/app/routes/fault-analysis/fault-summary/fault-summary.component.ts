import {Component, Input, OnInit} from '@angular/core';
import {FaultSummaryDataService} from "../../../service/impl/fault-analysis/fault-summary-data.service";
import {NgxEchartsService} from "ngx-echarts";

const COLOR_PALETTE = ["#f98446","#f94646","#f946c4","#c046f9","#4689f9","#46f9e2","#4ef946","#def946","#f9d546","#f5a57e" ];


@Component({
  selector: 'app-fault-summary',
  templateUrl: './fault-summary.component.html',
  styleUrls: ['./fault-summary.component.css']
})
export class FaultSummaryComponent implements OnInit {

  private echarts: any;
  options: any;

  @Input() labelText: string = '故障统计';
  @Input() equipTypeLabelText: string = '统计类型';
  @Input() equipType: string = '车型';

  mapLoaded = false;

  constructor(private nes: NgxEchartsService, private dataService: FaultSummaryDataService) {
    this.echarts = this.nes.echarts;

  }

  ngOnInit() {

    this.dataService.getDataObservable().subscribe(next => {

      //console.log(next);
      if(next.status.toLowerCase() === "success"){

        this.dataProcess(next.data);
      }

    }, error1 => {
      console.error(error1);
    });

  }

  private dataProcess(data: any) {
    this.mapLoaded = true;

    this.options = {
      textStyle: {
        color: 'white',
        fontSize: 15
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data: data.axisData, //['CRH5A','CRH5G','CRH3A','CRH380B', 'CR400BF'],
          axisLine: {
            lineStyle:{
              color: 'white'
            },
          },
          axisTick: {show: false},
          axisLabel:{
            interval:0,
            fontSize: 17,
            rotate: 45,
          },
          splitLine: {show: false}

        }
      ],
      yAxis : [
        {
          type : 'value',
          axisLine: {
            lineStyle:{
              color: 'white'
            },
          },
          axisTick: {show: false},
          axisLabel:{
            interval:0,
            fontSize: 17
          },
          splitLine: {show: false},
          name: '故障数',
        }
      ],
      series : [
        {
          name:'故障数',
          type:'bar',
          barWidth : 30,
          stack: 'train',
          itemStyle: {
            color: (p) => {

              return {
                x:1,
                y: 1,
                x2: 1,
                y2: 0,
                colorStops: [
                  {offset: 0, color: '#0e1b2c'},
                  {offset: 1, color: COLOR_PALETTE [ p.dataIndex % COLOR_PALETTE.length]}
                ]
              };
            }
          },
          label:{
            show:true,
            position:'top',
            formatter: '{c}',
            fontSize: 18
          },
          data: data.seriesData[0]//[6, 11, 19, 13, 11]
        },
      ]
    };
  }
}
