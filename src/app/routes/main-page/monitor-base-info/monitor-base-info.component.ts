import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgxEchartsService} from "ngx-echarts";
import {HttpClient} from "@angular/common/http";

const BAR_COLOR_PALETTE = {
  SP1:["rgb(39, 122, 206)", "rgb(101, 245, 243)", "rgb(39, 122, 206)"],
  SP2:["rgb(39, 122, 206)", "rgb(153, 189, 46)", "rgb(206, 39, 199)"],
  SP3:["rgb(39, 122, 206)", "rgb(245, 162, 101)", "rgb(86, 39, 206)"]
};

type BAR_COLOR_PALETTE = (typeof BAR_COLOR_PALETTE)[keyof typeof BAR_COLOR_PALETTE];
export { BAR_COLOR_PALETTE };

const PATH_SYMBOLS = {
  collapseHouse: 'path://M443.14 134.14L443.14 420.68L368.62 420.68L333.01 274.72L368.62 134.14L443.14 134.14Z M143.73 269.45L177.91 269.45L177.91 279.64L143.73 279.64L143.73 269.45Z M180.81 269.45L214.99 269.45L214.99 279.64L180.81 279.64L180.81 269.45Z M218.16 269.45L252.34 269.45L252.34 279.64L218.16 279.64L218.16 269.45Z M255.28 269.45L289.46 269.45L289.46 279.64L255.28 279.64L255.28 269.45Z M292.99 269.45L327.17 269.45L327.17 279.64L292.99 279.64L292.99 269.45Z M105.48 269.45L139.66 269.45L139.66 279.64L105.48 279.64L105.48 269.45Z'
};

const LABEL_OPTION = {
  normal: {
    show: false,
    position: 'inside',
    align: 'center',
    verticalAlign: 'middle',
    fontSize: 8,
    color: "#fff"
  }
};

@Component({
  selector: 'app-monitor-info',
  templateUrl: './monitor-base-info.component.html',
  styleUrls: ['./monitor-base-info.component.css']
})
export class MonitorBaseInfoComponent implements OnInit, OnChanges {

  options = {};
  updateOptions = {};
  mapLoaded:boolean = false;

  @Input() labelText: string = "标题";
  @Input() palette: BAR_COLOR_PALETTE = BAR_COLOR_PALETTE.SP1;
  @Input() option: any = {
    title: {key: "title" },
    dataColumns: [
      {key: "data1", title: "数据1"},
      {key: "data2", title: "数据2"}
    ]
  };

  @Input() data: any;

  constructor(private http: HttpClient, private es: NgxEchartsService) { }

  ngOnInit() {
    // hide loading:
    this.mapLoaded = true;

    // update options:
    this.options = {
      grid: {
        top: 0,
        left: 150,
        height: '75%',
      },
      color: this.palette,
      legend: {
        bottom:10,
        selectedMode: false,
        textStyle:{
          fontSize: 18,
          fontWeight: "normal",
          color: "#FFF",
        },
        data: ['预警','预测' ]
      },
      calculable: true,
      yAxis: [
        {
          type: 'category',
          offset: 40,
          inverse: true,
          axisTick: {show: false},
          axisLabel: {
            interval: 0,
            fontSize: 16,
            fontWeight: "normal",
            color: "#FFF",
          },
          data: ['CR400BF', 'CRH380B', 'CRH5G', 'CRH5A', 'CRH3A']
        }
      ],
      xAxis: [
        {
          type: 'value',
          minInterval: 1,
          axisLabel: {
            interval: 0,
            fontSize: 16,
            fontWeight: "normal",
            color: "#FFF",
          },
          splitLine: {
            lineStyle:{
              type:'dashed',
              color: 'rgb(67, 67, 67)'
            }
          },
          axisLine: {show: false},
          axisTick: {show: false}
        }
      ],
      series: [
        {
          type: 'pictorialBar',
          symbolRepeat: true,
          symbolSize: ['150%', '100%'],
          symbolOffset: ['-110%', 0],
          barCategoryGap: '30%',
          data: [{
            value: 1,
            symbol: PATH_SYMBOLS.collapseHouse
          }, {
            value: 1,
            symbol: PATH_SYMBOLS.collapseHouse
          }, {
            value: 1,
            symbol: PATH_SYMBOLS.collapseHouse
          }, {
            value: 1,
            symbol: PATH_SYMBOLS.collapseHouse
          }, {
            value: 1,
            symbol: PATH_SYMBOLS.collapseHouse
          }]
        },
        {
          name: '预测',
          type: 'bar',
          barGap: "40%",
          barCategoryGap: "30%",
          label: LABEL_OPTION,
          data: [320, 332, 0, 334, 390]
        },
        {
          name: '预警',
          type: 'bar',
          barGap: "40%",
          barCategoryGap: "30%",
          label: LABEL_OPTION,
          data: [220, 182, 191, 234, 290]
        },
      ]
    };

  }

  ngOnChanges(){
    if(this.data){
      this.dataProcess(this.data);
    }
  }

  //数据处理
  dataProcess(rawData: Array<any>){
    if(rawData && rawData.length > 0){

      let y_axis_data = [], legend_data, series = [];


      //获取配置legend
      legend_data = this.option.dataColumns.map((columnSetting) =>{

        let serie = {
          name: columnSetting.title,
          type: 'bar',
          barGap: "40%",
          barCategoryGap: "30%",
          label: LABEL_OPTION,
          data: []
        };

        series.push(serie);

        return columnSetting.title;
      });

      rawData.forEach((ele) => {

        y_axis_data.push(ele[this.option.title.key]);

        this.option.dataColumns.forEach((columnSetting: any, idx) => {

          series[idx].data.push(ele[columnSetting.key] || 0);

        });

      });

      while(y_axis_data.length < 5){
        y_axis_data.push("");

      }


      this.updateOptions = {
        legend: {
          data:  Array.from(legend_data)
        },
        yAxis: {
          data: y_axis_data
        },
        series: [
          {
            type: 'pictorialBar',
            symbolRepeat: true,
            symbolSize: ['150%', '100%'],
            symbolOffset: ['-110%', 0],
            barCategoryGap: '30%',
            data: y_axis_data.map((item)=>{
              return {
                value: item ? .1 : 0,
                symbol: PATH_SYMBOLS.collapseHouse
              };
            })
          }
          , ...series]
      };

      // console.log(legend_data);
      // console.log(y_axis_data);
      // console.log(series);

    }


  }

}
