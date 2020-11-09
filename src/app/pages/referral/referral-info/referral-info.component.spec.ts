import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralInfoComponent } from './referral-info.component';

describe('ReferralInfoComponent', () => {
  let component: ReferralInfoComponent;
  let fixture: ComponentFixture<ReferralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
