import {Component, Input, OnInit} from '@angular/core';
import {FaultSummaryDataService} from "../../../service/impl/fault-analysis/fault-summary-data.service";

const COLOR_PALETTE = ['#f98446', '#c0c610', '#25d04f', '#2a89e5', '#ef2ee7'];

@Component({
  selector: 'app-fault-summary',
  templateUrl: './fault-summary.component.html',
  styleUrls: ['./fault-summary.component.css']
})
export class FaultSummaryComponent implements OnInit {

  options: any;

  @Input() labelText: string = '故障统计';
  @Input() equipTypeLabelText: string = '统计类型';
  @Input() equipType: string = '车型';

  mapLoaded = false;

  constructor(private dataService: FaultSummaryDataService) { }

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
          barWidth : 40,
          stack: 'train',
          itemStyle: {
            color: (p) => {
              return COLOR_PALETTE [ p.dataIndex % COLOR_PALETTE.length];
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
