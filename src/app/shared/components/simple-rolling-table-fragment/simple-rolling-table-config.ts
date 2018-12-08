import {RollingTableColumnSetting} from "../rolling-table/rolling-table-column-setting";

export interface SimpleRollingTableConfig {
  switchLoop: number;
  labelIcon?: any;
  labelText: string;
  labelTextStyle?: any;
  labelStyle?: any;
  sectionLabelStyle?: any;
  sectionLabelText: string;
  sectionLabelTextStyle?: any;
  sectionLabelKeyStyle?: any;
  sectionKey: string;
  columnSetting: RollingTableColumnSetting
}
