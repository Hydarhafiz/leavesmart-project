import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobPositionSettingComponent } from './view-job-position-setting.component';

describe('ViewJobPositionSettingComponent', () => {
  let component: ViewJobPositionSettingComponent;
  let fixture: ComponentFixture<ViewJobPositionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJobPositionSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewJobPositionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
