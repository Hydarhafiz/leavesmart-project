import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveTypesSettingComponent } from './view-leave-types-setting.component';

describe('ViewLeaveTypesSettingComponent', () => {
  let component: ViewLeaveTypesSettingComponent;
  let fixture: ComponentFixture<ViewLeaveTypesSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLeaveTypesSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLeaveTypesSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
