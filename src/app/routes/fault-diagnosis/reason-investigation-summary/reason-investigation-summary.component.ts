import {Component, OnInit} from '@angular/core';
import {ReasonInvestigationSummaryDataService} from "../../../service/impl/reason-investigation-summary-data.service";
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

@Component({
  selector: 'app-reason-investigation-summary',
  templateUrl: './reason-investigation-summary.component.html',
  styleUrls: ['./reason-investigation-summary.component.css']
})
export class ReasonInvestigationSummaryComponent implements OnInit {

  labelText: string = '原因排查统计';

  data: SingleBarChartData;

  mapLoaded: boolean = false;
  _chartInitFinished = false;

  options: any;
  updateOptions: any;

  constructor(private dataService: ReasonInvestigationSummaryDataService) {
  }

  ngOnInit() {

    this.dataService.currentSubject().subscribe(next => {

      this.chartUpdate(next);

    }, error1 => {
      console.log('error', error1)
    });

    this.dataService.startTimer();
  }

  initChart() {

    this.mapLoaded = true;

    this.options = {
      color: ['#27f30c', '#f3de0c', '#f98446', '#c0c610', '#25d04f', '#2a89e5', '#ef2ee7'],
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
      xAxis: [
        {
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

        }
      ],
      yAxis: [
        {
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

        }
      ],
      series: []
    };

  }

  private chartUpdate(data) {

    if (!this._chartInitFinished) {
      this.initChart();
      this._chartInitFinished = true;
    }

    this.data = this.dataProcess(data);

    if (this.data && this.data.series.length > 0) {

      this.mapLoaded = true;

      this.updateOptions = {
        legend: {
          data: this.data.series.map((ele) => (ele.name))
        },
        xAxis: {
          data: this.data.xAxisData,
        },
        series: this.data.series.map(ele => {
          return Object.assign(ele, BAR_STYLE);
        })
      };

    }
  }

  private dataProcess(data: any): SingleBarChartData {

    if (Array.isArray(data)) {
      let xAxisData = [], label = [], series = [];
      data.forEach((ele) => {

        let labelIndex, xAxisIndex;

        labelIndex = label.indexOf(ele.diagnosisType);
        xAxisIndex = xAxisData.indexOf(ele.sysName);

        if (labelIndex === -1) {

          label.push(ele.diagnosisType);

          series.push({
            name: ele.diagnosisType,
            data: []
          });

          labelIndex = series.length - 1;
        }

        if (xAxisIndex === -1) {

          xAxisData.push(ele.sysName);
          xAxisIndex = xAxisData.length - 1
        }

        series[labelIndex].data[xAxisIndex] = ele.count;

      });

      return {
        xAxisData: xAxisData,
        series: series
      };

    } else {
      return null;
    }

  }

}
