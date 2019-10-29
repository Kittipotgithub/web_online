import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ns0212aComponent } from './ns0212a.component';

describe('Ns0212aComponent', () => {
  let component: Ns0212aComponent;
  let fixture: ComponentFixture<Ns0212aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ns0212aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ns0212aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
