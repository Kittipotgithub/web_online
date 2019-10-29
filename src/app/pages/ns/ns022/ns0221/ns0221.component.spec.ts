import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0221Component } from './ns0221.component';

describe('Ns0221Component', () => {
  let component: Ns0221Component;
  let fixture: ComponentFixture<Ns0221Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0221Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0221Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
