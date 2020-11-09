import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralTemplateComponent } from './referral-template.component';

describe('ReferralTemplateComponent', () => {
  let component: ReferralTemplateComponent;
  let fixture: ComponentFixture<ReferralTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
