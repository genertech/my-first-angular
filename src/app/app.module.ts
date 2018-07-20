import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxEchartsModule} from 'ngx-echarts';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {KazaroDirective} from './shared/directives/kazaro.directive';
import {OuterFrameDirective} from './shared/directives/outer-frame.directive';
import {TrainOperationMapComponent} from './routes/main-page/train-operation-map/train-operation-map.component';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {RollingNumberComponent} from './shared/components/rolling-number/rolling-number.component';
import {TrainStatusComponent} from './routes/main-page/train-status/train-status.component';
import {MonitorBaseInfoComponent} from './routes/main-page/monitor-base-info/monitor-base-info.component';
import {RollingTableComponent} from './shared/components/rolling-table/rolling-table.component';
import {CircleComponent} from './shared/components/circle/circle.component';
import {WarnForecastInfoComponent} from './routes/main-page/warn-forecast-info/warn-forecast-info.component';
import {HealthEvaluationInfoComponent} from './routes/main-page/health-evalution-info/health-evaluation-info.component';
import {AppRoutingModule} from "./routes/app-routing.module";
import {MainPageComponent} from './routes/main-page/main-page.component';
import {DashboardComponent} from './routes/dashboard/dashboard.component';
import {DelonMockModule} from '@delon/mock';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment'
import {EquipStructureComponent} from './routes/equip-structure/equip-structure.component';
import {ChildrenRowDisplayComponent} from './shared/components/children-row-display/children-row-display.component';
import * as MOCKDATA from '../../_mock';
import {FaultAnalysisComponent} from "./routes/fault-analysis/fault-analysis.component";
import {MillionKilometerFaultRateComponent} from './routes/fault-analysis/million-kilometer-fault-rate/million-kilometer-fault-rate.component';
import {RuntimeFaultComponent} from './routes/fault-analysis/runtime-fault/runtime-fault.component';
import {AverageNoFaultComponent} from './routes/fault-analysis/average-no-fault/average-no-fault.component';
import {FaultDistributionComponent} from './routes/fault-analysis/fault-distribution/fault-distribution.component';
import {FaultSummaryComponent} from './routes/fault-analysis/fault-summary/fault-summary.component';
import {RotationDataSwitchComponent} from './shared/components/rotation-data-switch/rotation-data-switch.component';
import {MarqueeComponent} from './shared/components/marquee/marquee.component';
import {StartupService} from "./core/start-up/startup.service";
import {KeyTranslatePipe} from './shared/pipe/key-translate.pipe';
import {FaultDiagnosisComponent} from './routes/fault-diagnosis/fault-diagnosis.component';
import {FaultPrecisePositioningComponent} from './routes/fault-diagnosis/fault-precise-positioning/fault-precise-positioning.component';
import {FaultReasonInvestigationComponent} from './routes/fault-diagnosis/fault-reason-investigation/fault-reason-investigation.component';
import {PrecisePositioningSummaryComponent} from './routes/fault-diagnosis/precise-positioning-summary/precise-positioning-summary.component';
import {ReasonInvestigationSummaryComponent} from './routes/fault-diagnosis/reason-investigation-summary/reason-investigation-summary.component';
import {FaultPredictionComponent} from './routes/fault-prediction/fault-prediction.component';
import {SingleBarChartFragmentComponent} from './shared/components/single-bar-chart-fragment/single-bar-chart-fragment.component';
import {GlassDisplayFrameComponent} from './shared/components/glass-display-frame/glass-display-frame.component';
import { SimpleRollingTableFragmentComponent } from './shared/components/simple-rolling-table-fragment/simple-rolling-table-fragment.component';
import { MaintenanceDecisionComponent } from './routes/maintenance-decision/maintenance-decision.component';
import { HealthEvaluationComponent } from './routes/health-evaluation/health-evaluation.component';
import { EquipHealthStateDiagramComponent } from './routes/health-evaluation/equip-health-state-diagram/equip-health-state-diagram.component';

const MOCKMODULE = !environment.production ? [ DelonMockModule.forRoot({ data: MOCKDATA }) ] : [];

const COMPONENTS = [
  AppComponent,
  TrainOperationMapComponent,
  RollingNumberComponent,
  TrainStatusComponent,
  MonitorBaseInfoComponent,
  RollingTableComponent,
  CircleComponent,
  WarnForecastInfoComponent,
  HealthEvaluationInfoComponent,
  MainPageComponent,
  EquipStructureComponent,
  DashboardComponent,
  ChildrenRowDisplayComponent,
  FaultAnalysisComponent,
  MillionKilometerFaultRateComponent,
  RuntimeFaultComponent,
  AverageNoFaultComponent,
  FaultDistributionComponent,
  FaultSummaryComponent,
  RotationDataSwitchComponent,
  MarqueeComponent,
  FaultDiagnosisComponent,
  FaultPrecisePositioningComponent,
  FaultReasonInvestigationComponent,
  PrecisePositioningSummaryComponent,
  ReasonInvestigationSummaryComponent,
  FaultPredictionComponent,
];

const DIRECTIVES = [
  KazaroDirective,
  OuterFrameDirective
];

const PIPES = [
  KeyTranslatePipe,
];

/*
export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
*/

export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    SingleBarChartFragmentComponent,
    GlassDisplayFrameComponent,
    SimpleRollingTableFragmentComponent,
    MaintenanceDecisionComponent,
    HealthEvaluationComponent,
    EquipHealthStateDiagramComponent,
  ],
  imports: [
    ...MOCKMODULE,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxEchartsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>(new TranslateHttpLoader(http, 'assets/i18n/', '.json')),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
