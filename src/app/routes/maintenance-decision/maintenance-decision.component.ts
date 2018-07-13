import {Component, OnInit} from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {SimpleRollingTableConfig} from "../../shared/components/simple-rolling-table-fragment/simple-rolling-table-config";

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

  faultPredictionData: Array<any>;

  constructor() { }

  ngOnInit() {

    this.startTime = new Date();
    this.endTime = new Date();

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
          {title: '车组号', key: 'area', style: {width: '15%'}},
          {title: '处理建议', key: 'code', style: {width: '40%'}},
          {title: '建议修程', key: 'lx', style: {width: '15%'}},
          {title: '状态', key: 'attribute', style: {width: '15%'}}
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
          {title: '车组号', key: 'area', style: {width: '15%'}},
          {title: '处理建议', key: 'code', style: {width: '40%'}},
          {title: '建议修程', key: 'lx', style: {width: '15%'}},
          {title: '状态', key: 'attribute', style: {width: '15%'}}
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
          {title: '物料号', key: 'area', style: {width: '25%'}},
          {title: '物料名称', key: 'code', style: {width: '25%'}},
          {title: '建议采购日期', key: 'attribute', style: {width: '30%'}},
          {title: '建议采购数量', key: 'lx', style: {width: '20%'}},
        ]
      }
    };

    this.intervalOptimizationRTConfig = {
      labelText: '运用修间隔优化建议',
      labelStyle: {width: '420px'},
      switchLoop: 60 * 1000,
      sectionLabelText: "修程",
      sectionKey: "lx",
      columnSetting: {
        needIdx: false,
        columns: [
          {title: '车型', key: 'equipTypeName', style: {width: '20%'}},
          {title: '维修项点', key: 'code', style: {width: '35%'}},
          {title: '修程', key: 'lx', style: {width: '15%'}},
          {title: '原间隔', key: 'area', style: {width: '15%'}},
          {title: '建议', key: 'attribute', style: {width: '15%'}}
        ]
      }
    };


    this.faultPredictionData = [
      {
        "equipTypeName": "CRH3C",
        "area": "550702",
        "code": "6740 转向架1侧的牵引电机过热(火灾检测)",
        "lx": "M1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "565708",
        "code": "65B0 未启动列车自动保护",
        "lx": "M1",
        "date": "2018-07-09",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "531402",
        "code": "6148 卫生间2火警",
        "lx": "M2",
        "date": "2018-07-13 ",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "560406",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "M1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "561708",
        "code": "65B0 未启动列车自动保护良",
        "lx": "L2",
        "date": "2018-07-11",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560408",
        "code": "65B0 未启动列车自动保护",
        "lx": "L2",
        "date": "2018-07-13",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "550702",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "L2",
        "date": "2018-07-13",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "550301",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "L2",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "565708",
        "code": "6148 卫生间2火警",
        "lx": "M2",
        "date": "2018-07-10",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "550301",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "M1",
        "date": "2018-07-13",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "550702",
        "code": "65B0 未启动列车自动保护良",
        "lx": "M2",
        "date": "2018-07-13",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "565708",
        "code": "9200 给水卫生系统",
        "lx": "L1",
        "date": "2018-07-11",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "501509",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "L1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "561708",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "M2",
        "date": "2018-07-13",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "550301",
        "code": "6148 卫生间2火警",
        "lx": "L1",
        "date": "2018-07-13",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "531808",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "L2",
        "date": "2018-07-13",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "501509",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "M1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "550702",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "M2",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "557201",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "L1",
        "date": "2018-07-13",
        "lx2": "原因排序",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "557201",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "M2",
        "date": "2018-07-10",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "550301",
        "code": "65B0 未启动列车自动保护良",
        "lx": "M1",
        "date": "2018-07-10",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560408",
        "code": "9200 给水卫生系统",
        "lx": "L2",
        "date": "2018-07-11",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560406",
        "code": "6740 转向架1侧的牵引电机过热(火灾检测)",
        "lx": "L1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "531808",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "L1",
        "date": "2018-07-11",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "550301",
        "code": "65B0 未启动列车自动保护良",
        "lx": "L2",
        "date": "2018-07-11",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560406",
        "code": "65B0 未启动列车自动保护",
        "lx": "L1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "550301",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "L1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "531402",
        "code": "65B0 未启动列车自动保护良",
        "lx": "M1",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "550301",
        "code": "65B0 未启动列车自动保护良",
        "lx": "L2",
        "date": "2018-07-12",
        "attribute": "XXXXXXXXX"
      }
    ];
  }

}
