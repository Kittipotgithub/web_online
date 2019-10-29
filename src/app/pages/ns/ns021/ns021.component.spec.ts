import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns021Component } from './ns021.component';

describe('Ns021Component', () => {
  let component: Ns021Component;
  let fixture: ComponentFixture<Ns021Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns021Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
