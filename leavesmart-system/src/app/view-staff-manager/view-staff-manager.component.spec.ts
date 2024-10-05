import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffManagerComponent } from './view-staff-manager.component';

describe('ViewStaffManagerComponent', () => {
  let component: ViewStaffManagerComponent;
  let fixture: ComponentFixture<ViewStaffManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStaffManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewStaffManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
