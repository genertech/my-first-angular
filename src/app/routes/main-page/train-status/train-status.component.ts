import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgxEchartsService} from "ngx-echarts";
import {TrainStatusDataService} from "../../../service/impl/train-status-data.service";

const DEMO_DATA = {
  "all": 703,
  "status": {
    "车组总数": 703,
    "上线": 495,
    "未上线": 208,
    "热备": 10,
    "高级修": 68,
    "扣修": 6,
    "库停": 74,
  }
};

@Component({
  selector: 'app-train-status',
  templateUrl: './train-status.component.html',
  styleUrls: ['./train-status.component.css'],
  providers: [TrainStatusDataService]
})
export class TrainStatusComponent implements OnInit {

  trainStatusLabel: string = "车组状态";

  options = {};
  updateOptions = {};

  mapLoaded = false;

  constructor(private dataService: TrainStatusDataService, private es: NgxEchartsService) { }

  ngOnInit() {

    // hide loading:
    this.mapLoaded = true;

    // update options:
    this.options = {
      yAxis: {
        type: 'value',
        max: DEMO_DATA.all,
        splitLine: {
          show: false
        },
        show:false
      },
      grid: {
        top: 30,
        left: 0,
        width: '96%',
        height: '80%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: Object.keys(DEMO_DATA.status),
        axisLabel: {
          interval: 0,
          fontSize: 20,
          fontWeight: "normal",
          color: "#FFF",
        },
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {
          show: false
        },
      },
      series: [{
        type: 'bar',
        stack: 'chart',
        z: 3,
        itemStyle:{
          normal:{
            color:"rgb(47, 143, 190)"
          }
        },
        label: {
          normal: {
            position: 'top',
            color: '#FFF',
            fontSize: 18,
            show: true
          }
        },
        data: Object.keys(DEMO_DATA.status).map(function (key) {
          return DEMO_DATA.status[key];
        })
      }, {
        type: 'bar',
        stack: 'chart',
        silent: true,
        itemStyle: {
          normal: {
            color: 'rgb(12, 47, 63)'
          }
        },
        data: Object.keys(DEMO_DATA.status).map(function (key) {
          return DEMO_DATA.all - DEMO_DATA.status[key];
        })
      }]
    };

    this.subscribeDataService()
  }

  subscribeDataService() {

    this.dataService.currentSubject().subscribe(
      val => {

        this.updateChart(val);
      },
      error => {
        console.log(`获取数据异常:${error}`)
      }
    );

    this.dataService.startTimer();

  }

  updateChart(data: any){

    this.updateOptions = {
      yAxis: {
        max: data.all
      },
      xAxis:{
        data: Object.keys(data.status),
      },
      series: [{
        data: Object.keys(data.status).map(function (key) {
          return data.status[key];
        })
      }, {
        data: Object.keys(data.status).map(function (key) {
          return data.all - data.status[key];
        })
      }]
    }

  }

}
