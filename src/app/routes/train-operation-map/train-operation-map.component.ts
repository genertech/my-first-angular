import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxEchartsService} from "ngx-echarts";
import {zip} from "rxjs";


@Component({
  selector: 'app-train-operation-map',
  templateUrl: './train-operation-map.component.html',
  styleUrls: ['./train-operation-map.component.css']
})
export class TrainOperationMapComponent implements OnInit {

  warn: number;

  // show loading spinner:
  mapLoaded = false;
  // empty option before geoJSON loaded:
  options = {};

  constructor(private http: HttpClient, private es: NgxEchartsService) { }

  ngOnInit() {

    this.warn = 233;

    zip(
      this.http.get(`assets/data/CHINA.json`),
      this.http.get('assets/data/CHINA_PROVINCE_COLOR.json'),
    ).subscribe(([geoJson, provinceColor]) => {

        // hide loading:
        this.mapLoaded = true;

        console.log(this.es);
        // register map:
        this.es.registerMap('CHINA', geoJson);

        // update options:
        this.options = {
          series: [
            {
              id:"CHINA_MAP",
              type: 'map',
              roam: true,
              scaleLimit:{
                min:1,
                max:5
              },
              zoom:1.25,
              label: {
                normal: {//通常情况下normal和emphasis是对应的,分别表示  “普通状态” 和 “选中状态” 下的样式.
                  show: false//是否显示省会名字.
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  areaColor : "#329fec",
                  borderColor: '#eee'
                },
                emphasis: {
                  areaColor : "#20deec",
                },
              },
              mapType: 'CHINA', // map type should be registered
              data: provinceColor

            }
          ]
        };
      });
  }

}
