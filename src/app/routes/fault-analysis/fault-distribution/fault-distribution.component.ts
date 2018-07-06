import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fault-distribution',
  templateUrl: './fault-distribution.component.html',
  styleUrls: ['./fault-distribution.component.css']
})
export class FaultDistributionComponent implements OnInit {

  options: any;

  @Input() labelText: string = '故障分布';
  @Input() equipTypeLabelText: string = '车型';
  @Input() equipType: string = 'CRH5A';

  mapLoaded = false;

  constructor() { }

  ngOnInit() {

    this.mapLoaded = true;

    this.options = {
      color: ['#6cf5f2'],
      textStyle: {
        color: 'white'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {show:false},
        name: '公里数',
        nameLocation: 'middle',
        nameGap: 30,
        data: ['0', '10万', '20万', '30万', '40万']
      },
      yAxis: {
        type: 'value',
        axisTick: {show:false},
        splitLine: {show: false},
        name: '故障数',

      },
      series: [
        {
          name:'模拟数据',
          type:'line',
          smooth:false,
          symbol: 'circle',
          symbolSize: 12,
          label:{
            show:true,
            formatter: '{c}'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 1,
              y: 1,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#0f1e2e',
                  opacity: 2
                }, {
                  offset: 1,
                  color: '#3d9399'
                }],
              globalCoor: true,

            }
          },
          data: ['150', '200', '25', '150', '90']
        }
      ]
    };


  }

  private equipSwitchInterval:any;


  chartsInit(myCharts) {

  }
}
