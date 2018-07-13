import { Component, OnInit } from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";

@Component({
  selector: 'app-fault-diagnosis',
  templateUrl: './fault-diagnosis.component.html',
  styleUrls: ['./fault-diagnosis.component.css']
})
export class FaultDiagnosisComponent implements OnInit {

  frames = FRAMES;

  constructor() { }

  ngOnInit() {

  }

}
