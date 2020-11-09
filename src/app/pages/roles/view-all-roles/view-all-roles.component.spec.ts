import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRolesComponent } from './view-all-roles.component';

describe('ViewAllRolesComponent', () => {
  let component: ViewAllRolesComponent;
  let fixture: ComponentFixture<ViewAllRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
