import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { BottomNavigationService } from './bottom-navigation.service'

export class BottomNavButton {
    public icon: string;
    public click?: () => void;
    public isDisplayable?: () => boolean = (() => true);
    public isMenu?: boolean = false;
    public menuItems?: BottomNavMenuItem[] = [];
}
export class BottomNavMenuItem {
    public text: string;
    public icon?: string;
    public click?: () => void;
}

@Component({
    selector: 'hld-bottom-navigation',
    templateUrl: './bottom-navigation.component.html',
    styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {
    public leftButtons: BottomNavButton[] = []
    public rightButtons: BottomNavButton[] = []
    
    public menuItems: BottomNavMenuItem[] = []
    
    constructor(private service: BottomNavigationService) {
        this.service.updateButtons = this.updateButtons.bind(this)
    }

    ngOnInit() {
    }
    
    public updateButtons(buttons: BottomNavButton[], options: { position: string } = { position: 'left' }) {
        if (options.position === 'right') {
            this.rightButtons = buttons
        } else {
            this.leftButtons = buttons
        }
    }
    
    public updateMenu(btn: BottomNavButton) {
        this.menuItems = btn.menuItems
    }
}
