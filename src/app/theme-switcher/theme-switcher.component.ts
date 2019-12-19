import { Component, OnInit, Input, Renderer } from '@angular/core';

const DARK_THEME_CLASS = 'unicorn-dark-theme'

@Component({
    selector: 'hld-theme-switcher',
    exportAs: 'hldThemeSwitcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
    @Input()
    public checked = false
    @Input()
    public hidden = false
    
    constructor(private renderer: Renderer) { }

    ngOnInit() {
    }
    
    public switchMode(event?) {
        if (!event) {
            this.checked = !this.checked
        } else if (event.checked) {
            this.checked = true
        } else {
            this.checked = false
        }
        
        if (this.checked) {
            this.darkMode()
        } else {
            this.lightMode()
        }
    }
    
    private lightMode() {
        this.renderer.setElementClass(document.body, DARK_THEME_CLASS, false);
    }
    
    private darkMode() {
        this.renderer.setElementClass(document.body, DARK_THEME_CLASS, true);
    }

}
