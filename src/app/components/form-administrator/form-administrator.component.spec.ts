import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdministratorComponent } from './form-administrator.component';

describe('FormAdministratorComponent', () => {
  let component: FormAdministratorComponent;
  let fixture: ComponentFixture<FormAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
