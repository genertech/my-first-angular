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

  constructor() { }

  ngOnInit() {
  }

}
