import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FaultPrecisePositioningDataService} from "../../../service/impl/fault-precise-positioning-data.service";
import {SimpleRollingTableConfig} from "./simple-rolling-table-config";
import {RollingTableColumnSetting} from "../rolling-table/rolling-table-column-setting";

@Component({
  selector: 'app-simple-rolling-table-fragment',
  templateUrl: './simple-rolling-table-fragment.component.html',
  styleUrls: ['./simple-rolling-table-fragment.component.css'],
  animations: [
    trigger('equipTypeStatus', [
      state('inactive', style({
        transform: 'rotateX(0)'
      })),
      state('active',   style({
        transform: 'rotateX(90deg)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class SimpleRollingTableFragmentComponent implements OnInit, OnChanges {


  _section: string = 'N/A';
  section: string = 'N/A';

  columnInfo: RollingTableColumnSetting;

  rollingTableData: Array<any>;
  aniStatus: string = 'inactive';

  @Input() config: SimpleRollingTableConfig= {
    labelText: 'label',
    switchLoop: 60 * 1000,
    sectionLabelText: "title",
    sectionKey: "section",
    columnSetting: {
      needIdx: true,
      idxOccupancyRate: 10,
      columns: []
    }
  };

  @Input() data: any;

  @Output() onChildClick = new EventEmitter<any>();

  private switchInterval: any;

  constructor() {}

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.columnInfo = this.config.columnSetting;

    clearInterval(this.switchInterval);
    this.dataSwitch(this.data);

  }

  private dataSwitch(data: Array<any>) {
    //console.log(anies);

    if(data && data.length > 0){

      let anies = this.dataProcess(data);

      anies.push(this.data2View(anies.shift()));

      this.switchInterval = setInterval(()=>{

        anies.push(this.data2View(anies.shift()));

      }, this.config.switchLoop);
    }
  }

  private dataProcess(data: Array<any>): Array<any> {
    let _sections = [];
    let anies = [];

    data.forEach((item) => {

      let sectionValue = item[this.config.sectionKey];

      let idx = _sections.indexOf(sectionValue);

      if (idx > -1) {
        anies[idx].data.push(item);

      } else {
        _sections.push(sectionValue);
        anies.push({
          [this.config.sectionKey]: sectionValue,
          data: [item]
        });
      }
    });

    return anies;
  }

  private data2View(data: any){

    this.aniStatus = 'active';

    this._section= data[this.config.sectionKey];
    this.rollingTableData = data.data;

    return data;
  }

  /**
   *
   * @param $event
   * {
   *  disabled: false
   *  element: DOM
   *  fromState: "active"
   *  phaseName: "done"
   *  toState: "inactive"
   *  totalTime: 500
   *  triggerName: "firstDisappear"
   * }
   */
  switchCallback($event){

    if($event.fromState === 'inactive' || $event.fromState === 'void'){
      this.section = this._section;
      this.aniStatus='inactive'
    }

  }


  tableElementClick($event: any) {
    this.onChildClick.emit($event);
  }
}
