import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgContactComponent } from './add-org-contact.component';

describe('AddOrgContactComponent', () => {
  let component: AddOrgContactComponent;
  let fixture: ComponentFixture<AddOrgContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrgContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
