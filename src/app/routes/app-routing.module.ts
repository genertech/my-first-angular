import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'main-page', component: MainPageComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
