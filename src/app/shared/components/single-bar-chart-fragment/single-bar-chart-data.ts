export interface SingleBarChartData {
  xAxisData: string[];
  chartOptions?: any;
  series: SingleBarChartDataSerie[];
}

export interface SingleBarChartDataSerie {
  name:string;
  data: any[];
}
