import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReferralsComponent } from './pending-referrals.component';

describe('PendingReferralsComponent', () => {
  let component: PendingReferralsComponent;
  let fixture: ComponentFixture<PendingReferralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingReferralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
