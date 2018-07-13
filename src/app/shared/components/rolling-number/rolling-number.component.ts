import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Observer} from "rxjs/internal/types";

const MS_PER_FRAME: number = 16; //以60HZ刷新率为基准
const LOOP_CYCLE: number = 1000; //以3秒

//用于迭代数据，更好的暂时效果
class RollingAnimation {
  private lastFetchedNumber: number = 0;

  private _idNumberRoll: any;
  private _isIncrease: boolean = true;

  ondata: Function;
  oncomplete: Function;
  onerror: Function;

  constructor(value: number) {
    this.updateValue(value);
  }

  private isAnimating(){
   return this._idNumberRoll !== undefined;
  }

  updateValue(v: number){

    //停止上次动画
    if(this.isAnimating()){
      this.destroy();
    }

    let i = this.lastFetchedNumber;

    let deltaPerFrame = this.deltaPerFrame(v);

    this._isIncrease = deltaPerFrame > 0;


    this._idNumberRoll = setInterval(() => this.emit( i += deltaPerFrame), MS_PER_FRAME);

    this.lastFetchedNumber = v;
  }

  private deltaPerFrame(newValue: number){
    return (newValue - this.lastFetchedNumber) / (LOOP_CYCLE / MS_PER_FRAME);
  }

  //数据迭代
  private emit(n: number) {

    if(this._isIncrease && n >= this.lastFetchedNumber){
      this.ondata(this.lastFetchedNumber);

      if (this.oncomplete) {

        this.oncomplete();
      }
      this.destroy();
    }else if(!this._isIncrease && n <= this.lastFetchedNumber){
      this.ondata(this.lastFetchedNumber);

      if (this.oncomplete) {

        this.oncomplete();
      }
      this.destroy();
    }else{
      if (this.ondata) {
        this.ondata(n.toFixed(0));
      }
    }
  }

  destroy() {
    clearInterval(this._idNumberRoll);
    this._idNumberRoll = undefined;

  }
}


@Component({
  selector: 'app-rolling-number',
  templateUrl: './rolling-number.component.html',
  styleUrls: ['./rolling-number.component.css']
})
export class RollingNumberComponent implements OnInit, OnChanges {

  aniValue: number = 0;

  @Input() value: number = 0;
  @Input() title: string = '标题';
  rollingAnimation: RollingAnimation;

  private rollingAnimationObservable(observer: Observer<number>) {

    this.rollingAnimation = new RollingAnimation(this.value);
    this.rollingAnimation.ondata = (e) => observer.next(e);
    this.rollingAnimation.onerror = (err) => observer.error(err);
    this.rollingAnimation.oncomplete = () => observer.complete();


    return () => {
      this.rollingAnimation.destroy();
    };
  }


  constructor() {

    let that = this;
    let unsub = this.rollingAnimationObservable({
      next(x) {
        that.aniValue = x;
      },
      error(err) {
        console.error(err);
      },
      complete() {
        //console.log('done')
      }
    });
  }

  ngOnInit() {


  }

  ngOnChanges(){

    this.rollingAnimation.updateValue(this.value);
  }

}
