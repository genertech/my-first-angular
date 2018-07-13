import { Component, OnInit } from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";

@Component({
  selector: 'app-fault-analysis',
  templateUrl: './fault-analysis.component.html',
  styleUrls: ['./fault-analysis.component.css']
})
export class FaultAnalysisComponent implements OnInit {

  frames = FRAMES;
  averageNoFaultTimeLabel = '平均无故障时间';
  averageNoFaultKilometerLabel = '平均无故障公里数';
  averageNoFaultByTime: any;
  averageNoFaultByKilometer: any;

  constructor() { }

  ngOnInit() {
    this.averageNoFaultByTime = [
      {value:1548,name: 'CRH5A'},
      {value:535, name: 'CRH5G'},
      {value:510, name: 'CRH3A'},
      {value:634, name: 'CRH380B'},
      {value:735, name: 'CR400BF'}
    ];

    this.averageNoFaultByKilometer = [
      {value:9000,name: 'CRH5A'},
      {value:1008.5, name: 'CRH5G'},
      {value:5000, name: 'CRH3A'},
      {value:2000.8, name: 'CRH380B'},
      {value:20000, name: 'CR400BF'}
    ];
  }

}
