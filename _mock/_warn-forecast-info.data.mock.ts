import {MockRequest} from "@delon/mock";
import * as Mock from 'mockjs';

const TIME_INTERVAL = 10 * 60 * 1000;

const AREA_LOOK_UP = ['5503', '5507', '5572', '5314', '5657', '5318', '5604', '5015'];
const PV_LOOK_UP = ['转向架', '牵引电机', '制动'];
const LX_LOOK_UP = ['warn', 'prognos'];
const INFO_LOOK_UP_TEMPLATE = [
  '(n1,n2, n3, n4) => `轴承温度 超温${n1}℃≥${n2}℃;超差${n3}℃≥${n4}℃`',
  '(n1,n2) => `定子温度 超温${n1}℃>${n2}℃`',
  '(n1,n2, n3, n4, n5) => `转向架${n5}一轴右侧温度整体水平发生突变，平均水平由${n1}变成${n2}`',
  '(n1,n2) => `轴承温度 超温${n1}℃≥${n2}℃`'
];
const CX_INFO_LOOK_UP = ['CR400BF', 'CRH3C', 'CRH5A', 'CRH380BL', 'CRH380B'];

function dataGenerator() {


    let _amount = 5 + Math.floor(Math.random()*25);
    let data = [];
    while(_amount-- > 0){
      data.push(Mock.mock({
        "equipTypeName|1": [...CX_INFO_LOOK_UP],
        "equipName|1": [...AREA_LOOK_UP],
        "areaName": (Math.ceil(1+ Math.random()*15)).toString().padStart(2, "0"),
        "partName": (PV_LOOK_UP[Math.floor(Math.random() * PV_LOOK_UP.length)]),
        "type": (LX_LOOK_UP[Math.floor(Math.random() * LX_LOOK_UP.length)]),
        "warnName": generateTemplateData(INFO_LOOK_UP_TEMPLATE[Math.floor(Math.random() * INFO_LOOK_UP_TEMPLATE.length)]),
      }));
    }

    return data;

}

function generateTemplateData(template: String): string{

  let func = eval.call(null, template);
  return func(Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*16));
}

export const WARN_FORECAST_INFO_DATA = {

  'GET /blueScreen/warnForecastInfo':(req: MockRequest) => dataGenerator()
};
