import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0221aComponent } from './ns0221a.component';

describe('Ns0221aComponent', () => {
  let component: Ns0221aComponent;
  let fixture: ComponentFixture<Ns0221aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0221aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0221aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
