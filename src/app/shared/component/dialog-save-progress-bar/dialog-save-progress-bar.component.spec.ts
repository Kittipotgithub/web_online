import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveProgressBarComponent } from './dialog-save-progress-bar.component';

describe('DialogSaveProgressBarComponent', () => {
  let component: DialogSaveProgressBarComponent;
  let fixture: ComponentFixture<DialogSaveProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaveProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaveProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
