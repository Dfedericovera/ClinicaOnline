import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAdministratorComponent } from './signup-administrator.component';

describe('SignupAdministratorComponent', () => {
  let component: SignupAdministratorComponent;
  let fixture: ComponentFixture<SignupAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
