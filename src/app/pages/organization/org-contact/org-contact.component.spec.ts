import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgContactComponent } from './org-contact.component';

describe('OrgContactComponent', () => {
  let component: OrgContactComponent;
  let fixture: ComponentFixture<OrgContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
