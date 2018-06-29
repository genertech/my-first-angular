import {MockRequest} from "@delon/mock";

const TIME_INTERVAL = 10 * 60 * 1000;

const AREA_LOOK_UP = ['550301', '550702', '557201', '531402', '565708', '531808', '560408', '501509'];
const PV_LOOK_UP = ['转向架', '牵引电机', '制动'];
const LX_LOOK_UP = ['预警', '预测'];
const INFO_LOOK_UP_TEMPLATE = [
  '(n1,n2, n3, n4) => `轴承温度 超温${n1}℃≥${n2}℃;超差${n3}℃≥${n4}℃`',
  '(n1,n2) => `定子温度 超温${n1}℃>${n2}℃`',
  '(n1,n2, n3, n4, n5) => `转向架${n5}一轴右侧温度整体水平发生突变，平均水平由${n1}变成${n2}`',
  '(n1,n2) => `轴承温度 超温${n1}℃≥${n2}℃`'
];

function dataGenerator() {

  return ['CR400BF', 'CRH3C', 'CRH5A', 'CRH380BL', 'CRH380B'].map((ele)=>{

    let _amount = 5 + Math.floor(Math.random()*25);
    let data = [];
    while(_amount-- > 0){
      data.push({
        area: (AREA_LOOK_UP[Math.floor(Math.random() * AREA_LOOK_UP.length)]),
        pv: (PV_LOOK_UP[Math.floor(Math.random() * PV_LOOK_UP.length)]),
        lx: (LX_LOOK_UP[Math.floor(Math.random() * LX_LOOK_UP.length)]),
        attribute: generateTemplateData(INFO_LOOK_UP_TEMPLATE[Math.floor(Math.random() * INFO_LOOK_UP_TEMPLATE.length)]),
      });
    }

    return {
      equipType: ele,
      data: data
    }

  });

}

function generateTemplateData(template: String): string{

  let func = eval.call(null, template);
  return func(Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*16));
}

export const WARN_FORECAST_INFO_DATA = {

  'GET /blueScreen/warnForecastInfo':(req: MockRequest) => dataGenerator()
};
