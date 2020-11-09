import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReferralComponent } from './rejected-referral.component';

describe('RejectedReferralComponent', () => {
  let component: RejectedReferralComponent;
  let fixture: ComponentFixture<RejectedReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
