import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0222Component } from './ns0222.component';

describe('Ns0222Component', () => {
  let component: Ns0222Component;
  let fixture: ComponentFixture<Ns0222Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0222Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0222Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
