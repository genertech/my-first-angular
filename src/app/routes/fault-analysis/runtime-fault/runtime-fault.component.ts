import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-runtime-fault',
  templateUrl: './runtime-fault.component.html',
  styleUrls: ['./runtime-fault.component.css']
})
export class RuntimeFaultComponent implements OnInit {

  labelText: string = '运营故障';
  mapLoaded: boolean = false;
  options: any;

  constructor() { }

  ngOnInit() {

    this.mapLoaded = true;

    this.options = {
      color: ['#f98446', '#c0c610', '#25d04f', '#2a89e5', '#ef2ee7'],
      textStyle: {
        color: 'white',
        fontSize: 15
      },
      legend: {
        data:['CRH5A','CRH5G','CRH3A','CRH380B', 'CR400BF'],
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
          data : ['1月','2月','3月','4月','5月','6月','7月', '8月', '9月', '10月', '11月', '12月'],
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
          name:'CRH5A',
          type:'bar',
          barWidth : 40,
          stack: 'train',
          label:{
            show:true,
            position:'inside',
            formatter: '{c}'
          },
          data:[6, 11, 19, 13, 11, 5, 8, 9, 14, 19, 11]
        },
        {
          name:'CRH5G',
          type:'bar',
          stack: 'train',
          label:{
            show:true,
            position:'inside',
            formatter: '{c}'
          },
          data:[12, 3, 11, 9, 3, 12, 6, 7, 7, 4, 13, 4]
        },
        {
          name:'CRH3A',
          type:'bar',
          stack: 'train',
          label:{
            show:true,
            position:'inside',
            formatter: '{c}'
          },
          data:[6, 7, 7, 4, 5, 13, 4, 12, 11, 9, 3, 12]
        },
        {
          name:'CRH380B',
          type:'bar',
          stack: 'train',
          label:{
            show:true,
            position:'inside',
            formatter: '{c}'
          },
          data:[5, 8, 9, 14, 19, 11, 12, 12, 11, 9, 3, 12]
        },
        {
          name:'CR400BF',
          type:'bar',
          stack: 'train',
          label:{
            show:true,
            position:'inside',
            formatter: '{c}'
          },
          data:[6, 8, 11, 8, 6, 11, 20, 6, 23, 11, 19, 13]
        }
      ]
    };

  }

}
