import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AXIS} from "../../../shared/components/rotation-data-switch/rotation-data-switch.component";

@Component({
  selector: 'app-average-no-fault',
  templateUrl: './average-no-fault.component.html',
  styleUrls: ['./average-no-fault.component.css'],

})
export class AverageNoFaultComponent implements OnInit, OnChanges {

  options: any;
  mergeOptions: any;

  @Input() labelText: string = 'title';
  @Input() data: any;

  mapLoaded = false;

  pieNumber: number = 0;

  axis: any = AXIS;

  currEquip: string = '';

  constructor() {
    this.mapLoaded = true;

    this.options = {
      color: ['#f98446', '#c0c610', '#25d04f', '#2a89e5', '#ef2ee7'],
      legend: {
        bottom: '10%',
        left: 'center',
        data: ['CRH5A', 'CRH5G','CRH3A','CRH380B','CR400BF'],
        textStyle: {
          fontSize: 17,
          color: 'white',
        }
      },
      series : [
        {
          id: 'average_pie',
          type: 'pie',
          center: ['50%', '40%'],
          radius: ['50%', '65%'],
          selectedMode: 'single',
          data:[
            {value:1548,name: 'CRH5A'},
            {value:535, name: 'CRH5G'},
            {value:510, name: 'CRH3A'},
            {value:634, name: 'CRH380B'},
            {value:735, name: 'CR400BF'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label:{
            show:false,
          },
        }
      ],
      animationDuration: 1000
    };

  }

  ngOnChanges(){
    this.dataProcess();
  }

  private dataProcess() {

    this.mergeOptions = {
      legend:{
        data: this.data.map((item) => { return item.name })
      },
      series: [{
        id: 'average_pie',
        data: this.data
      }]
    };

  }

  ngOnInit() {



  }

  private currentIndex = -1;
  private pieSwitchInterval:any;


  chartsInit(myCharts) {

    let option = this.data;

    let dataLen = option.length;

    this.currentIndex = (this.currentIndex + 1) % dataLen;

    this.pieNumber = option[this.currentIndex].value;
    this.currEquip = option[this.currentIndex].name;

    myCharts.dispatchAction({
      type: 'pieSelect',
      seriesIndex: 0,
      dataIndex: this.currentIndex
    });

    this.pieSwitchInterval = setInterval( ()=>  {

      this.currentIndex = (this.currentIndex + 1) % dataLen;

      this.pieNumber = option[this.currentIndex].value;
      this.currEquip = option[this.currentIndex].name;

      myCharts.dispatchAction({
        type: 'pieSelect',
        seriesIndex: 0,
        dataIndex: this.currentIndex
      });

    }, 3000);
  }
}
