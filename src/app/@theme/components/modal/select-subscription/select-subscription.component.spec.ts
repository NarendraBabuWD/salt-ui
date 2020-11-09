import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubscriptionComponent } from './select-subscription.component';

describe('SelectSubscriptionComponent', () => {
  let component: SelectSubscriptionComponent;
  let fixture: ComponentFixture<SelectSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
