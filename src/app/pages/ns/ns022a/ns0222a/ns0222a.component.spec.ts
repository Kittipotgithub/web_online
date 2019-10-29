import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0222aComponent } from './ns0222a.component';

describe('Ns0222aComponent', () => {
  let component: Ns0222aComponent;
  let fixture: ComponentFixture<Ns0222aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0222aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0222aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
