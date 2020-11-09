import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlliedHealthDashboardComponent } from './allied-health-dashboard.component';

describe('AlliedHealthDashboardComponent', () => {
  let component: AlliedHealthDashboardComponent;
  let fixture: ComponentFixture<AlliedHealthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlliedHealthDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlliedHealthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
