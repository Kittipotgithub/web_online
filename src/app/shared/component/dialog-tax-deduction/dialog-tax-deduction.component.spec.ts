import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaxDeductionComponent } from './dialog-tax-deduction.component';

describe('DialogTaxDeductionComponent', () => {
  let component: DialogTaxDeductionComponent;
  let fixture: ComponentFixture<DialogTaxDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTaxDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaxDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
