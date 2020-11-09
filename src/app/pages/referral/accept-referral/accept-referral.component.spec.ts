import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptReferralComponent } from './accept-referral.component';

describe('AcceptReferralComponent', () => {
  let component: AcceptReferralComponent;
  let fixture: ComponentFixture<AcceptReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
