import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

import { BottomNavigationService } from './bottom-navigation/bottom-navigation.service'
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component'

@Component({
    selector: 'hld-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild(ThemeSwitcherComponent, { /*selector: 'themeSwitcher', */static: false })//
    public themeSwitcher: ThemeSwitcherComponent
  
    constructor(private _adapter: DateAdapter<any>, private cd: ChangeDetectorRef, private bottomNavigationService: BottomNavigationService) {
    }
    
    ngOnInit() {
        this._adapter.setLocale('fr')
    }
    
    ngAfterViewInit() {
        this.bottomNavigationService.updateButtons([
            {
                icon: 'more_vert',
                isMenu: true,
                menuItems: [
                    { text: 'Switch Theme', icon: 'invert_colors', click: this.themeSwitcher.switchMode.bind(this.themeSwitcher) }
                ],
                isDisplayable: () => true
            }
        ], { position: 'right' })
        
        // Call the Change Detector because we updated a component here (needed for the ViewChild)
        this.cd.detectChanges()
    }
}
