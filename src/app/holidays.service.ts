import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from "moment-business-days"

import { Holiday } from "./holiday"

@Injectable({
    providedIn: 'root'
})
export class HolidaysService {

    constructor() { }
    
    public getHolidays(): string[] {
        return [
            ...[
                // Jour de l’An
                '01-01-2019',
                // Pâques
                '22-04-2019',
                // Fête du Travail
                '01-05-2019',
                // Victoire des Alliés en 1945
                '08-05-2019',
                // Ascension
                '30-05-2019',
                // Pentecôte
                '10-06-2019',
                // Fête nationale
                '14-07-2019',
                // Assomption
                '15-08-2019',
                // Toussaint
                '01-11-2019',
                // Armistice 1918
                '11-11-2019',
                // Noël
                '25-12-2019'
            ],
            ...[
                // Jour de l’An
                '01-01-2020',
                // Pâques
                '13-04-2020',
                // Fête du Travail
                '01-05-2020',
                // Victoire des Alliés en 1945
                '08-05-2020',
                // Ascension
                '21-05-2020',
                // Pentecôte
                '01-06-2020',
                // Fête nationale
                '14-07-2020',
                // Assomption
                '15-08-2020',
                // Toussaint
                '01-11-2020',
                // Armistice 1918
                '11-11-2020',
                // Noël
                '25-12-2020'
            ]
        ]
    }
    
    public getFirstDayOfYear(year: number): moment.Moment {
        if (year) {
            return moment().year(year).startOf('year')
        }
        
        return null
    }
    
    public getLastDayOfYear(year: number): moment.Moment {
        if (year) {
            return moment().year(year).endOf('year')
        }
        
        return null
    }
    
    public getDaysInYear(year: number): number {
        if (year) {
            return this.getLastDayOfYear(year).diff(this.getFirstDayOfYear(year), 'days')
        }
        
        return 0
    }
    
    public getWorkingDays(year: number): number {
        if (year) {
            return this.getFirstDayOfYear(year).businessDiff(this.getLastDayOfYear(year))
        }
        
        return 0
    }
    
    public getNonWorkingDays(year: number): number {
        if (year) {
            return this.getDaysInYear(year) - this.getWorkingDays(year)
        }
        
        return 0
    }
    
    public getPersonalDays(year: number, forfait: number, paidHolidays: number): number {
        if (year && forfait && paidHolidays) {
            return this.getWorkingDays(year) - forfait - paidHolidays
        }
        
        return 0
    }
    
    public getUserHolidays(): Observable<Holiday> {
        return new Observable((observer) => {
            observer.next({
                start: {
                    date: '02-01-2020',
                    fullDay: true
                },
                end: {
                    date: '03-01-2020',
                    fullDay: true
                },
                temporal: false
            })
            
            observer.complete()
        });
    }
}
