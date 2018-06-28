import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { KazaroDirective } from './shared/directives/kazaro.directive';
import { OuterFrameDirective } from './shared/directives/outer-frame.directive';
import { TrainOperationMapComponent } from './routes/main-page/train-operation-map/train-operation-map.component';
import {HttpClientModule} from "@angular/common/http";
import { RollingNumberComponent } from './shared/components/rolling-number/rolling-number.component';
import { TrainStatusComponent } from './routes/main-page/train-status/train-status.component';
import { MonitorBaseInfoComponent } from './routes/main-page/monitor-base-info/monitor-base-info.component';
import { RollingTableComponent } from './shared/components/rolling-table/rolling-table.component';
import { CircleComponent } from './shared/components/circle/circle.component';
import { WarnForecastInfoComponent } from './routes/main-page/warn-forecast-info/warn-forecast-info.component';
import { HealthEvaluationInfoComponent } from './routes/main-page/health-evalution-info/health-evaluation-info.component';
import {AppRoutingModule} from "./routes/app-routing.module";
import { MainPageComponent } from './routes/main-page/main-page.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';

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

];

const DIRECTIVES = [
  KazaroDirective,
  OuterFrameDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    MainPageComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
