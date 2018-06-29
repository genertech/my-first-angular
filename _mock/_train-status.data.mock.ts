import {MockRequest} from "@delon/mock";


function dataGenerator(): any {

  let builderJson = {
    "all": 0 as any,
    "status": {
      "车组总数": 0 as any,
      "上线": Math.floor(Math.random() * 100),
      "未上线": Math.floor(Math.random() * 100),
      "热备": Math.floor(Math.random() * 100),
      "高级修": Math.floor(Math.random() * 100),
      "扣修": Math.floor(Math.random() * 100),
      "库停": Math.floor(Math.random() * 100),
    }
  };

  builderJson.status["车组总数"] = builderJson.all = Object.values(builderJson.status).reduce((p, c) => {
    return p + c;
  });

  return builderJson;
}

export const TRAIN_STATUS_DATA = {
  'GET /blueScreen/trainStatus': (req: MockRequest) => dataGenerator()
}
