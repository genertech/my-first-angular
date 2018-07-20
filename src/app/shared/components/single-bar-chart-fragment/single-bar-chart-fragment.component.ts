import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SingleBarChartData} from "./single-bar-chart-data";

@Component({
  selector: 'app-single-bar-chart-fragment',
  templateUrl: './single-bar-chart-fragment.component.html',
  styleUrls: ['./single-bar-chart-fragment.component.css']
})
export class SingleBarChartFragmentComponent implements OnInit, OnChanges {

  loadingOpts = {
    text: 'loading',
    color: '#c23531',
    textColor: '#fff',
    maskColor: 'rgba(0, 0, 0, 0.2)',
    zlevel: 0
  };

  @Input() labelText: string = 'title';

  @Input() colorPalette: Array<string> = ['#27f30c', '#f3de0c'];

  @Input() data: SingleBarChartData;

  @Input() barCustomStyle = {
    type:'bar',
    barWidth : 40,
    stack: 'train',
    label:{
      show:true,
      position:'inside',
      formatter: '{c}'
    },
  };

  updateOptions: any;

  mapLoaded: boolean = false;
  _chartInitFinished = false;
  options: any;

  constructor() {
  }

  ngOnChanges() {

    if (!this._chartInitFinished) {
      this.initChart();
      this._chartInitFinished = true;
    }


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
          return Object.assign(ele, this.barCustomStyle);
        })
      };

    }

  }


  initChart() {

    this.options = {
      color: this.colorPalette,
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
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: 'white'
          },
        },
        axisTick: {show: false},
        axisLabel: {
          interval: 0,
          fontSize: 17
        },
        splitLine: {show: false}
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'white'
          },
        },
        axisTick: {show: false},
        axisLabel: {
          interval: 0,
          fontSize: 17
        },
        splitLine: {show: false},

      },
      series: []
    };
  }

  ngOnInit() {

  }
}
