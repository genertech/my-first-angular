import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RuntimeFaultDataService} from "../../../service/impl/fault-analysis/runtime-fault-data.service";

const COLOR_PALETTE = [
  "#4ef946",
  "#def946",
  "#f9d546",
  "#f5a57e",
  "#f98446",
  "#f94646",
  "#c046f9",
  "#f946c4",
  "#4689f9",
  "#46f9e2"];

@Component({
  selector: 'app-runtime-fault-summary',
  templateUrl: './runtime-fault-summary.component.html',
  styleUrls: ['./runtime-fault-summary.component.css']
})
export class RuntimeFaultSummaryComponent implements OnInit, OnChanges {

  labelText: string = '运营故障';
  mapLoaded: boolean = false;
  options: any;
  marqueeText: any = "";
  marqueeTextStyle = {
    'font-size': '20px'
  };

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
      //color: COLOR_PALETTE,
      textStyle: {
        color: 'white',
        fontSize: 12
      },
      legend: {
        data: data.legendData, //['CRH5A','CRH5G','CRH3A','CRH380B', 'CR400BF'],
        bottom: '15%',
        textStyle: {
          fontSize: 10,
          color: 'white',
        }
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '25%',
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
            fontSize: 12
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
            fontSize: 12
          },
          splitLine: {show: false},

        }
      ],
      series : data.legendData.map( ( d, i) => {

        return {
          name: d,
          type:'bar',
          barWidth : 30,
          stack: 'train',

          label:{
            show:false,
            position:'inside',
            formatter: '{c}'
          },
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0, color: COLOR_PALETTE[i % COLOR_PALETTE.length] // 0% 处的颜色
              },
              {
                offset: 0.5, color: '#bbb' // 50% 处的颜色
              },
              {
                offset: 1, color: COLOR_PALETTE[i % COLOR_PALETTE.length] // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          data: data.seriesData[i]
        }
      })
    };
  }

}
