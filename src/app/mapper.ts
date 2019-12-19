import { FormGroup, FormControl } from '@angular/forms';
import { Holiday } from "./holiday"
import * as moment from "moment-business-days"

export class Mapper {
    public static mapHoliday(holiday: Holiday): FormGroup {
        return new FormGroup({
            start: new FormGroup({
                date: new FormControl({ value: moment(holiday.start.date, 'DD-MM-YYYY'), disabled: true }),
                fullDay: new FormControl({ value: holiday.start.fullDay, disabled: true })
            }),
            end: new FormGroup({
                date: new FormControl({ value: moment(holiday.end.date, 'DD-MM-YYYY'), disabled: true }),
                fullDay: new FormControl({ value: holiday.end.fullDay, disabled: true })
            }),
            temporal: new FormControl(holiday.temporal)
        })
    }
    
    public static mapToHoliday(holidayForm: FormGroup): Holiday {
        if (holidayForm) {
            let holiday = new Holiday()
            
            holiday.start = {
                date: holidayForm.get('start').get('date').value,
                fullDay: holidayForm.get('start').get('fullDay').value
            }
            holiday.end = {
                date: holidayForm.get('end').get('date').value,
                fullDay: holidayForm.get('end').get('fullDay').value
            }
            holiday.temporal = holidayForm.get('temporal').value
            
            return holiday
        }
        
        return null
    }
}