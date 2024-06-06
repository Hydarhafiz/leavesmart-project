import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffsManagerComponent } from './edit-staffs-manager.component';

describe('EditStaffsManagerComponent', () => {
  let component: EditStaffsManagerComponent;
  let fixture: ComponentFixture<EditStaffsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStaffsManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStaffsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
