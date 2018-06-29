import {MockRequest} from "@delon/mock";
const LOOK_UP_TABLE = {
  EQUIPTYPE : ["CR400BF", "CRH380B", "CRH5G", "CRH5A", "CRH3A"],
  SYSTEM : ["牵引", "制动", "门", "空调", "转向架"],
  COMPONENT : ["轮对", "齿轮箱", "轴承", "电机", "空调"]
};

function dataGenerator(params: any): any {

  let type = params.type as string;

  if(type){

    console.log(type);

    return LOOK_UP_TABLE[type.toUpperCase()].map((ele) => {
      return {
        [type]: ele,
        warnCount: Math.floor(Math.random()*100),
        forecastCount: Math.floor(Math.random()*100)
      }
    });
  }

  return null;
}

export const MONI_BASE_INFO_DATA = {
  'GET /blueScreen/moniBase/:type': (req: MockRequest) => dataGenerator(req.params)
}
