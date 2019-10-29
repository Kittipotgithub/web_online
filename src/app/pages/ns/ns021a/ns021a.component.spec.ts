import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns021aComponent } from './ns021a.component';

describe('Ns021aComponent', () => {
  let component: Ns021aComponent;
  let fixture: ComponentFixture<Ns021aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns021aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns021aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
