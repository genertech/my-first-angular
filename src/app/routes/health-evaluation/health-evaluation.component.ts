import {Component, OnInit} from '@angular/core';
import {SimpleRollingTableConfig} from "../../shared/components/simple-rolling-table-fragment/simple-rolling-table-config";
import {FRAMES} from "../../shared/directives/outer-frame.directive";

@Component({
  selector: 'app-health-evaluation',
  templateUrl: './health-evaluation.component.html',
  styleUrls: ['./health-evaluation.component.css']
})
export class HealthEvaluationComponent implements OnInit {

  frames = FRAMES;

  systemEvaluationRTConfig: SimpleRollingTableConfig;
  partEvaluationRTConfig: SimpleRollingTableConfig;

  faultPredictionData: Array<any>;

  private currEquipType = 'N/A';
  private currEquipSn = 'N/A';

  constructor() {
  }

  ngOnInit() {

    this.systemEvaluationRTConfig = {
      labelText: '系统评估',
      labelStyle: {width: '300px', background: 'unset'},
      switchLoop: 60 * 1000,
      sectionLabelText: "车型",
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: true,
        idxOccupancyRate: 10,
        columns: [
          {title: '车组', key: 'area', style: {width: '30%'}},
          {title: '系统', key: 'code', style: {width: '30%'}},
          {title: '最低等级', key: 'lx', style: {width: '30%'}}
        ]
      }
    };

    this.partEvaluationRTConfig = {
      labelText: '部件评估',
      labelStyle: {width: '300px', background: 'unset'},
      switchLoop: 60 * 1000,
      sectionLabelText: "车型",
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: true,
        idxOccupancyRate: 10,
        columns: [
          {title: '车组', key: 'area', style: {width: '30%'}},
          {title: '部件', key: 'code', style: {width: '30%'}},
          {title: '最低等级', key: 'lx', style: {width: '30%'}}
        ]
      }
    };

    this.currEquipType = 'CRH5A';
    this.currEquipSn = '5001';

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
