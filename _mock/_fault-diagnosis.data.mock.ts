import {MockRequest} from "@delon/mock";

const TIME_INTERVAL = 10 * 60 * 1000;

const EQUIP_TYPE_LOOKUP = ['CR400BF', 'CRH3C', 'CRH5A', 'CRH380BL', 'CRH380B'];
const AREA_LOOKUP = ['550301', '550702', '557201', '531402', '565708', '531808', '560408', '501509', '560406', '561708'];
const CODE_LOOKUP = [
  '65B0 MCB 44-F11 TCC1 ETCS断开',
  '9200 给水卫生系统',
  '6740 转向架1侧的牵引电机过热(火灾检测)',
  '65B0 未启动列车自动保护',
  '6148 卫生间2火警',
  '50AC 从ATP的不一致的制动请求',
  '0401 01/高压牵引系统 调整不良',
  '6740 车内风挡处电缆7间隙不匀',
  '65B0 未启动列车自动保护良',
  '684F 关闭分布图：转换到应急模式后电池断开'
];
const LX_LOOK_UP = ['专家库匹配', '自动定位'];
const LX2_LOOK_UP = ['原因排序', '交互式'];

function dataGenerator() {

  let _total_amount = 10 + Math.floor(Math.random() * 25);

  let data = [];
  while (_total_amount-- > 0) {
    data.push({
      equipTypeName: (EQUIP_TYPE_LOOKUP[Math.floor(Math.random() * EQUIP_TYPE_LOOKUP.length)]),
      area: (AREA_LOOKUP[Math.floor(Math.random() * AREA_LOOKUP.length)]),
      code: (CODE_LOOKUP[Math.floor(Math.random() * CODE_LOOKUP.length)]),
      lx: (LX_LOOK_UP[Math.floor(Math.random() * LX_LOOK_UP.length)]),
      lx2: (LX2_LOOK_UP[Math.floor(Math.random() * LX2_LOOK_UP.length)]),
      attribute: 'XXXXXXXXX',
    });
  }

  return data;

}

function generateTemplateData(template: String): string {

  let func = eval.call(null, template);
  return func(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 16));
}

export const FAULT_PERCISE_POSITIONING_DATA = {

  'GET /blueScreen/faultPrecisePositioning': (req: MockRequest) => dataGenerator(),
  'GET /blueScreen/faultReasonInvestigation': (req: MockRequest) => dataGenerator()
};
