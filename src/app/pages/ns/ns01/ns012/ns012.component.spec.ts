import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns012Component } from './ns012.component';

describe('Ns012Component', () => {
  let component: Ns012Component;
  let fixture: ComponentFixture<Ns012Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns012Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
