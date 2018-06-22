import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SimpleFormComponent } from './routes/simple-form/simple-form.component';
import { KazaroDirective } from './directive/kazaro.directive';
import { OuterFrameDirective } from './directive/outer-frame.directive';
import { TrainOperationMapComponent } from './routes/train-operation-map/train-operation-map.component';
import {HttpClientModule} from "@angular/common/http";


const COMPONENTS = [
  AppComponent,
  SimpleFormComponent,
  TrainOperationMapComponent
];

const DIRECTIVES = [
  KazaroDirective,
  OuterFrameDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
