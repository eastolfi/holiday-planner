import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabDialComponent } from './fab-dial.component';

describe('FabDialComponent', () => {
    let component: FabDialComponent;
    let fixture: ComponentFixture<FabDialComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FabDialComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FabDialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
