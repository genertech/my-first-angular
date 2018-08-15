import { Component, OnInit } from '@angular/core';
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {AverageNoFaultDataService} from "../../service/impl/fault-analysis/average-no-fault-data.service";

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

  constructor(private avgNoFaultDataService: AverageNoFaultDataService) { }

  ngOnInit() {

    this.avgNoFaultDataService.getDataByKilometerObservable().subscribe(next => {

      console.log(next);
      if(next.status.toLowerCase() === "success"){

        let data = next.data;

        this.averageNoFaultByKilometer = data.pieData;

      }

    }, error1 => {
      console.error(error1);
    });

    this.avgNoFaultDataService.getDataByTimeObservable().subscribe(next => {

      console.log(next);
      if(next.status.toLowerCase() === "success"){

        let data = next.data;

        this.averageNoFaultByTime = data.pieData;

      }

    }, error1 => {
      console.error(error1);
    });



  }



}
