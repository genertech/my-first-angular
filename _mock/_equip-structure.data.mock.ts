import {MockRequest} from "@delon/mock";

const LONGITUDE_RANGE = [15, 574];
const LATITUDE_RANGE = [256 - 90, 256 - 172];

const RANGE_MAX: number = 1000;

const TRAINS_LOOK_UP = {
  '5501': {groups: 8,},
  '5008': {groups: 8,},
  '5654': {groups: 8,},
  '5018': {groups: 8,},
  '5372': {groups: 8,},
  '5502': {groups: 8,},
  '5623': {groups: 8,},
  '5301': {groups: 8,},
  '3782': {groups: 16,},
  '3601': {groups: 16,},
  '3742': {groups: 16,},
  '3421': {groups: 16,},
  '5573': {groups: 8,},
  '3232': {groups: 16,},
  '5312': {groups: 16,},
  '3123': {groups: 16,},
  '5782': {groups: 8,},
  '3521': {groups: 16,},
  '5721': {groups: 8,},
  '3001': {groups: 8,},
  '3523': {groups: 16,},
  '5182': {groups: 8,},
  '3541': {groups: 16,},
  '5100': {groups: 8,},
  '3005': {groups: 8,},
  'DEMO': {groups: 8,},
};

const PARAMS = [
  {id: 'params01', name: '速度', unit: 'KM/H', threshold: 350},
  {id: 'params02', name: '受电弓', status: ['升起', '降下']},
  {id: 'params03', name: '主断', status: ['断开', '闭合']},
  {id: 'params04', name: '轴温', unit: '℃', threshold: 350},
  {id: 'params05', name: '驱动侧轴承温度', unit: '℃', threshold: 350},
  {id: 'params06', name: '大齿轮温度', unit: '℃', threshold: 350},
  {id: 'params07', name: '定子温度', unit: '℃', threshold: 350},
  {id: 'params08', name: '主风管压力', unit: 'Pa', threshold: 350},
  {id: 'params09', name: '制动管压力', unit: 'Pa', threshold: 350},
  {id: 'params10', name: '环境温度', unit: 'Pa', threshold: 350},
  {id: 'params11', name: '列车运行里程', unit: 'Km'},
];

function dataGenerator(req: MockRequest) {
  let sn = req.queryString.sn;
  let equipType = req.queryString.equipType;

  console.log(req);
  let areas = [];

  let train_base_info = TRAINS_LOOK_UP[sn];
  for (let i = 0; i < train_base_info.groups; i++) {

    let id = `${sn}_coach_${(i + 1)}`;

    areas.push({
      id: id,
      hasProblem: randomTrueFalse(),
      name: `${i + 1}车`,
      image: `assets/data/CRH3C/crh3_${i + 1}.png`
    })
  }

  return {
    status: 'success',
    data: {
      result: areas
    }
  };
}

const T_F = [true, false];

function randomTrueFalse() {

  return T_F [Math.floor(Math.random() * T_F.length)];
}

function areaParamsDataGenerator(req: MockRequest) {

  let areaId = req.queryString.areaId;

  //热点区域
  let hotSpots = [];

  let amount = 2 + Math.floor(Math.random() * 9);

  let pickedParams = randomPickSomeData(PARAMS, amount);

  let hotSpotNum = 1 + Math.floor(Math.random() * (amount - 1));

  //生成参数信息
  let generatedParams = pickedParams.map((param) => {
    let value: string | number;
    let hasProblem: boolean = false;

    if (param.hasOwnProperty('unit')) {
      value = Math.random() * RANGE_MAX;
      if (value > param.threshold) hasProblem = true;

      value = value.toFixed(3) + param.unit;

    } else {
      value = param.status[Math.floor(Math.random() * param.status.length)];
    }

    return {
      id: param.id,
      name: param.name,
      value: value,
      hasProblem: hasProblem
    }
  });

  //确保每个热点区域都至少有一个参数
  for (let i = 0; i < hotSpotNum; i++) {

    let generatedParam = generatedParams.splice(Math.floor(Math.random() * generatedParams.length), 1)[0];

    hotSpots.push({
      id: `hotspot_${i}`,
      posX: LONGITUDE_RANGE[0] + Math.floor((LONGITUDE_RANGE[1] - LONGITUDE_RANGE[0]) * Math.random()),
      posY:  LATITUDE_RANGE[0] + Math.floor((LATITUDE_RANGE[1] - LATITUDE_RANGE[0]) * Math.random()),
      params: [
        generatedParam
      ]
    })
  }

  //随机分配剩余的参数
  generatedParams.forEach((param) => {
    hotSpots[Math.floor(Math.random() * hotSpotNum)].params.push(param);
  });

  return {
    status: 'success',
    data: {
      result: {
        id: areaId,
        name: areaId,
        hotSpots: hotSpots,
        image: `assets/data/CRH3C/crh3_${areaId.split("_")[2]}.png`
      }
    }
  };

}

function randomPickSomeData(source: Array<any>, amount: number): Array<any> {

  let _source = [...source];
  let result = [];

  for (let i = 0; i < amount; i++) {

    let ran = Math.floor(Math.random() * _source.length);

    result.push(_source.splice(ran, 1)[0]);

  }

  return result;
}

export const EQUIP_STRUCTURE_DATA = {

  '/blueScreen/equipStructure': (req: MockRequest) => dataGenerator(req),
  '/blueScreen/equipStructure/areaParams': (req: MockRequest) => areaParamsDataGenerator(req)
};
