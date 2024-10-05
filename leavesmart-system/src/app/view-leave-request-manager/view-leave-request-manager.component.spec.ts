import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveRequestManagerComponent } from './view-leave-request-manager.component';

describe('ViewLeaveRequestManagerComponent', () => {
  let component: ViewLeaveRequestManagerComponent;
  let fixture: ComponentFixture<ViewLeaveRequestManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLeaveRequestManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLeaveRequestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
