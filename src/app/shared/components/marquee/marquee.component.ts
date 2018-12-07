import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ng-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css'],
  animations: [
    trigger('marqueeAnimation', [
      state('inactive', style({
        transform: 'translateX(0)'
      })),
      state('active',   style({
        transform: 'translateX(-50%)'
      })),
      transition('inactive => active', animate('10s linear')),
      transition('active => inactive', animate('0s ease-out'))
    ])
  ]
})
export class MarqueeComponent implements OnInit, OnChanges {

  @Input() displayData: string | Array<String>;
  @Input() marqueeTextStyle: any;

  aniStatus: string = 'inactive';
  marqueeText: string = 'marquee marquee marquee marquee marquee';

  constructor(private ef: ElementRef) { }

  ngOnInit() {

  }

  ngOnChanges() {

    if(typeof this.displayData === 'string'){
      this.marqueeText = this.displayData;
    }else{

    }
    setTimeout( ()=> {this.aniStatus = 'active';}, 4000);

  }

  animationCallBack($event) {
    if($event.fromState === 'inactive' || $event.fromState === 'void'){

      console.log('finished');
      this.aniStatus='inactive';
      setTimeout( ()=> {this.aniStatus = 'active';}, 4000);

    }
  }
}
