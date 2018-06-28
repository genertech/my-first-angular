import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Observer} from "rxjs/internal/types";

const FETCH_CYCLE: number = 30 * 1000;
const ANIME_CYCLE: number = 50; //以60HZ刷新率为基准
const DEBOUNCE: number = 5;

//用于迭代数据，更好的暂时效果
class RollingAnimation {
  private lastFetchedNumber: number = 0;

  private _idNumberRoll: any;

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

    let i = this.lastFetchedNumber, timeoutFlag = false;

    //间隔太大，大于动画帧执行时间
    if(Math.abs(v - i) > DEBOUNCE){
      timeoutFlag = true;

    }

    if(i < v){
      timeoutFlag ? i = v - DEBOUNCE : null;
      this._idNumberRoll = setInterval(() => this.emit(i++), ANIME_CYCLE);
    }else{
      timeoutFlag ? i = v + DEBOUNCE : null;
      this._idNumberRoll = setInterval(() => this.emit(i--), ANIME_CYCLE);
    }

    this.lastFetchedNumber = v;
  }

  //数据迭代
  private emit(n) {
    if (this.ondata) {
      this.ondata(n);
    }

    if (n === this.lastFetchedNumber) {
      if (this.oncomplete) {
        this.oncomplete();
      }
      this.destroy();
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
