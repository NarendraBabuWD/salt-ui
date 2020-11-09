import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlliedComponent } from './add-allied.component';

describe('AddAlliedComponent', () => {
  let component: AddAlliedComponent;
  let fixture: ComponentFixture<AddAlliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
