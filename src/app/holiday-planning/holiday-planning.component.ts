import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import * as moment from "moment-business-days"

import { BottomNavigationService } from '../bottom-navigation/bottom-navigation.service'
import { CalendarComponent } from '../calendar/calendar.component'

import { HolidaysService } from "../holidays.service"
import { Utils } from "../utils"
import { Holiday } from "../holiday"
import { Mapper } from "../mapper"

@Component({
    selector: 'hld-holiday-planning',
    templateUrl: './holiday-planning.component.html',
    styleUrls: ['./holiday-planning.component.scss']
})
export class HolidayPlanningComponent implements OnInit, AfterViewInit {
    public holidayForm: FormGroup
    
    @ViewChild(CalendarComponent, { /*selector: 'calendar', */static: false })
    public calendar: CalendarComponent

    constructor(private fb: FormBuilder, private holidaysService: HolidaysService, private bottomNavigationService: BottomNavigationService) { }

    ngOnInit() {
        this.holidayForm = this.fb.group({
            currentYear: new FormControl(
                moment().add(1, 'year').year()
            ),
            daysInYear: new FormControl(),
            forfait: new FormControl({ value: 218, disabled: true }),
            paidHolidays: new FormControl({ value: 25, disabled: true }),
            userHolidays: new FormArray([])
        });
        
        this.holidaysService.getUserHolidays().subscribe((holiday: Holiday) => {
            if (holiday) this.addUserHoliday(holiday)
        })
        
        this.setupMoment()
    }
    
    ngAfterViewInit() {
        this.bottomNavigationService.updateButtons([
            { icon: 'date_range', click: this.calendar.startSelection.bind(this.calendar), isDisplayable: () => this.calendar.isConsultationMode },
            { icon: 'delete', click: this.calendar.startSelection.bind(this.calendar), isDisplayable: () => this.calendar.isConsultationMode },
            { icon: 'done', click: this.calendar.chooseSelection.bind(this.calendar), isDisplayable: () => !this.calendar.isConsultationMode && this.calendar.isSelecting },
            { icon: 'close', click: this.calendar.cancelSelection.bind(this.calendar), isDisplayable: () => !this.calendar.isConsultationMode && this.calendar.isSelecting }
        ])
    }
    
    get years() {
        return [2020, 2019, 2018]
    }
  
    get daysInYear(): number {
        return this.holidaysService.getDaysInYear(this.holidayForm.value.currentYear)
    }
  
    get personalDays(): number {
        const currentYear = this.holidayForm.get('currentYear').value as number
        const forfait = this.holidayForm.get('forfait').value as number
        const paidHolidays = this.holidayForm.get('paidHolidays').value as number
        
        return this.holidaysService.getPersonalDays(currentYear, forfait, paidHolidays)
    }
  
    get workedDays(): number {
        return this.daysInYear - this.holidaysService.getNonWorkingDays(2020) - this.absences
    }
  
    get absences(): number {
        let totalAbsences = 0

        for (let holiday of this.userHolidays) {
            const { start, end } = holiday

            let dayDiff = Utils.getMomentDate(end.date).businessDiff(Utils.getMomentDate(start.date))
            if (!start.fullDay) {
                dayDiff -= 0.5
            }
            if (!end.fullDay) {
                dayDiff -= 0.5
            }

            totalAbsences += dayDiff
        }

        return totalAbsences
    }

    get userHolidaysForm(): FormArray {
        return this.holidayForm.get('userHolidays') as FormArray
    }
    
    get userHolidays(): Holiday[] {
        return this.userHolidaysForm.controls.map(holiday => Mapper.mapToHoliday(holiday as FormGroup))
    }
    
    get currentYear() {
        return this.holidayForm.get('currentYear').value
    }
    
    public onHolidaysSelected(selection: Holiday) {
        this.addUserHoliday(selection)
    }
    
    private setupMoment() {
        moment.updateLocale('fr', {
            holidays: this.holidaysService.getHolidays(),
            holidayFormat: 'DD-MM-YYYY',
            workingWeekdays: [1, 2, 3, 4, 5]
        });
    }
    
    private addUserHoliday(holiday: Holiday): void {
        this.userHolidaysForm.push(Mapper.mapHoliday(holiday))
    }
}
