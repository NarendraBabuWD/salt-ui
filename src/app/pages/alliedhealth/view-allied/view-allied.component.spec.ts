import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAlliedComponent } from './view-allied.component';

describe('ViewAlliedComponent', () => {
  let component: ViewAlliedComponent;
  let fixture: ComponentFixture<ViewAlliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAlliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAlliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
