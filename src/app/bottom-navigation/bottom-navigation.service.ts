import { Injectable } from '@angular/core';

import { BottomNavButton } from './bottom-navigation.component'

@Injectable()
export class BottomNavigationService {
    constructor() { }
    
    public updateButtons(buttons: BottomNavButton[], options: { position: string } = { position: 'left' }): void {}
}
