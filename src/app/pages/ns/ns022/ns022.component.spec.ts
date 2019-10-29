import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns022Component } from './ns022.component';

describe('Ns022Component', () => {
  let component: Ns022Component;
  let fixture: ComponentFixture<Ns022Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns022Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
