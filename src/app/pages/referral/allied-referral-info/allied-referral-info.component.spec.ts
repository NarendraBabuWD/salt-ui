import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlliedReferralInfoComponent } from './allied-referral-info.component';

describe('AlliedReferralInfoComponent', () => {
  let component: AlliedReferralInfoComponent;
  let fixture: ComponentFixture<AlliedReferralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlliedReferralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlliedReferralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
