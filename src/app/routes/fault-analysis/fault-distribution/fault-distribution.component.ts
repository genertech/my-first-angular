import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FaultDistributionDataService} from "../../../service/impl/fault-analysis/fault-distribution-data.service";

const INTERVAL = 10 * 1000;

@Component({
  selector: 'app-fault-distribution',
  templateUrl: './fault-distribution.component.html',
  styleUrls: ['./fault-distribution.component.css']
})
export class FaultDistributionComponent implements OnInit, OnChanges {

  options: any;
  updateOptions: any;

  @Input() labelText: string = '故障分布';
  @Input() equipTypeLabelText: string = '车型';
  @Input() equipType: string = 'N/A';

  mapLoaded = false;

  chartsInited = false;

  constructor(private dataService: FaultDistributionDataService) { }

  ngOnInit() {

    this.dataService.getDataObservable().subscribe(next =>{

      if(next.status.toLowerCase() === "success"){

        this.dataProcess(next.data);
      }

    }, error1 => {
        console.error(error1);
    });


  }

  private equipSwitchInterval:any;


  chartsInit(myCharts) {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  private dataSwitchInterval = null;

  private dataProcess(data: any) {

    this.mapLoaded = true;

    if(!data) return;

    let resultData = data.legendData.map( (ele, i) =>{

      return {
        equipType: ele,
        axisData: data.axisData,
        data: data.seriesData[i]
      }

    });

    clearInterval(this.dataSwitchInterval);

    this.dataDisplay(resultData[0]);

    this.dataSwitchInterval = setInterval(() => {

      resultData.push(resultData.splice(0,1)[0]);

      this.dataDisplay(resultData[0]);

    }, INTERVAL);


  }

  private dataDisplay(dp :any){

    this.equipType = dp.equipType;

    if(this.chartsInited){
      this.updateOptions = {
        series: {
          data: dp.data
        }
      }

    }else{
      this.options = {
        color: ['#6cf5f2'],
        textStyle: {
          color: 'white'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {show:false},
          name: '公里数',
          nameLocation: 'middle',
          nameGap: 30,
          data: dp.axisData //['0', '10万', '20万', '30万', '40万']
        },
        yAxis: {
          type: 'value',
          axisTick: {show:false},
          splitLine: {show: false},
          name: '故障数',

        },
        series: [
          {
            name:'模拟数据',
            type:'line',
            smooth:false,
            symbol: 'circle',
            symbolSize: 12,
            label:{
              show:true,
              formatter: '{c}',
              fontSize: 18
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 1,
                y: 1,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0f1e2e',
                    opacity: 2
                  }, {
                    offset: 1,
                    color: '#3d9399'
                  }],
                globalCoor: true,

              }
            },
            data: dp.data //['150', '200', '25', '150', '90']
          }
        ]
      };

      this.chartsInited = true;
    }
  }
}
