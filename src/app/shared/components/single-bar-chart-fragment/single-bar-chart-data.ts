export interface SingleBarChartData {
  xAxisData: string[];
  axisLabel?: any;
  series: SingleBarChartDataSerie[];
}

export interface SingleBarChartDataSerie {
  name:string;
  data: any[];
}
