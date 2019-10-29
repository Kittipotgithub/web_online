import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0223aComponent } from './ns0223a.component';

describe('Ns0223aComponent', () => {
  let component: Ns0223aComponent;
  let fixture: ComponentFixture<Ns0223aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0223aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0223aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
