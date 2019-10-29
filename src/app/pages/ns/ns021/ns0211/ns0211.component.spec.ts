import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0211Component } from './ns0211.component';

describe('Ns0211Component', () => {
  let component: Ns0211Component;
  let fixture: ComponentFixture<Ns0211Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0211Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0211Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
