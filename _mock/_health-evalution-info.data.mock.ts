import {MockRequest} from "@delon/mock";
import * as Mock from 'mockjs';

const AREA_LOOK_UP = ['5001', '5002', '5003', '5004', '5005', '5006', '5007', '5008'];
const ATTRIBUTE_LOOK_UP = ['E', 'D'];
const XT_INFO_LOOK_UP = ['给排水及卫生系统', '网络系统', '主供电系统', '制动系统', '转向架', '牵引变流器', '空气过滤器', '紧急制动阀'];
const CX_INFO_LOOK_UP = ['CR400BF', 'CRH3C', 'CRH5A', 'CRH380BL', 'CRH380B'];


function dataGenerator() {



    let _amount = 25 + Math.floor(Math.random() * 5);

    let data = [];
    while(_amount-- > 0){
      data.push(Mock.mock({
        "equipTypeName|1": [...CX_INFO_LOOK_UP],
        "equipName|1": [...AREA_LOOK_UP],
        "areaName": (Math.ceil(1+ Math.random()*15)).toString().padStart(2, "0"),
        "healthLevel|1": [...ATTRIBUTE_LOOK_UP],
        'partName|1': [...XT_INFO_LOOK_UP],
      }));
    }


  return data;

}


export const HEALTH_EVALUATION_INFO_DATA = {

  'GET /blueScreen/healthEvaluationInfo':(req: MockRequest) => dataGenerator()
};
