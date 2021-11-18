import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMedicalRecordComponent } from './form-medical-record.component';

describe('FormMedicalRecordComponent', () => {
  let component: FormMedicalRecordComponent;
  let fixture: ComponentFixture<FormMedicalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMedicalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
