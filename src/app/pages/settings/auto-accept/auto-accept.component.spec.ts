import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAcceptComponent } from './auto-accept.component';

describe('AutoAcceptComponent', () => {
  let component: AutoAcceptComponent;
  let fixture: ComponentFixture<AutoAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
