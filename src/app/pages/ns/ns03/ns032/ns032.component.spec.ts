import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns032Component } from './ns032.component';

describe('Ns032Component', () => {
  let component: Ns032Component;
  let fixture: ComponentFixture<Ns032Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns032Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns032Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
