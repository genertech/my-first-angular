import {Component, OnInit} from '@angular/core';
import {SimpleRollingTableConfig} from "../../shared/components/simple-rolling-table-fragment/simple-rolling-table-config";
import {FRAMES} from "../../shared/directives/outer-frame.directive";
import {SystemEvaluationDataService} from "../../service/impl/health-evaluation/system-evaluation-data.service";
import {PartEvaluationDataService} from "../../service/impl/health-evaluation/part-evaluation-data.service";

@Component({
  selector: 'app-health-evaluation',
  templateUrl: './health-evaluation.component.html',
  styleUrls: ['./health-evaluation.component.css']
})
export class HealthEvaluationComponent implements OnInit {

  frames = FRAMES;

  systemEvaluationRTConfig: SimpleRollingTableConfig;
  partEvaluationRTConfig: SimpleRollingTableConfig;

  systemEvaluationData: Array<any>;
  partEvaluationData: Array<any>;

  currEquipType = 'N/A';
  currEquipSn = 'N/A';

  constructor(private systemEvaluationDS: SystemEvaluationDataService,
              private partEvaluationDs: PartEvaluationDataService) {
  }

  ngOnInit() {

    this.currEquipType = 'CRH3C';
    this.currEquipSn = 'DEMO';

    this.rollingTableInit();

    this.systemEvaluationDS.currentSubject().subscribe(next => {

      this.systemEvaluationData = next;
    }, error1 => {
      console.log("error", error1);
    });

    this.partEvaluationDs.currentSubject().subscribe(next => {

      this.partEvaluationData = next;

    }, error1 => {
      console.log("error", error1);
    });

    this.systemEvaluationDS.startTimer();
    this.partEvaluationDs.startTimer();

  }

  private rollingTableInit() {

    this.systemEvaluationRTConfig = {
      labelText: '系统评估',
      labelStyle: {width: '300px', background: 'unset'},
      switchLoop: 60 * 1000,
      sectionLabelText: "车型",
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: true,
        idxOccupancyRate: 10,
        columns: [
          {title: '车组', key: 'equipName', style: {width: '30%'}},
          {title: '系统', key: 'sysName', style: {width: '30%'}},
          {title: '最低等级', key: 'minLevel', style: {width: '30%'}}
        ]
      }
    };

    this.partEvaluationRTConfig = {
      labelText: '部件评估',
      labelStyle: {width: '300px', background: 'unset'},
      switchLoop: 60 * 1000,
      sectionLabelText: "车型",
      sectionKey: "equipTypeName",
      columnSetting: {
        needIdx: true,
        idxOccupancyRate: 10,
        columns: [
          {title: '车组', key: 'equipName', style: {width: '30%'}},
          {title: '部件', key: 'partName', style: {width: '30%'}},
          {title: '最低等级', key: 'minLevel', style: {width: '30%'}}
        ]
      }
    };
  }

  switchEquip($event) {

      this.currEquipType = $event.equipType;
      this.currEquipSn = $event.equipSn;

  }

}
