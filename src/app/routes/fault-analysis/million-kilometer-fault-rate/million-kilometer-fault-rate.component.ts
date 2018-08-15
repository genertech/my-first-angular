import {Component, OnChanges, OnInit} from '@angular/core';
import {NgxEchartsService} from "ngx-echarts";
import {MillionKilometerFaultRateDataService} from "../../../service/impl/fault-analysis/million-kilometer-fault-rate-data.service";

@Component({
  selector: 'app-million-kilometer-fault-rate',
  templateUrl: './million-kilometer-fault-rate.component.html',
  styleUrls: ['./million-kilometer-fault-rate.component.css']
})
export class MillionKilometerFaultRateComponent implements OnInit, OnChanges {

  options: any;
  updateOptions: any;
  labelText: string = '百万公里故障数';

  mapLoaded = false;
  private echarts: any;

  constructor(private nes: NgxEchartsService, private dataService: MillionKilometerFaultRateDataService) {
    this.echarts = this.nes.echarts;
  }


  ngOnInit() {

    //console.log("init");

    this.dataService.getDataObservable().subscribe(next => {

      //console.log(next);
      if(next.status.toLowerCase() === "success"){

        this.dataProcess(next.data);
      }

    }, error1 => {
      console.error(error1);
    });


  }

  ngOnChanges(){

  }


  private dataProcess(data: any){
    this.mapLoaded = true;

    this.options = {
      grid: {id: 'grid', width: '100%', height: '100%', left: 0, bottom: 0},
      angleAxis: {
        max: (p) => ( p.max * 14/9),
        axisLine: {show: false},
        axisTick: {show: false},
        axisLabel: {show: false},
        splitLine: {show: false},
      },
      radiusAxis: {
        type: 'category',
        data:  data.axisData, //['CRH380B', 'CR400BF', 'CRH3A', 'CRH5G', 'CRH5A'],
        z: 10,
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {show: false},
        axisLabel:{
          color: 'white',
          interval:0,
          fontSize: 17
        }
      },
      polar: {
        radius: '85%'
      },
      series: [{
        type: 'bar',
        data: data.seriesData[0],//[0.8, 0.7, 0.8, 0.65, 0.9],
        coordinateSystem: 'polar',
        name: '百万公里故障数',
        barCategoryGap :'50%',
        label:{
          show:true,
          color: 'auto',
          formatter: '{c}'
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {offset: 0, color: 'rgb(61, 181, 222)'},
              {offset: 0.5, color: 'rgb(0, 206, 222)'},
              {offset: 1, color: 'rgb(129, 245, 149)'}
            ]}
        }
      },{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'scatter',
        data: data.seriesData[0], //[0.8, 0.7, 0.8, 0.65, 0.9],
        itemStyle:{
          color: 'rgba(1,2,3, 0)',
        },
        label:{
          show:true,
          fontSize: 16,
          position:'left',
          color: 'white',
          formatter: '{c}'
        }
      }]
    };
  }
}
