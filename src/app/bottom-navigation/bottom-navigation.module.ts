import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../../shared/material/material.module';

import { BottomNavigationComponent } from './bottom-navigation.component';
import { BottomNavigationService } from './bottom-navigation.service';


@NgModule({
    declarations: [
        BottomNavigationComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule
    ],
    exports: [
        BottomNavigationComponent
    ]
})
export class BottomNavigationModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: BottomNavigationModule,
            providers: [
                BottomNavigationService
            ]
        }
    }
}
