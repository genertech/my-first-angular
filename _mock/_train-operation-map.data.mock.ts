// tslint:disable
import {format} from 'date-fns';
import {MockRequest} from '@delon/mock';

const MIN_LONGITUDE: number = 90.230;
const MAX_LONGITUDE: number = 125.40;
const MIN_LATITUDE: number = 3.52;
const MAX_LATITUDE: number = 53.33;
const TRAINS_LOOK_UP = [
  '5501', '5008', '5654', '5018', '5372',
  '5502', '5623', '5301', '3782', '3601',
  '3742', '3421', '5573', '3232', '5312',
  '3123', '5782', '3521', '5721', '3001',
  '3523', '5182', '3541', '5100', '3005'
];

function dataGenerator() {
  let result = [], counter = 5 + Math.floor(Math.random() * 15);

  let trainClips = randomPickSomeData(TRAINS_LOOK_UP, counter);

  while (counter--) {

    result.push({
      train: (trainClips[counter]),
      coordinate: [
        (MIN_LONGITUDE + (MAX_LONGITUDE - MIN_LONGITUDE) * Math.random()),
        (MIN_LATITUDE + (MAX_LATITUDE - MIN_LATITUDE) * Math.random())
      ],
      warn: Math.floor(Math.random() * 25),
      forecast: Math.floor(Math.random() * 15)
    });
  }

  return result;
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

export const TRAIN_OPERATION_MAP_DATA = {
  'GET /blueScreen/trainOperation': (req: MockRequest) => dataGenerator()
}
