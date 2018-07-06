import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-average-no-fault',
  templateUrl: './average-no-fault.component.html',
  styleUrls: ['./average-no-fault.component.css']
})
export class AverageNoFaultComponent implements OnInit {

  options: any;

  @Input() labelText: string = 'title';

  mapLoaded = false;

  constructor() { }

  ngOnInit() {

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

  private currentIndex = -1;
  private pieSwitchInterval:any;


  chartsInit(myCharts) {
    this.pieSwitchInterval = setInterval( ()=>  {
      var dataLen = this.options.series[0].data.length;

      this.currentIndex = (this.currentIndex + 1) % dataLen;

      myCharts.dispatchAction({
        type: 'pieSelect',
        seriesIndex: 0,
        dataIndex: this.currentIndex
      });


    }, 3000);
  }
}
