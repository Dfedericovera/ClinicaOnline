import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAnAppointmentComponent } from './make-an-appointment.component';

describe('MakeAnAppointmentComponent', () => {
  let component: MakeAnAppointmentComponent;
  let fixture: ComponentFixture<MakeAnAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAnAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAnAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
