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

const SYSTEM_LOOK_UP = ["牵引", "制动", "门", "空调", "转向架", "轮对", "齿轮箱", "轴承", "电机", "空调"];

const INDEX_LOOK_UP = ['D', 'E'];

const T_F = [true, false];

function randomTrueFalse() {

  return T_F [Math.floor(Math.random() * T_F.length)];
}

function equipHealthStateDiagramDataGenerator(req: MockRequest) {
  let sn = req.queryString.equipSn;
  let equipType = req.queryString.equipType;

  console.log(req);
  let areas = [];

  let train_base_info = TRAINS_LOOK_UP[sn];
  for (let i = 0; i < train_base_info.groups; i++) {

    let id = `${sn}_coach_${(i + 1)}`;

    areas.push({
      id: id,
      equipType: equipType,
      areaCode: `${i + 1}`.padStart(2, '0'),
      name: `${i + 1}车`,
      hasProblem: randomTrueFalse(),
      image: `assets/data/CRH3C/crh3_${i + 1}.png`,
      hotSpots:hotSpotsData(id)
    })
  }

  return {
    status: 'success',
    data: {
      result: areas
    }
  };
}


function hotSpotsData(areaId) {


  //热点区域
  let hotSpots = [];

  let amount = 5 + Math.floor(Math.random() * 6);


  let hotSpotNum = 5 + Math.floor(Math.random() * (amount - 5));


  //确保每个热点区域都至少有一个参数
  for (let i = 0; i < hotSpotNum; i++) {


    hotSpots.push({
      id: `hotspot_${i}`,
      posX: LONGITUDE_RANGE[0] + Math.floor((LONGITUDE_RANGE[1] - LONGITUDE_RANGE[0]) * Math.random()),
      posY: LATITUDE_RANGE[0] + Math.floor((LATITUDE_RANGE[1] - LATITUDE_RANGE[0]) * Math.random()),
      name: SYSTEM_LOOK_UP[Math.floor(Math.random() * SYSTEM_LOOK_UP.length)],
      healthLevel: INDEX_LOOK_UP[Math.floor(Math.random() * INDEX_LOOK_UP.length)]
    })
  }

  return hotSpots;
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

export const EQUIP_HEALTH_STATE_DIAGRAM_DATA = {

  '/blueScreen/equipHealthStateDiagram': (req: MockRequest) => equipHealthStateDiagramDataGenerator(req),
};
