import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, DoCheck, IterableDiffers } from '@angular/core';
import * as moment from "moment-business-days"

import { HolidaysService } from "../holidays.service"
import { Holiday } from "../holiday"

const MODES = {
    CONSULTATION: 0,
    SELECTING: 1,
    EDITING: 2,
    DELETING: 3
}

@Component({
    selector: 'hld-calendar',
    exportAs: 'hldCalendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, DoCheck {
    private _year: number = 1970;
    
    @Input()
    public set year(value: number) {
        if (value && this._year !== value) {
            this._year = value;
            this.updateCalendar(true)
        }
    }
    public get year() {
        return this._year;
    }
    
    private _userHolidays: Holiday[] = []
    
    @Input()
    public set userHolidays(value: Holiday[]) {
        this._userHolidays = value;
    }
    public get userHolidays() {
        return this._userHolidays;
    }
    
    @Output()
    public holidaysSelect = new EventEmitter<Holiday>()
    
    public calendar = []
    public startDate = null
    public endDate = null
    public mode = MODES.CONSULTATION
    
    private differ: any

    constructor(private differs: IterableDiffers, private holidaysService: HolidaysService) {
        this.differ = differs.find([]).create()
    }

    ngOnInit(): void {
        this.updateCalendar(true)
    }
    
    ngDoCheck(): void {
        var changes = this.differ.diff(this._userHolidays);
        
        if (changes) {
            let hasChanges = false
            
            changes.forEachItem((aa) => {
                hasChanges = true
                return
            })
            
            if (hasChanges) {
                this.updateCalendar(false)
            }
        }
    }
    
    public getDay(date: moment.Moment) {
        if (date) return date.format('DD')
    }

    public isDayClickable(day: any) {
        if (day.isUserHoliday || this.mode === MODES.CONSULTATION) return false
        
        return true
    }
    
    public onDayClicked(day: any): void {
        if (!this.isDayClickable(day)) return
        
        if (this.startDate && this.endDate) {
            // both selected
            this.startDate = null
            this.endDate = null
            this.clearCalendarSelection()
        }
        
        if (!this.startDate) {
            // nothing selected
            this.startDate = moment(day.date)
            day.selected = true
        } else {
            // start selected
            if (day.date.isBefore(this.startDate)) {
                this.endDate = moment(this.startDate)
                this.startDate = moment(day.date)
            } else {
                this.endDate = moment(day.date)
            }
            day.selected = true
            
            this.calendar.forEach(month => month.days
                .filter(day => {
                    const currentDay = moment(day.date)
                    return currentDay.isSameOrAfter(this.startDate) && currentDay.isSameOrBefore(this.endDate)
                })
                .forEach(day => day.selected = true)
            )
        }
    }
    
    public getWeekDaysOfLastMonth(month: any): number[] {
        let days = []
        for (let i = month.firstDay.weekday(); i > 0; i--) {
            days.push(moment(month.firstDay).add(i * -1, 'day').format('DD'))
        }
        return days
    }
    
    /****/
    public startSelection() {
        this.mode = MODES.SELECTING
    }
    
    public cancelSelection() {
        this.mode = MODES.CONSULTATION
        this.startDate = null
        this.endDate = null
        this.clearCalendarSelection()
    }
    
    public chooseSelection() {
        this.mode = MODES.CONSULTATION
        this.holidaysSelect.emit({
            start: {
                date: this.startDate,
                fullDay: true
            },
            end: {
                date: this.endDate,
                fullDay: true
            },
            temporal: true
        } as Holiday)
        this.clearCalendarSelection()
    }
    public get isSelecting() {
        return this.mode === MODES.SELECTING
    }
    public get isClickable() {
        return this.mode === MODES.SELECTING
    }
    public get isConsultationMode() {
        return this.mode === MODES.CONSULTATION
    }
    /****/
    
    private clearCalendarSelection(): void {
        this.calendar.forEach(month => month.days.forEach(day => day.selected = false))
    }
    
    private updateCalendar(clear: boolean): void {
        if (!this.year) return
        
        if (clear) {
            this.calendar = []
            const calendar = {}
            const startOfYear = this.holidaysService.getFirstDayOfYear(this.year)
            const endOfYear = this.holidaysService.getLastDayOfYear(this.year)
            
            let currentDate = moment(startOfYear)
            while (currentDate.isSameOrBefore(endOfYear)) {
                
                if (!calendar[currentDate.month()]) {
                    calendar[currentDate.month()] = {
                        firstDay: moment(currentDate),
                        name: currentDate.format("MMMM"),
                        days: []
                    }
                }
                
                let isUserHoliday = false
                let isTemporal = false
                if (this.userHolidays && this.userHolidays.length) {
                    this.userHolidays.forEach((holiday: Holiday) => {
                        if (currentDate.isSameOrAfter(holiday.start.date) && currentDate.isSameOrBefore(holiday.end.date)) {
                            isUserHoliday = true
                            isTemporal = holiday.temporal
                        }
                    })
                }
                
                calendar[currentDate.month()].days.push({
                    date: moment(currentDate),
                    event: null,
                    selected: false,
                    isUserHoliday,
                    temporal: isTemporal
                })
                
                currentDate.add(1, 'day')
            }
            
            for (let month of Object.values(calendar)) {
                this.calendar.push(month as any)
            }
        } else {
            for (let month of this.calendar) {
                for (let day of month.days) {
                    let isUserHoliday = false
                    let isTemporal = false
                    if (this.userHolidays && this.userHolidays.length) {
                        this.userHolidays.forEach((holiday: Holiday) => {
                            if (day.date.isSameOrAfter(holiday.start.date) && day.date.isSameOrBefore(holiday.end.date)) {
                                isUserHoliday = true
                                isTemporal = holiday.temporal
                            }
                        })
                    }
                    
                    day.isUserHoliday = isUserHoliday
                    day.temporal = isTemporal
                }
            }
        }
    }

}
