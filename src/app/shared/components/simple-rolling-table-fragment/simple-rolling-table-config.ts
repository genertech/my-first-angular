import {RollingTableColumnSetting} from "../rolling-table/rolling-table-column-setting";

export interface SimpleRollingTableConfig {
  switchLoop: number;
  labelText: string;
  labelStyle?: any;
  sectionLabelText: string;
  sectionKey: string;
  columnSetting: RollingTableColumnSetting
}
