import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns01Component } from './ns01.component';

describe('Ns01Component', () => {
  let component: Ns01Component;
  let fixture: ComponentFixture<Ns01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
