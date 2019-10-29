import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0213Component } from './ns0213.component';

describe('Ns0213Component', () => {
  let component: Ns0213Component;
  let fixture: ComponentFixture<Ns0213Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0213Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0213Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
