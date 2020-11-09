import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentReferralsComponent } from './sent-referrals.component';

describe('SentReferralsComponent', () => {
  let component: SentReferralsComponent;
  let fixture: ComponentFixture<SentReferralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentReferralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
