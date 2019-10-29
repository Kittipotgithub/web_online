import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';

//recieve data from parent
export interface DialogData {
  page: any;
  headerTable: [],
  typeTax: any,
}

@Component({
  selector: 'app-dialog-tax-deduction',
  templateUrl: './dialog-tax-deduction.component.html',
  styleUrls: ['./dialog-tax-deduction.component.scss']
})
export class DialogTaxDeductionComponent implements OnInit {
  dialogTaxForm: FormGroup;
  isLoading: boolean = false;
  typeTaxControl: FormControl; // ประเภท Tax
  valueTaxControl: FormControl; // จำนวน
  typeTax
  constructor(
    public dialogRef: MatDialogRef<DialogTaxDeductionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public constant: Constant,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createFormControl()
    this.createFormGroup();

    this.typeTax = this.data.typeTax
    if (this.typeTax != null) {
      this.setInputFormEditTax(this.typeTax)

    }

  }

  createFormControl() {
    this.typeTaxControl = this.formBuilder.control('ZVAT'); // ประเภท Tax
    this.valueTaxControl = this.formBuilder.control(''); // จำนวน
  }
  createFormGroup() {
    this.dialogTaxForm = this.formBuilder.group({
      typeTax: this.typeTaxControl,
      valueTax: this.valueTaxControl,
    })
  }
  setInputFormEditTax(data) {

    this.dialogTaxForm.patchValue({
      typeTax: data.typeTax,
      valueTax: data.valueTax
    })

  }
  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  onClickSave() {
    this.typeTax = null;
    const form = this.dialogTaxForm.value
    const tax = {
      typeTax: form.typeTax,
      valueTax: form.valueTax
    }

    if (tax.valueTax) {
      this.typeTax = tax;
    }
    else {
      this.typeTax = null;
    }


    this.dialogRef.close({
      event: 'save',
      typeTax: this.typeTax
    });
  }

}
