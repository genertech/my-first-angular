import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyTranslate'
})
export class KeyTranslatePipe implements PipeTransform {

  transform(value: any, keyMap?: any): any {

    if(keyMap){

      return keyMap[value];
    }

    return value;
  }

}
