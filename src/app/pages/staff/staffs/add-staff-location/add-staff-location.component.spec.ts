import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffLocationComponent } from './add-staff-location.component';

describe('AddStaffLocationComponent', () => {
  let component: AddStaffLocationComponent;
  let fixture: ComponentFixture<AddStaffLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
