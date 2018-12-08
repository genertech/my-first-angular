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
import {TrainStatusDataService} from "../../service/impl/train-status-data.service";

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

  trainStatusData: SingleBarChartData;
  trainStatusDataCS: SingleBarChartStyle;

  MKFCBarCustomStyle: any;
  TSBarCustomStyle: any;

  constructor(private repairSuggestionDS: RepairSuggestionDataService,
              private adRepairSuggestionDS: AdvanceRepairSuggestionDataService,
              private healthEvaluationDS: HealthEvaluationInfoDataService,
              private warnForecastInfoDS: WarnForecastInfoDataService,
              private millionKilometerFaultDS: MillionKilometerFaultRateDataService,
              private trainStatusDS: TrainStatusDataService) { }

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
        this.millionKilometerFaultCount =  this.barChartDataGenerator(next.data, '故障率');
      }

    }, error1 => {
      console.error(error1);
    });

    this.trainStatusDS.currentSubject().subscribe(
      next => {

        this.trainStatusData = this.barChartDataGenerator(next, null);

      },
      error => {
        console.error(`获取数据异常`, error);
      }
    );

    this.trainStatusDS.startTimer();

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
          {title: '车组', key: 'equipName', style: {width: '10%', 'font-size': '16px', 'align-items': 'unset'}},
          {title: '车辆', key: 'areaName', style: {width: '10%', 'font-size': '16px', 'align-items': 'unset'}},
          {title: '部件', key: 'partName', style: {width: '20%', 'font-size': '16px', 'align-items': 'unset'}},
          {
            title: '类型',
            key: 'type',
            keyTranslate: {warn: '预警', prognos: '预测'},
            style: {width: '10%', 'font-size': '16px','align-items': 'unset'}
          },
          {
            title: '详情', key: 'warnName',
            style: {
              'align-items': 'unset',
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

    this.trainStatusDataCS = {
      labelStyle: {background: 'unset'},
      labelTextStyle: {'font-size': '20px', color: '#12dce6'}
    };

    let paperDataURI1 = 'data:image/png;base64,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';
    let paperDataURI2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAAA3CAYAAAAYJPR0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAdiSURBVHhe7VvNbxtFFJ9de+M4dlP3Q02qSG0qARWnBiFx4ZITFbfcKg6FCE4ICfVStf8AUisuBQnBMRd6LhKXwqHptVCSCqFSUVEHKCFpkziJv9Yfa96bmXXG613vzNprbxL/6vF8vPdmZ95v3syOq2gkArh248bReCyWqSXSGSsxkmkYY5lKKjONsloikakbyUxjJJFpQN0aSWawXUQddDCPmWaONgD0Skkom7lYldXju7msXmV6iXwuGzfzuc+uXl3B+qDRFzLQ2WTs6HRpYnoWnVsDR9fBqZV0ZroKqZEYbXMwAp2vgm71jd2trFHIZQ0gLAG5TVxq45/lfhDWUzJspxfOnJ/DlV0+fnoGnW2NcmdLeCtsAhAdbVyEdtPY6rPFEU7WaG5t+daH733HRT1BYDLE1V6cnJ7FVV45OTmDI1d1kKo+outn+HQg27+R38omN9aWx9ayi2Mv/13+/JOP7nORMpTIQALMqdfm8mdenysAAeL20rVzJKD8DEWDXo1pfOX3OykgJ/3s0cLN69e3ebMvfMlAAkrnLszvnj0/Vz52eqYbAhDKDuW5JxwKkRiTgBRsbeN/P7nz1aV3v+BNnvAk49qXX19Yf+virUgQINFB18/wgao+gtoIhpmnSwsn/1ha8NrK2siwSShNnpvlTcEHogDVLQWh/Ayey0JaX1CUscFomXp498rNTz9+xJsommTgdrT15ju3dl59Yx7rqgNHSNk4lFSfE9q4BLjqd+gk6JiOQaSc+uWHK/a5QsnAaFh9e27BPAFvQ4pQHThCdfBBJ6uKQRz4MbOce+XHhVmMEg2J+Ovi/KLlcfFyA+1wAAP3g5S+QymUZ7jAz+7899/MaJcfri5VvCJC6CHIIPph46rv00kU54L3Fe1SFoLTwyqKg7YxqDuEDKTsBCW7qDstsWonWYRmIyih88UkC1RVUKfoxqbFTmx0JLFqQ8cvN4EfemojCsTUWpSGowspBLaBL7o43JILOoiIrpkmL/rD5zmuaNqIxs7kQAeRJ0K1ERRt5zfnIwFbtZO6lSsSPfb4KWnUarypHTIdNcEV2waMyQcKqk0EsUG42oidOVNrURqyNlalRko//wmRUSiS6tJj0qjuEWJ34tqRKBQSdT6vqqBvNmDQtkDE5AIfsStUbWqFMtm89xupb0NkYIO1WyQ7iw9JaeU/1onYozMJ8GjuCNEmqJ0nRCVILQQogJsrIYhN4dkaWb/7iFRzBXr7pmTYKD5ZIRv3l0l5fYu3uKNfg7Vt2uxEgZiEIq9KI4hdEBtEZStP1u79SjYfPCWWsCNpl7990NguW8SsQ8hAr/WGBgkEowmSOjtJ0tMTyg9DBLFBULsAxv0aY6B5gVEdnJ7PrpHi801ivtghOrRhNGCKQ0yk4jFvMixQs6CMD09OnSTJUxkyNuH/iwnqS4MrK9kICGIXyrM8hHU4mGvFMtnJrgMR6zQKcCvS4J+TjHQ8LkcGlhu8nJo6QUaPpykxMSMGLR0G6ikIySkdEMSuxUayAyQgv7pJSi+2SeH5BhBQpw5He/RgOxkakKExMt4HMnIKZDSwzPORI0lKzMh4kiQhN5IjIPEG2gVBX+wEZRW78naBmHBHMCFHAjDHDhgBrCd5Mm5zMuAcUSWDdW+DlZGU5PEUiQMxOuyD6YlxQUceQWwQHe06CP2eh3t+tVghpZc7NEenY8KVz5wOiXbCcncy2BtTM6dtjIwjBnx/AGRs9ZAM9iiQ02xPnjyGBBk0ejBHogxe993ufNBip9CJqFoHp6KTLbgAmzslWq4WTdjzWY7tzAC+7HfllhzbaYV+6PSDkIGRUe4hGTSnIxDldDwAKmhrN0aBICBFj+s0jwFZuqHTHIHkYR1ht9lo9iV0atVgxQLQyYhaqUJzrNPVDMA2dDSaUX1qzztxOhzbbblTRnNspxX6obPkclZmuRcZ44ZBtPnbP0Fk1D3JsGg/4NSQybAhlpuARrd21pMIrtWiLFRoca+ucWc1v0W50+Gi3CmjObbTCv3QsXE5K7PcjQygASIDFiOVIOz8wMF9YlGcrn5gOZBCdGavwVDYJtwCFlpDhIe2JUCJgNddHSmhiAYJ0VmrfYZ7ZBwA7ENGccg0MA7bamzONyITt4k45Ad4dMAJYXQMSQkfHX2MkUFqFfr3bZF+h+rpShnMsuv8VLz68TODVfcX3Me732axB3pm8PIQAwYGBTvAe7CghlfFYE5EK0x6vZLT9Xqt+ffS7Ri6uF/QYI+i21Trb6vhYEhrO8RYwiOcH+DBQmw/Iloz3RuNZsE2pcFeFda6HUaDPGhkMHYOR2REeZZ4XvBX28O7hgc1c3Fh0DIe4JpV7fA2dXAgHxXdxk8AezCJwVtt8wY+xGBBL328zBHh7SrgokGzfbHeGiZc+mrV3H4YbJAxdjev/nkF36TwXaqr/88Yvrr2DowOvIf3DSrU929lRgE6XvoIvfRFFYeHEPrbVD/jQh4hkRABbp1DsOvIA+Mi8CC7PzX8e4iAB0MGzlAjhPwPtEFP0MQVsQwAAAAASUVORK5CYII=';

    this.MKFCBarCustomStyle = {
      type: 'pictorialBar',
      symbol: 'image://' + paperDataURI1,
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

    this.TSBarCustomStyle = {
      type: 'pictorialBar',
      symbol: 'image://' + paperDataURI2,
      symbolRepeat: true,
      symbolSize: ['80%', '20%'],
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


  private barChartDataGenerator(data: any, name: string) : SingleBarChartData{

    return {
      xAxisData: data.axisData,
      series: data.seriesData.map( (s, i) => {
        return {
          name: name,
          data: s
        };
      }),
      chartOptions: {
        yAxis: {
          show: false
        },
        xAxis: {
          data: data.axisData,
          axisLabel: {
            interval: 0,
            fontSize: 12,
            rotate: 0
          }
        }
      }
    };

  }

}
