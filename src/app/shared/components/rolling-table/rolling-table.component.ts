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

  //item镜像
  _item: any;
  items: Array<any> = [];

  @Input() maxGroup: number = 10;   //最大数据组数
  @Input() maxSize: number = 50;    //最大数据项目
  @Input() timing = '500ms ease-in';
  @Input() rawData: Array<any>;
  @Input() columnInfo: Array<any>;

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

    if(data){
      this.firstSwapTimer();

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
        this._item = this.items.shift();

        this.timerTimeout = setTimeout(() => {
          //移除头数据到末尾
          this.items.push(this._item);
        }, TIME_INTERVAL);

      }
    }, TIME_INTERVAL);

  }

}
