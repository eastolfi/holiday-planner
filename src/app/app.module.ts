import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FabDialComponent } from './fab-dial/fab-dial.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HolidayPlanningComponent } from './holiday-planning/holiday-planning.component';
import { BottomNavigationModule } from './bottom-navigation/bottom-navigation.module';


@NgModule({
    declarations: [
        AppComponent,
        FabDialComponent,
        ThemeSwitcherComponent,
        CalendarComponent,
        HolidayPlanningComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        AppRoutingModule,
        BottomNavigationModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
