import { Component, OnInit, Input } from '@angular/core';

import { speedDialFabAnimations } from '../animations'

export class FabOption {
    public icon: string;
    public tooltip: string;
    public click: () => void;
}

@Component({
    selector: 'hld-fab-dial',
    templateUrl: './fab-dial.component.html',
    styleUrls: ['./fab-dial.component.scss'],
    animations: speedDialFabAnimations
})
export class FabDialComponent implements OnInit {
    public buttons = []
    public fabTogglerState = 'inactive'
    
    @Input()
    public options: FabOption[]
    
    constructor() { }

    ngOnInit() {
    }
    
    onToggleFab() {
        this.buttons.length ? this.hideItems() : this.showItems();
    }
    showItems() {
        this.fabTogglerState = 'active';
        this.buttons = this.options;
    }

    hideItems() {
        this.fabTogglerState = 'inactive';
        this.buttons = [];
    }

}


// public fabOptions: FabOption[] = [{
        // icon: 'calendar_today',
        // tooltip: 'Add a single-day holiday',
        // click: () => {
            // this.addUserHoliday({
                // start: {
                    // date: '23-12-2020',
                    // fullDay: true
                // },
                // end: {
                    // date: '23-12-2020',
                    // fullDay: true
                // }
            // } as Holiday)
        // }
    // }, {
        // icon: 'date_range',
        // tooltip: 'Add a range holiday',
        // click: () => {
            // this.addUserHoliday({
                // start: {
                    // date: '17-12-2020',
                    // fullDay: true
                // },
                // end: {
                    // date: '18-12-2020',
                    // fullDay: true
                // }
            // } as Holiday)
        // }
    // }]