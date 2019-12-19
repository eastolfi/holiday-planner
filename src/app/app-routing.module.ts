import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolidayPlanningComponent } from './holiday-planning/holiday-planning.component'


const routes: Routes = [
    { path: '', component: HolidayPlanningComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
