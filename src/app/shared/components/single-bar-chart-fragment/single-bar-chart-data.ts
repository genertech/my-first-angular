export interface SingleBarChartData {
  xAxisData:string[];
  series: SingleBarChartDataSerie[];
}

export interface SingleBarChartDataSerie {
  name:string;
  data: any[];
}
