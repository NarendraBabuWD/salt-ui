import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedReferralsComponent } from './deleted-referrals.component';

describe('DeletedReferralsComponent', () => {
  let component: DeletedReferralsComponent;
  let fixture: ComponentFixture<DeletedReferralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedReferralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
