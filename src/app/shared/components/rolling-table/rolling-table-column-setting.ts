export interface RollingTableColumnSetting {
  needIdx: boolean;
  idxOccupancyRate?: number
  columns: RollingTableColumns[];
}

export interface RollingTableColumns {

  title: string,
  key: string,
  style: any
  keyTranslate?: any

}
