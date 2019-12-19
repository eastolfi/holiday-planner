import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPlanningComponent } from './holiday-planning.component';

describe('HolidayPlanningComponent', () => {
  let component: HolidayPlanningComponent;
  let fixture: ComponentFixture<HolidayPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
