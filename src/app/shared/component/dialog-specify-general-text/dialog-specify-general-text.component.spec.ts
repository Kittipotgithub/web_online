import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSpecifyGeneralTextComponent } from './dialog-specify-general-text.component';

describe('DialogSpecifyGeneralTextComponent', () => {
  let component: DialogSpecifyGeneralTextComponent;
  let fixture: ComponentFixture<DialogSpecifyGeneralTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSpecifyGeneralTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSpecifyGeneralTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
