import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0211aComponent } from './ns0211a.component';

describe('Ns0211aComponent', () => {
  let component: Ns0211aComponent;
  let fixture: ComponentFixture<Ns0211aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0211aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0211aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
