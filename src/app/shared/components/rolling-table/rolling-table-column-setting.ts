export interface RollingTableColumnSetting {
  needIdx: boolean;
  idxOccupancyRate?: number;
  overallStyle?: any;
  columnHeight?: string;
  columns: RollingTableColumn[];

}

export interface RollingTableColumn {

  title: string,
  key: string,
  style: any,
  keyTranslate?: any,
  matchPatten?: string //根据顺序匹配key，并显示匹配到的第一个key

}
