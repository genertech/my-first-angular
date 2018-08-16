import { Component, OnInit } from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {SingleBarChartData} from "../../shared/components/single-bar-chart-fragment/single-bar-chart-data";
import {SimpleRollingTableConfig} from "../../shared/components/simple-rolling-table-fragment/simple-rolling-table-config";
import {FaultPredictionDataService} from "../../service/impl/fault-prediction/fault-prediction-data.service";
import {PredictionByEquipTypeDataService} from "../../service/impl/fault-prediction/prediction-by-equip-type-data.service";
import {PredictionByComponentDataService} from "../../service/impl/fault-prediction/prediction-by-component-data.service";
import {PredictionBySystemDataService} from "../../service/impl/fault-prediction/prediction-by-system-data.service";

const LEVEL_TRANSLATION = {
  'A':'后期',
  'B':'中期',
  'C':'早期'
};

@Component({
  selector: 'app-fault-prediction',
  templateUrl: './fault-prediction.component.html',
  styleUrls: ['./fault-prediction.component.css']
})
export class FaultPredictionComponent implements OnInit {

  frames = FRAMES;
  predictionByEquipType: SingleBarChartData;
  predictionByComponent: SingleBarChartData;
  predictionBySystem: SingleBarChartData;

  startTime: Date;
  endTime: Date;

  rollingTableConfig: SimpleRollingTableConfig;
  faultPredictionData: Array<any>;

  constructor(private faultPredictionDS: FaultPredictionDataService,
              private equipTypePredictionDS: PredictionByEquipTypeDataService,
              private componentPredictionDS: PredictionByComponentDataService,
              private systemPredictionDS: PredictionBySystemDataService) { }

  ngOnInit() {

    this.startTime = new Date();
    this.endTime = new Date();

    this.faultPredictionDS.currentSubject().subscribe(next =>{

      this.faultPredictionData = next;

    }, error1 => {
      console.log("error", error1);
    });

    this.equipTypePredictionDS.currentSubject().subscribe(next =>{

      this.predictionByEquipType = this.barChartDataGenerator(next, 'equipTypeName');

    }, error1 => {
      console.log("error", error1);
    });

    this.componentPredictionDS.currentSubject().subscribe(next =>{

      this.predictionByComponent = this.barChartDataGenerator(next, 'sysName');

    }, error1 => {
      console.log("error", error1);
    });

    this.systemPredictionDS.currentSubject().subscribe(next =>{

      this.predictionBySystem = this.barChartDataGenerator(next, 'sysName');

    }, error1 => {
      console.log("error", error1);
    });

    this.faultPredictionDS.startTimer();
    this.componentPredictionDS.startTimer();
    this.systemPredictionDS.startTimer();
    this.equipTypePredictionDS.startTimer();


    this.rollingTableConfig = {
      labelText: '故障预测',
      switchLoop: 60 * 1000,
      sectionLabelText: "车型",
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: true,
        idxOccupancyRate: 5,
        columns: [
          {title: '车组号', key: 'equipName', style: {width: '20%'}},
          {title: '车厢', key: 'areaName', style: {width: '15%'}},
          {title: '部件', key: 'partName', style: {width: '20%'}},
          {title: '预测等级', key: 'lvl', style: {width: '15%'}, keyTranslate: LEVEL_TRANSLATION},
          {title: '预测详情', key: 'description', style: {width: '30%'}}
        ]
      }
    };

  }

  private barChartDataGenerator(data: any, xAxisLb:string) : SingleBarChartData{

    if(Array.isArray(data)){
      let xAxisData = [], label = [], series = [];
      data.forEach( (ele) => {

        let labelIndex, xAxisIndex;

        labelIndex = label.indexOf(ele.lvl);
        xAxisIndex = xAxisData.indexOf(ele[xAxisLb]);

        if(labelIndex === -1){

          label.push(ele.lvl);

          series.push({
            name: LEVEL_TRANSLATION[ele.lvl],
            data: [],
            lvl: ele.lvl
          });

          labelIndex = series.length-1;
        }

        series = series.sort((a, b) =>{

          if(a.lvl > b.lvl){
            return -1;
          }else{
            return 1;
          }

        });

        if(xAxisIndex === -1){

          xAxisData.push(ele[xAxisLb]);
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
