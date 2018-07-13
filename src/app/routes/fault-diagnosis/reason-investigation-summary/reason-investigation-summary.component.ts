import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reason-investigation-summary',
  templateUrl: './reason-investigation-summary.component.html',
  styleUrls: ['./reason-investigation-summary.component.css']
})
export class ReasonInvestigationSummaryComponent implements OnInit {

  labelText: string = '原因排查统计';
  mapLoaded: boolean = false;
  options: any;

  constructor() { }

  ngOnInit() {

    this.mapLoaded = true;

    this.options = {
      color: ['#27f30c', '#f3de0c', '#f98446', '#c0c610', '#25d04f', '#2a89e5', '#ef2ee7'],
      textStyle: {
        color: 'white',
        fontSize: 15
      },
      legend: {
        data:['交互式','原因排序'],
        bottom: '7%',
        textStyle: {
          fontSize: 17,
          color: 'white',
        }
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
          data : ['高压','牵引','制动','辅助','门','空调','网络'],
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

        }
      ],
      series : [
        {
          name:'交互式',
          type:'bar',
          barWidth : 40,
          stack: 'train',
          label:{
            show:true,
            position:'inside',
            formatter: '{c}'
          },
          data:[346, 113, 319, 213, 411, 135, 98]
        },
        {
          name:'原因排序',
          type:'bar',
          stack: 'train',
          label:{
            show:true,
            position:'inside',
            formatter: '{c}'
          },
          data:[125, 346, 76, 67, 74, 213, 544]
        }
      ]
    };

  }

}
