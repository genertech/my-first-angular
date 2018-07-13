import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

// 常量定义
const AXIS = {
  X: 'X' as 'X',
  Y: 'Y' as 'Y'
};

type AXIS = (typeof AXIS)[keyof typeof AXIS];
export { AXIS };

@Component({
  selector: 'app-rotation-data-switch',
  templateUrl: './rotation-data-switch.component.html',
  styleUrls: ['./rotation-data-switch.component.css'],
  animations: [
    trigger('rotationStatus', [
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      state('active',   style({
        transform: 'rotateY(90deg)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class RotationDataSwitchComponent implements OnInit, OnChanges {

  @Input() value: string;
  _value: string = '';
  @Input() rotationAxis: AXIS;
  @Input() loopTime: number;

  aniStatus = 'inactive';

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(event){

    this.aniStatus = 'active';

  }

  switchCallback($event){

    if($event.fromState === 'inactive' || $event.fromState === 'void'){
      this._value = this.value;
      this.aniStatus='inactive'
    }

  }

}
