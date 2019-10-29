import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns03Component } from './ns03.component';

describe('Ns03Component', () => {
  let component: Ns03Component;
  let fixture: ComponentFixture<Ns03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
