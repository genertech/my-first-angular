import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {KazaroDirective} from './shared/directives/kazaro.directive';
import {OuterFrameDirective} from './shared/directives/outer-frame.directive';
import {TrainOperationMapComponent} from './routes/main-page/train-operation-map/train-operation-map.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
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

import * as MOCKDATA from '../../_mock';
// 只对开发环境有效
import {environment} from '../environments/environment';

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

];

const DIRECTIVES = [
  KazaroDirective,
  OuterFrameDirective
];

/*
export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
*/

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    MainPageComponent,
    DashboardComponent,

  ],
  imports: [
    ...MOCKMODULE,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>(new TranslateHttpLoader(http, './assets/i18n/', '.json')),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
