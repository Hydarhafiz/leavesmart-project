import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobPositionComponent } from './create-job-position.component';

describe('CreateJobPositionComponent', () => {
  let component: CreateJobPositionComponent;
  let fixture: ComponentFixture<CreateJobPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateJobPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateJobPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
