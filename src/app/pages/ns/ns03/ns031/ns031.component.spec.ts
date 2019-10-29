import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns031Component } from './ns031.component';

describe('Ns031Component', () => {
  let component: Ns031Component;
  let fixture: ComponentFixture<Ns031Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns031Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns031Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
