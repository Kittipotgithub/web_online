import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0213aComponent } from './ns0213a.component';

describe('Ns0213aComponent', () => {
  let component: Ns0213aComponent;
  let fixture: ComponentFixture<Ns0213aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0213aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0213aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
