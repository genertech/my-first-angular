import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RuntimeFaultDataService} from "../../../service/impl/fault-analysis/runtime-fault-data.service";

const COLOR_PALETTE = ["#f98446","#f94646","#f946c4","#c046f9","#4689f9","#46f9e2","#4ef946","#def946","#f9d546","#f5a57e" ];

@Component({
  selector: 'app-runtime-fault',
  templateUrl: './runtime-fault.component.html',
  styleUrls: ['./runtime-fault.component.css']
})
export class RuntimeFaultComponent implements OnInit, OnChanges {

  labelText: string = '运营故障';
  mapLoaded: boolean = false;
  options: any;
  marqueeText: any = "";

  constructor(private dataService: RuntimeFaultDataService) {

  }

  ngOnInit() {

    this.dataService.getDataObservable().subscribe(next => {

      if(next.status.toLowerCase() === "success"){

        this.dataProcess(next.data);
      }

    }, error1 => {
      console.error(error1);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  private dataProcess(data: any){
    this.mapLoaded = true;

    if(!data) return;

    let lastDateSplit = data.axisData[data.axisData.length-1].split('-');

    let lastData = 0;

    data.seriesData.forEach(serie => {
      lastData = Number(lastData) + Number(isNaN(serie[serie.length - 1]) ? 0 : serie[serie.length - 1]);

    });

    this.marqueeText = `${lastDateSplit[0]}年${lastDateSplit[1]}月长客股份各型动车组总计发生故障${lastData}件`; //，其中造成运行影响故障0件（安监报0件 ）;

    this.options = {
      color: COLOR_PALETTE,
      textStyle: {
        color: 'white',
        fontSize: 15
      },
      legend: {
        data: data.legendData, //['CRH5A','CRH5G','CRH3A','CRH380B', 'CR400BF'],
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
          data : data.axisData, //['1月','2月','3月','4月','5月','6月','7月', '8月', '9月', '10月', '11月', '12月'],
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
      series : data.legendData.map( ( d, i) => {

        return {
          name: d,
          type:'bar',
          barWidth : 40,
          stack: 'train',

          label:{
            show:false,
            position:'inside',
            formatter: '{c}'
          },
          data: data.seriesData[i]
        }
      })/*[
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
      ]*/
    };
  }

}
