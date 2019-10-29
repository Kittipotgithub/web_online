import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0223Component } from './ns0223.component';

describe('Ns0223Component', () => {
  let component: Ns0223Component;
  let fixture: ComponentFixture<Ns0223Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0223Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0223Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
