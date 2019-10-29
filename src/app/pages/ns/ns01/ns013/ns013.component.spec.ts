import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns013Component } from './ns013.component';

describe('Ns013Component', () => {
  let component: Ns013Component;
  let fixture: ComponentFixture<Ns013Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns013Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns013Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
