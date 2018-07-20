import {Component, OnInit} from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {SimpleRollingTableConfig} from "../../shared/components/simple-rolling-table-fragment/simple-rolling-table-config";
import {RepairSuggestionDataService} from "../../service/impl/maintenance-decision/repair-suggestion-data.service";
import {AdvanceRepairSuggestionDataService} from "../../service/impl/maintenance-decision/advance-repair-suggestion-data.service";
import {MtPurchaseSuggestionDataService} from "../../service/impl/maintenance-decision/mt-purchase-suggestion-data.service";
import {IntervalOptimizationDataService} from "../../service/impl/maintenance-decision/interval-optimization-data.service";

@Component({
  selector: 'app-maintenance-decision',
  templateUrl: './maintenance-decision.component.html',
  styleUrls: ['./maintenance-decision.component.css']
})
export class MaintenanceDecisionComponent implements OnInit {

  frames = FRAMES;


  startTime: Date;
  endTime: Date;

  repairSuggestionRTConfig: SimpleRollingTableConfig;
  adRepairSuggestionRTConfig: SimpleRollingTableConfig;

  mtPurchaseSuggestionRTConfig: SimpleRollingTableConfig;
  intervalOptimizationRTConfig: SimpleRollingTableConfig;

  repairSuggestionData: Array<any>;
  adRepairSuggestionData: Array<any>;
  mtPurchaseSuggestionData: Array<any>;
  intervalOptimizationData: Array<any>;

  constructor(private repairSuggestionDS: RepairSuggestionDataService,
              private adRepairSuggestionDS: AdvanceRepairSuggestionDataService,
              private mtPurchaseSuggestionDS: MtPurchaseSuggestionDataService,
              private intervalOptimizationDS: IntervalOptimizationDataService) { }

  ngOnInit() {
    this.startTime = new Date();
    this.endTime = new Date();

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

    this.mtPurchaseSuggestionDS.currentSubject().subscribe(next=>{

      this.mtPurchaseSuggestionData = next;

    }, error1 => {
      console.log("error", error1);
    });

    this.intervalOptimizationDS.currentSubject().subscribe(next=>{

      this.intervalOptimizationData = next;

    }, error1 => {
      console.log("error", error1);
    });

    this.repairSuggestionDS.startTimer();
    this.adRepairSuggestionDS.startTimer();
    this.mtPurchaseSuggestionDS.startTimer();
    this.intervalOptimizationDS.startTimer();

  }

  private rollingTableInit(){

    this.repairSuggestionRTConfig = {
      labelText: '运用修建议',
      labelStyle: {width: '420px'},
      switchLoop: 60 * 1000,
      sectionLabelText: "日期",
      sectionKey: "date",
      columnSetting: {
        needIdx: false,
        columns: [
          {title: '车型', key: 'equipTypeName', style: {width: '15%'}},
          {title: '车组号', key: 'equipName', style: {width: '15%'}},
          {title: '处理建议', key: 'adviceContent', style: {width: '40%'}},
          {title: '建议修程', key: 'repairClassName', style: {width: '15%'}},
          {title: '状态', key: 'status', style: {width: '15%'}, keyTranslate:{'10':'未处理','20':'已推送','30':'已完成'}}
        ]
      }
    };

    this.adRepairSuggestionRTConfig = {
      labelText: '高级修建议',
      labelStyle: {width: '420px'},
      switchLoop: 60 * 1000,
      sectionLabelText: "日期",
      sectionKey: "date",
      columnSetting: {
        needIdx: false,
        columns: [
          {title: '车型', key: 'equipTypeName', style: {width: '15%'}},
          {title: '车组号', key: 'equipName', style: {width: '15%'}},
          {title: '处理建议', key: 'adviceContent', style: {width: '40%'}},
          {title: '建议修程', key: 'repairClassName', style: {width: '15%'}},
          {title: '状态', key: 'status', style: {width: '15%'}, keyTranslate:{'10':'未处理','20':'已推送','30':'已完成'}}
        ]
      }
    };

    this.mtPurchaseSuggestionRTConfig = {
      labelText: '配件采购建议',
      labelStyle: {width: '420px'},
      switchLoop: 60 * 1000,
      sectionLabelText: "日期",
      sectionKey: "date",
      columnSetting: {
        needIdx: false,
        columns: [
          {title: '物料号', key: 'mtrCode', style: {width: '25%'}},
          {title: '物料名称', key: 'mtrName', style: {width: '25%'}},
          {title: '建议采购日期', key: 'date', style: {width: '30%'}},
          {title: '建议采购数量', key: 'amount', style: {width: '20%'}},
        ]
      }
    };

    this.intervalOptimizationRTConfig = {
      labelText: '运用修间隔优化建议',
      labelStyle: {width: '420px'},
      switchLoop: 60 * 1000,
      sectionLabelText: "修程",
      sectionKey: "repairClassName",
      columnSetting: {
        needIdx: false,
        columns: [
          {title: '车型', key: 'equipTypeName', style: {width: '20%'}},
          {title: '维修项点', key: 'repairItemName', style: {width: '35%'}},
          {title: '修程', key: 'repairClassName', style: {width: '15%'}},
          {title: '原间隔', key: 'intervalOrigin', style: {width: '15%'}},
          {title: '建议', key: 'intervalAdvice', style: {width: '15%'}}
        ]
      }
    };


  }

}
