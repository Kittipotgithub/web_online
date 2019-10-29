import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0212Component } from './ns0212.component';

describe('Ns0212Component', () => {
  let component: Ns0212Component;
  let fixture: ComponentFixture<Ns0212Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0212Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0212Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
