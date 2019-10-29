import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveKbComponent } from './dialog-save-kb.component';

describe('DialogSaveKbComponent', () => {
  let component: DialogSaveKbComponent;
  let fixture: ComponentFixture<DialogSaveKbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaveKbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaveKbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
