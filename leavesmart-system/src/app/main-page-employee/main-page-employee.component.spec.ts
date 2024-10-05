import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageEmployeeComponent } from './main-page-employee.component';

describe('MainPageEmployeeComponent', () => {
  let component: MainPageEmployeeComponent;
  let fixture: ComponentFixture<MainPageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
