import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSpecifyItemTextComponent } from './dialog-specify-item-text.component';

describe('DialogSpecifyItemTextComponent', () => {
  let component: DialogSpecifyItemTextComponent;
  let fixture: ComponentFixture<DialogSpecifyItemTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSpecifyItemTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSpecifyItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
