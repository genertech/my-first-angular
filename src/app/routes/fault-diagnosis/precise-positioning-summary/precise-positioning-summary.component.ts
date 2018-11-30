import {Component, Input, OnInit} from '@angular/core';
import {PrecisePositioningSummaryDataService} from "../../../service/impl/precise-positioning-summary-data.service";
import {SingleBarChartData} from "../../../shared/components/single-bar-chart-fragment/single-bar-chart-data";

const BAR_STYLE = {
  type:'bar',
  barWidth : 40,
  stack: 'train',
  label:{
    show:true,
    position:'inside',
    formatter: '{c}'
  },
};

const CODE_TRANSLATION = {
  '1':'自动定位',
  '2':'专家库匹配',
  '3':'交互式排故',
  '4':'原因排名'

};

const COLOR_PALETTE = ["#92b446","#d99252","#f946c4","#c046f9","#4689f9","#46f9e2","#4ef946","#def946","#f9d546","#f5a57e" ];

@Component({
  selector: 'app-precise-positioning-summary',
  templateUrl: './precise-positioning-summary.component.html',
  styleUrls: ['./precise-positioning-summary.component.css']
})
export class PrecisePositioningSummaryComponent implements OnInit {

  labelText: string = '精准定位统计';

  data: SingleBarChartData;

  mapLoaded: boolean = false;
  _chartInitFinished = false;

  options: any;
  updateOptions: any;

  constructor( private dataService: PrecisePositioningSummaryDataService) { }

  ngOnInit() {

    this.dataService.currentSubject().subscribe(next=>{

      this.chartUpdate(next);

    },error1 => {
        console.log('error', error1)
    });

    this.dataService.startTimer();

  }

  initChart() {

    this.mapLoaded = true;

    this.options = {
      color: COLOR_PALETTE,
      textStyle: {
        color: 'white',
        fontSize: 15
      },
      legend: {
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
          axisLine: {
            lineStyle:{
              color: 'white'
            },
          },
          axisTick: {show: false},
          axisLabel:{
            interval:0,
            fontSize: 17,
            rotate: 30
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
      series : []
    };

  }

  private chartUpdate(data) {

    if (!this._chartInitFinished) {
      this.initChart();
      this._chartInitFinished = true;
    }

    this.data = this.dataProcess(data);

    if (this.data  && this.data.series.length > 0) {

      this.mapLoaded = true;

      this.updateOptions = {
        legend: {
          data: this.data.series.map((ele) => (ele.name))
        },
        xAxis: {
          data: this.data.xAxisData,
        },
        series: this.data.series.map( ele => {
          return Object.assign(ele, BAR_STYLE);
        })
      };

    }
  }

  private dataProcess(data:any): SingleBarChartData{

    if(Array.isArray(data)){
      let xAxisData = [], label = [], series = [];
      data.forEach( (ele) => {

        let labelIndex, xAxisIndex;

        labelIndex = label.indexOf(ele.diagnosisType);
        xAxisIndex = xAxisData.indexOf(ele.sysName);

        if(labelIndex === -1){

          label.push(ele.diagnosisType);

          series.push({
            name: CODE_TRANSLATION[ele.diagnosisType],
            data: []
          });

          labelIndex = series.length-1;
        }

        if(xAxisIndex === -1){

          xAxisData.push(ele.sysName);
          xAxisIndex = xAxisData.length -1
        }

        series[labelIndex].data[xAxisIndex] = ele.count;

      });

      return {
        xAxisData: xAxisData,
        series: series
      };

    }else{
      return null;
    }


  }
}
