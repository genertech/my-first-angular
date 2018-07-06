import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EquipStructureComponent} from "./equip-structure/equip-structure.component";
import {FaultAnalysisComponent} from "./fault-analysis/fault-analysis.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'equip-structure', component: EquipStructureComponent },
  { path: 'equip-structure/:sn', component: EquipStructureComponent },
  { path: 'fault-analysis', component: FaultAnalysisComponent},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
