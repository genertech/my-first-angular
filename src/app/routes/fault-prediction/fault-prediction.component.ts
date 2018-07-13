import { Component, OnInit } from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {SingleBarChartData} from "../../shared/components/single-bar-chart-fragment/single-bar-chart-data";
import {SimpleRollingTableConfig} from "../../shared/components/simple-rolling-table-fragment/simple-rolling-table-config";

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

  constructor() { }

  ngOnInit() {

    this.startTime = new Date();
    this.endTime = new Date();

    this.predictionByEquipType = {
      xAxisData: ['CR400BF', 'CRH380B', 'CRH5G', 'CRH5A', 'CRH3A'],
      series:[
        {name: '早期',data:[100, 200, 300, 213, 412]},
        {name: '中期',data:[200, 150, 230, 213, 112]},
        {name: '后期', data:[410, 200, 60, 213, 92]}
      ]
    };

    this.predictionByComponent = {
      xAxisData: ['牵引变流器', '轮对', '齿轮箱', '轴承', '电机', '空调', '转向架'],
      series:[
        {name: '早期',data:[100, 311,200, 300, 77, 213, 412]},
        {name: '中期',data:[97, 200, 150, 230, 200, 213, 112]},
        {name: '后期', data:[410, 200, 60, 213, 343, 72, 81]}
      ]
    };

    this.predictionBySystem = {
      xAxisData: ['主供电', '牵引', '制动', '门', '空调', '辅助供电', '转向架'],
      series:[
        {name: '早期',data:[100, 200, 300, 400, 88, 213, 412]},
        {name: '中期',data:[200, 150, 67, 230, 213, 97, 112]},
        {name: '后期', data:[410, 373, 200, 90, 313, 213, 42]}
      ]
    };

    this.rollingTableConfig = {
      labelText: '故障预测',
      switchLoop: 60 * 1000,
      sectionLabelText: "车型",
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: true,
        idxOccupancyRate: 5,
        columns: [
          {title: '车组号', key: 'area', style: {width: '20%'}},
          {title: '部件', key: 'code', style: {width: '30%'}},
          {title: '预测等级', key: 'lx', style: {width: '15%'}},
          {title: '预测详情', key: 'attribute', style: {width: '30%'}}
        ]
      }
    }

    this.faultPredictionData = [
      {
        "equipTypeName": "CRH3C",
        "area": "550702",
        "code": "6740 转向架1侧的牵引电机过热(火灾检测)",
        "lx": "自动定位",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "565708",
        "code": "65B0 未启动列车自动保护",
        "lx": "专家库匹配",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "531402",
        "code": "6148 卫生间2火警",
        "lx": "自动定位",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "560406",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "自动定位",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "561708",
        "code": "65B0 未启动列车自动保护良",
        "lx": "专家库匹配",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560408",
        "code": "65B0 未启动列车自动保护",
        "lx": "专家库匹配",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "550702",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "自动定位",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "550301",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "自动定位",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "565708",
        "code": "6148 卫生间2火警",
        "lx": "专家库匹配",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "550301",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "自动定位",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "550702",
        "code": "65B0 未启动列车自动保护良",
        "lx": "专家库匹配",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "565708",
        "code": "9200 给水卫生系统",
        "lx": "自动定位",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "501509",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "专家库匹配",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "561708",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "自动定位",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "550301",
        "code": "6148 卫生间2火警",
        "lx": "自动定位",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380BL",
        "area": "531808",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "专家库匹配",
        "lx2": "原因排序",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "501509",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "专家库匹配",
        "lx2": "原因排序",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "550702",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "专家库匹配",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "557201",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "专家库匹配",
        "lx2": "原因排序",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "557201",
        "code": "65B0 MCB 44-F11 TCC1 ETCS断开",
        "lx": "自动定位",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "550301",
        "code": "65B0 未启动列车自动保护良",
        "lx": "专家库匹配",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560408",
        "code": "9200 给水卫生系统",
        "lx": "自动定位",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560406",
        "code": "6740 转向架1侧的牵引电机过热(火灾检测)",
        "lx": "专家库匹配",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "531808",
        "code": "684F 关闭分布图：转换到应急模式后电池断开",
        "lx": "自动定位",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CR400BF",
        "area": "550301",
        "code": "65B0 未启动列车自动保护良",
        "lx": "自动定位",
        "lx2": "原因排序",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "560406",
        "code": "65B0 未启动列车自动保护",
        "lx": "自动定位",
        "lx2": "原因排序",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH3C",
        "area": "550301",
        "code": "0401 01/高压牵引系统 调整不良",
        "lx": "自动定位",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH380B",
        "area": "531402",
        "code": "65B0 未启动列车自动保护良",
        "lx": "专家库匹配",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      },
      {
        "equipTypeName": "CRH5A",
        "area": "550301",
        "code": "65B0 未启动列车自动保护良",
        "lx": "自动定位",
        "lx2": "交互式",
        "attribute": "XXXXXXXXX"
      }
    ]
  }

}
