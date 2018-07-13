import {Component, Input, OnInit} from '@angular/core';

const COLOR_PALETTE = ['#f98446', '#c0c610', '#25d04f', '#2a89e5', '#ef2ee7'];

@Component({
  selector: 'app-fault-summary',
  templateUrl: './fault-summary.component.html',
  styleUrls: ['./fault-summary.component.css']
})
export class FaultSummaryComponent implements OnInit {

  options: any;

  @Input() labelText: string = '故障分布';
  @Input() equipTypeLabelText: string = '统计类型';
  @Input() equipType: string = '车型';

  mapLoaded = false;

  constructor() { }

  ngOnInit() {

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
          data:['CRH5A','CRH5G','CRH3A','CRH380B', 'CR400BF'],
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
          barWidth : 40,
          stack: 'train',
          itemStyle: {
            color: (p) => {
              return COLOR_PALETTE [ p.dataIndex % COLOR_PALETTE.length];
            }
          },
          label:{
            show:true,
            position:'insideTop',
            formatter: '{c}',
            fontSize: 18
          },
          data:[6, 11, 19, 13, 11]
        },
      ]
    };

  }

}
