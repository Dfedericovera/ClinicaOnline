import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAppointmentComponent } from './signup-appointment.component';

describe('SignupAppointmentComponent', () => {
  let component: SignupAppointmentComponent;
  let fixture: ComponentFixture<SignupAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
