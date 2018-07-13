import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, state, style, transition, trigger} from '@angular/animations';
import {Subject} from "rxjs/internal/Subject";
import {RollingTableColumnSetting} from "./rolling-table-column-setting";

const TIME_INTERVAL = 5000;

@Component({
  selector: 'app-rolling-table',
  templateUrl: './rolling-table.component.html',
  styleUrls: ['./rolling-table.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0) scale(1)'})),
      transition('void => *', [
        animate(500, style({transform: 'translateX(-100%) scale(1)'}))
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateX(-100%) scale(1)'}))
      ])
    ])
  ]
})
export class RollingTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('title') titleRow: ElementRef;
  @ViewChildren('dataRow', {read: ElementRef}) dataRows: QueryList<ElementRef>;

  items: Array<any> = [];

  @Input() rollingThreshold: number = 5;    //触发滚动阈值
  @Input() timing = '500ms ease-in';
  @Input() rawData: Array<any>;
  @Input() columnSetting: RollingTableColumnSetting;

  private _selectedPoint: Subject<any> = new Subject<any>();

  constructor(private builder: AnimationBuilder) {
  }

  ngOnInit() {
    //console.log("init");

    this._selectedPoint.asObservable().subscribe(data => {

      this.items.push(data);
    }, error => {

    });
  }


  ngAfterViewInit(): void {
    //console.log("after view init");

  }

  /**
   * 数据源发生改变
   */
  ngOnChanges() {
    //console.log("changes");

    this.dataProcess(this.rawData);

  }

  dataProcess(data: Array<any>) {

    //this.items;
    if(this.items && this.items.length > 0){
      this.items.length = 0;
    }

    if(data && data.length > 0){

      if(data.length >= this.rollingThreshold){

        this.firstSwapTimer();
      }else{
        clearTimeout(this.timerTimeout);
        clearInterval(this.timerInterval);
      }

      data.map((ele, idx) => {

        let result = Object.assign({}, ele, {idx: ++idx});
        setTimeout( ()=> this._selectedPoint.next(result), 50);
        return result;
      });

    }

  }

  timerInterval: any;
  timerTimeout : any;

  firstSwapTimer() {

    clearTimeout(this.timerTimeout);
    clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {

      if(this.items){
        //移除头数据到末尾
        let _item = this.items.shift();

        this.timerTimeout = setTimeout(() => {
          //移除头数据到末尾
          this.items.push(_item);
        }, 50);

      }
    }, TIME_INTERVAL);

  }

}
