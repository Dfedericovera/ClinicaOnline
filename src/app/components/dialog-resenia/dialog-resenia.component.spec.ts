import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReseniaComponent } from './dialog-resenia.component';

describe('DialogReseniaComponent', () => {
  let component: DialogReseniaComponent;
  let fixture: ComponentFixture<DialogReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
