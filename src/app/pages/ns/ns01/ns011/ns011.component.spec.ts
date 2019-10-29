import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns011Component } from './ns011.component';

describe('Ns011Component', () => {
  let component: Ns011Component;
  let fixture: ComponentFixture<Ns011Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns011Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns011Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
