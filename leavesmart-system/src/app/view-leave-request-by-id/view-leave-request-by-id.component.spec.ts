import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveRequestByIdComponent } from './view-leave-request-by-id.component';

describe('ViewLeaveRequestByIdComponent', () => {
  let component: ViewLeaveRequestByIdComponent;
  let fixture: ComponentFixture<ViewLeaveRequestByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLeaveRequestByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLeaveRequestByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
