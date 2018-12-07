import { Component, OnInit } from '@angular/core';
import {RepairSuggestionDataService} from "../../service/impl/maintenance-decision/repair-suggestion-data.service";
import {AdvanceRepairSuggestionDataService} from "../../service/impl/maintenance-decision/advance-repair-suggestion-data.service";

import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {SimpleRollingTableConfig} from "../../shared/components/simple-rolling-table-fragment/simple-rolling-table-config";
import {HealthEvaluationInfoDataService} from "../../service/impl/health-evaluation-info-data.service";
import {WarnForecastInfoDataService} from "../../service/impl/warn-forecast-info-data.service";
import {SingleBarChartData} from "../../shared/components/single-bar-chart-fragment/single-bar-chart-data";
import {MillionKilometerFaultRateDataService} from "../../service/impl/fault-analysis/million-kilometer-fault-rate-data.service";
import {SingleBarChartStyle} from "../../shared/components/single-bar-chart-fragment/single-bar-chart-style";

const COLOR_PALETTE = ['#28d3d3', '#f1f57c'];

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  frames = FRAMES;
  repairSuggestionRTConfig: SimpleRollingTableConfig;
  adRepairSuggestionRTConfig: SimpleRollingTableConfig;
  healthEvaluationRTConfig: SimpleRollingTableConfig;
  warnForecastRTConfig: SimpleRollingTableConfig;

  repairSuggestionData: Array<any>;
  adRepairSuggestionData: Array<any>;
  healthEvaluationData: Array<any>;
  warnForecastData: Array<any>;

  millionKilometerFaultCount: SingleBarChartData;
  millionKilometerFaultCountCS: SingleBarChartStyle;
  COLOR_PALETTE: Array<any> = COLOR_PALETTE;

  barCustomStyle: any;

  constructor(private repairSuggestionDS: RepairSuggestionDataService,
              private adRepairSuggestionDS: AdvanceRepairSuggestionDataService,
              private healthEvaluationDS: HealthEvaluationInfoDataService,
              private warnForecastInfoDS: WarnForecastInfoDataService,
              private millionKilometerFaultDS: MillionKilometerFaultRateDataService) { }

  ngOnInit() {

    this.rollingTableInit();

    this.repairSuggestionDS.currentSubject().subscribe(next=>{

      this.repairSuggestionData = next;

    }, error1 => {
      console.log("error", error1);
    });

    this.adRepairSuggestionDS.currentSubject().subscribe(next=>{

      this.adRepairSuggestionData = next;

    }, error1 => {
      console.log("error", error1);
    });

    this.healthEvaluationDS.currentSubject().subscribe( next=>{
      this.healthEvaluationData = next;
    }, error1 => {
      console.log("error", error1);
    });

    this.warnForecastInfoDS.currentSubject().subscribe( next=>{
      this.warnForecastData = next;
    }, error1 => {
      console.log("error", error1);
    });

    this.millionKilometerFaultDS.getDataObservable().subscribe(next => {

      if(next.status.toLowerCase() === "success"){

        console.log(next.data);
        this.millionKilometerFaultCount =  this.barChartDataGenerator(next.data);
      }

    }, error1 => {
      console.error(error1);
    });

    this.repairSuggestionDS.startTimer();
    this.adRepairSuggestionDS.startTimer();
    this.healthEvaluationDS.startTimer();
    this.warnForecastInfoDS.startTimer();
  }

  private rollingTableInit() {

    this.repairSuggestionRTConfig = {
      labelText: '运用修建议',
      labelTextStyle: {'font-size': '20px', color: '#12dce6'},
      labelStyle: {width: '200px', background: 'unset', height: '30px'},
      switchLoop: 60 * 1000,
      sectionLabelStyle: {'padding': 0},
      sectionLabelText: '日期',
      sectionLabelTextStyle: {'font-size': '20px', color: '#266da9'},
      sectionLabelKeyStyle: {'font-size': '20px', color: '#266da9'},
      sectionKey: "date",
      columnSetting: {
        needIdx: false,
        columnHeight: '40px',
        columns: [
          {title: '车型', key: 'equipTypeName', style: {width: '15%', 'font-size': '16px'}},
          {title: '车组号', key: 'equipName', style: {width: '15%', 'font-size': '16px'}},
          {title: '处理建议', key: 'adviceContent', style: {width: '40%', 'font-size': '16px'}},
          {title: '建议修程', key: 'repairClassName', style: {width: '15%', 'font-size': '16px'}},
          {
            title: '状态',
            key: 'status',
            style: {width: '15%', 'font-size': '16px'},
            keyTranslate: {'10': '未处理', '20': '已推送', '30': '已完成'}
          }
        ]
      }
    };

    this.adRepairSuggestionRTConfig = {
      labelText: '高级修建议',
      labelTextStyle: {'font-size': '20px', color: '#12dce6'},
      labelStyle: {width: '200px', background: 'unset', height: '30px'},
      switchLoop: 60 * 1000,
      sectionLabelStyle: {'padding': 0},
      sectionLabelText: '日期',
      sectionLabelTextStyle: {'font-size': '20px', color: '#266da9'},
      sectionLabelKeyStyle: {'font-size': '20px', color: '#266da9'},
      sectionKey: "date",
      columnSetting: {
        needIdx: false,
        columnHeight: '40px',
        columns: [
          {title: '车型', key: 'equipTypeName', style: {width: '15%', 'font-size': '16px'}},
          {title: '车组号', key: 'equipName', style: {width: '15%', 'font-size': '16px'}},
          {title: '处理建议', key: 'adviceContent', style: {width: '40%', 'font-size': '16px'}},
          {title: '建议修程', key: 'repairClassName', style: {width: '15%', 'font-size': '16px'}},
          {
            title: '状态',
            key: 'status',
            style: {width: '15%', 'font-size': '16px'},
            keyTranslate: {'10': '未处理', '20': '已推送', '30': '已完成'}
          }
        ]
      }
    };

    this.healthEvaluationRTConfig = {
      labelText: '健康评估信息',
      labelTextStyle: {'font-size': '20px', color: '#12dce6'},
      labelStyle: {width: '200px', background: 'unset', height: '30px'},
      switchLoop: 60 * 1000,
      sectionLabelStyle: {'padding': 0},
      sectionLabelText: '车型',
      sectionLabelTextStyle: {'font-size': '20px', color: '#266da9'},
      sectionLabelKeyStyle: {'font-size': '20px', color: '#266da9'},
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: false,
        columnHeight: '40px',
        columns: [
          {title: '车组号', key: 'equipName', style: {width: '20%', 'font-size': '16px'}},
          {title: '车辆号', key: 'areaName', style: {width: '20%', 'font-size': '16px'}},
          {title: '等级', key: 'healthLevel', style: {width: '20%', 'font-size': '16px'}},
          {title: '系统/部件', key: 'partName|sysName', matchPatten: "first", style: {width: '30%', 'font-size': '16px'}}
        ]
      }
    };

    this.warnForecastRTConfig = {
      labelText: '预警/预测信息',
      labelTextStyle: {'font-size': '20px', color: '#12dce6'},
      labelStyle: {width: '200px', background: 'unset', height: '30px'},
      switchLoop: 60 * 1000,
      sectionLabelStyle: {'padding': 0},
      sectionLabelText: '车型',
      sectionLabelTextStyle: {'font-size': '20px', color: '#266da9'},
      sectionLabelKeyStyle: {'font-size': '20px', color: '#266da9'},
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: false,
        columnHeight: '40px',
        columns: [
          {title: '车组', key: 'equipName', style: {width: '10%', 'font-size': '16px'}},
          {title: '车辆', key: 'areaName', style: {width: '10%', 'font-size': '16px'}},
          {title: '部件', key: 'partName', style: {width: '20%', 'font-size': '16px'}},
          {
            title: '类型',
            key: 'type',
            keyTranslate: {warn: '预警', prognos: '预测'},
            style: {width: '10%', 'font-size': '16px'}
          },
          {
            title: '详情', key: 'warnName',
            style: {
              width: '40%', 'overflow': 'hidden',
              'text-overflow': 'ellipsis',
              'white-space': 'nowrap',
              'font-size': '16px'
            }
          }
        ]
      }
    };

    this.millionKilometerFaultCountCS = {
      labelStyle: {background: 'unset'},
      labelTextStyle: {'font-size': '20px', color: '#12dce6'}

    };

    let paperDataURI = 'data:image/png;base64,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';
    let paperDataURI2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABRCAYAAADGiRgzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAeNSURBVHhe7ZzLbxNHHMdn18ZevxKnpRQuJTculYhEhYALuSG1SHDlRK6oh9IDVXqoVIlDQVxy4wrqP5CeuFRqKtEoFNQElEJdHnESIA+aeOPn2l7bnd9vZr12skns9WPX8Xy0u/PYdbz+fuc3M55sQgTuQeKpa7l169YgpEWPJ+oNh6OQl30+TAEpGKzmgUo2q/IsKRcKqp5OY/mHGzcWsdLFOGIGCFwZHBwGUQ8NDQ3LgUD0UDQ6DLuf7nAN5CH1KEqd2K1S0jS1lMupBVWNQ7lIU53uUNbzeTX/9u2cU8Z11AxD9MDw8KghtnL44xFvOBJtt8jtppBIoEFglra2Ngf58uLi1Pj4+Ba/pO20zQxD+MiJE5d9x46NQAtXjh4d4acPDBBZuZWVuVw8PpWlJn135cov/FTLtGTGT3fvngTxoeUHqAFub+2dIr2wMNUOc5oyw2j9AyMjYwMQAbS/56cENSRmZ+8lY7HJZo1pyIybd+4cHzp1amyQmiAMaA4wJvHo0cT316495VW7sqcZ0A0duXBhop+7ICsqPG2GDO3KNqgpe0WLpRkQCZ9evDgRpmPBQTHBEND4wHYEbQfa6urcyuTkmFWk7DBj4sGDb46Mjv7YiyY4JbAdNmZmJr4+e/ZbXkSqZsDgHDl//sfDZ85c51WO0EuCtgpEyer9+6PGdxcZaymtGgEitmPvJ+B72NGrV6cgEKCMZkDXZGWElVi77QJ7gCEfXbp0D/LYTf28ubkAa0SQFzhD/PbtqAwzJ2GE8wRPn74uF2RZGOECsqpKZF3XSLlU5FUCx/D66ACu6ySbXOc1AidIJVNkfXWdyDQq1PXlZ6RYyPJTgm5SLBbJ/NO/ST6pqnIoFKJzKonEY9NEyyb5JYJuAEbMPpnFyPBTH+RMJoMnSrS7evPPNEmqa1gWdJbkVpI8nnlEEhubWPbQnUUGxVgXWXo9R5bj89QcMah3AoiGxYUF8mRmhqS2UryWUV0OqV0yTGy8J/NzU+TD2hKvEbQKmLAUXyAzDx+S2PMXdN6k12mepz2ULJX16qMt23m3HKN92q/UyecklUrwWkEz5HJZ8ubVS/LH77+R2IsXRMvl+Jlt6CXVjIw92NxYIS9js2T+2TRZW1tmrgp2BaJg5f1b8tfjGfLn9EOyQM2w1KxmUU+hw4Xn3OlzUf/nn10v0RMV2GnswG7GkJGXqHk6SSYTZG11maiJ/0hRL+CbBAJBvLKfSaeS5P27JRJ/84pGQoxqtIJRUC6X+RVWMF0lSSZBdXNSunnn5nHvhS/ihRKdUdHXlSsSKdMLKjRlK7LsBcwkwDDHOAdIJBIZpHuUBIIhMhQ9zOsPJjqd3GhajqhqgmwlNmnD3MQ6aMxwYI0aD7wONzMPKZYNMzwkPP90TMInPr48qe40A17HTGjEDDNh+UAgTILUGNh9PoUEAyHi9yt4rhfgeuGsUtM0srWVIHluABih064IoUJVuLpMbHtmDHTSjPo6vAcKjaDwAOYgkvw+P/F4vLhDvtNmcQ2qwHcrQMtrpES74EwmjYJDGQyAvI7XoBh0gwPPm4pW85hgGS7BA6/DzcxDimUQh5nxyet/LzMzvqJm0Pfshhn7IXs8VXMAP40qwEPrvV4v/hyP7MW6evgn5Ogl2rpoVYkvgoKoul4i+QKbzeSp2AATG6AX8x9RLzRm+AYHnq+7huUxwTJcggdeh5uZhxTLoAeY4aVmxNxnBr/PXcHzlhfRSraZbLuYicDLPG8IgxXGKVMt8zW4wYHn665heUywDJfggdfhZuYhxTLoYZqBU1stmYZE4CCynldleDIhMBDmVQKn0NJpthySazAy9u9kBE1R05Mr4TBfm8JK3pEJHMJbs1AocBw0Q/ErquiEnILpriU+1C4Uim7KEXgMhEJDoptyC5lMgs+m6LRK4DwiMlqkXZ27j+5sAFcCu/62r12I6cEeSBLRKxVzABdiOYuiKKKbchNohpasf2QEe0IRKl0Ffn+CZlSK5TaNGcJBOxiqoRnBCHuQTeAc3kiksUd12oOImv2wNMNatkZm1GJJxY4Cef6lG83IptnDzwZC0hq6EdD8PdAMxQerthSLN3Zl5+LKm9qHHS3c/BBKOEJuj49voRn0C2DdB6z9rCJKugeakUu5baGwF5u+ferGDAOUwDU6WN/IQbYJzQgo/o4vFDZOf0UFoHD96yLDCrdJ0zNjmI0b3dcMt9FU4+iRIJP4jbIBPJmtue9GLBVzrGbYVy0uvs3IcGOT65EwsEAqsj/lQzOMAaRxuhUZvSOwPUXY58tnaqa2vdumDhZszEjVr005R382C3+IPXhuc8ywQISXTUzh+JjBFwpbQUywbCPJzJD2RUbH6IOQ04vmbKr2iULbH110U9toXpAdkSF6G+dAM8oF8/+HiAbuBEz1HhgzOok7mp6ndswIij+wdAVohjv+9LgNrdTOj3AoOOrGZvy9d890U60o5pDaNmBmFMvq9lt26iP0jnTto27V1he2fryzeWH6Ucr2YXZTQkfHQTMK254oFDhDjwzg/QGa4fe76VGd/kMq1QzgAneAZmhJMWZ0i90XYgn5H3V0xLOrGfM8AAAAAElFTkSuQmCC';

    this.barCustomStyle = {
      type: 'pictorialBar',
      symbol: 'image://' + paperDataURI2,
      symbolRepeat: true,
      symbolSize: ['50%', '20%'],
      symbolOffset: [0, 0],
      symbolMargin: '-30%',
      animationDelay: function (dataIndex, params) {
        return params.index * 30;
      },
      label: {
        show: true,
        fontSize: 12,
        position: 'top',
        rotate: 0,
        formatter: '{c}'
      },
    };
  }


  private barChartDataGenerator(data: any) : SingleBarChartData{

    return {
      xAxisData: data.axisData,
      axisLabel: {
        interval: 0,
        fontSize: 12,
        rotate: 0
      },
      series: data.seriesData.map( (s, i) => {
        return {
          name: '故障率',
          data: s
        };
      })
    };

  }

}
