import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns022aComponent } from './ns022a.component';

describe('Ns022aComponent', () => {
  let component: Ns022aComponent;
  let fixture: ComponentFixture<Ns022aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns022aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns022aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
