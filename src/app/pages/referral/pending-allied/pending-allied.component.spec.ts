import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAlliedComponent } from './pending-allied.component';

describe('PendingAlliedComponent', () => {
  let component: PendingAlliedComponent;
  let fixture: ComponentFixture<PendingAlliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingAlliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAlliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
