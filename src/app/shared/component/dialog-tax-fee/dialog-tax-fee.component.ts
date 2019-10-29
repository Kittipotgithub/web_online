import { Utils } from '@shared/utils';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

export interface DialogData {
  page: any;
  headerTable: [],
  taxFee: any,
  type:any
}

@Component({
  selector: 'app-dialog-tax-fee',
  templateUrl: './dialog-tax-fee.component.html',
  styleUrls: ['./dialog-tax-fee.component.scss']
})
export class DialogTaxFeeComponent implements OnInit {
  dialogTaxFeeForm: FormGroup;
  isLoading: boolean = false;
  typeTaxControl: FormControl; // ประเภท Tax
  taxBaseCaculateControl: FormControl; // ฐานการคำนวณ Tax
  valueTaxControl: FormControl; // จำนวน
  typeFeeControl: FormControl; // ประเภท ค่าปรับ
  feeBaseCaculateControl: FormControl; // ฐานการคำนวณ ค่าปรับ
  valueFeeControl: FormControl; // จำนวน ค่าปรับ

  taxFee
  constructor(
    public dialogRef: MatDialogRef<DialogTaxFeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public constant: Constant,
    private formBuilder: FormBuilder,
    private utils: Utils
  ) { }

  ngOnInit() {
    this.createFormControl()
    this.createFormGroup();

    console.log(this.data)
    this.taxFee = this.data.taxFee
    console.log(this.taxFee)
    if (this.taxFee != null) {
      this.setInputFormEditTax(this.taxFee)

    }

  }

  createFormControl() {
    this.typeTaxControl = this.formBuilder.control(''); // ประเภท Tax
    this.taxBaseCaculateControl = this.formBuilder.control(''); // ฐานการคำนวณ Tax
    this.valueTaxControl = this.formBuilder.control(''); // จำนวน
    this.typeFeeControl = this.formBuilder.control('');// ประเภท ค่าปรับ
    this.feeBaseCaculateControl = this.formBuilder.control(''); // ฐานการคำนวณ ค่าปรับ
    this.valueFeeControl = this.formBuilder.control(''); // จำนวน ค่าปรับ
  }
  createFormGroup() {
    this.dialogTaxFeeForm = this.formBuilder.group({
      typeTax: this.typeTaxControl, // ประเภท Tax
      taxBaseCaculate: this.taxBaseCaculateControl,// ฐานการคำนวณ Tax
      valueTax: this.valueTaxControl,// จำนวน
      typeFee: this.typeFeeControl, // ประเภท ค่าปรับ
      feeBaseCaculate: this.feeBaseCaculateControl, // ฐานการคำนวณ ค่าปรับ
      valueFee: this.valueFeeControl,// จำนวน ค่าปรับ
    })
  }
  setInputFormEditTax(data) {
    if (data.typeTax === '11') {
      data.codeTax = 'A2'
    }
    else if (data.typeTax === '10') {
      data.codeTax = 'A1'
    }
    if (data.typeFee === '01') {
      data.codeFee = 'B1'
    }
    else if (data.typeFee === '02') {
      data.codeFee = 'B2'
    }
    this.dialogTaxFeeForm.patchValue({
      typeTax: data.typeTax, // ประเภท Tax
      taxBaseCaculate: data.taxBaseCaculate,// ฐานการคำนวณ Tax
      valueTax: data.valueTax,// จำนวน
      typeFee: data.typeFee, // ประเภท ค่าปรับ
      feeBaseCaculate: data.feeBaseCaculate, // ฐานการคำนวณ ค่าปรับ
      valueFee: data.valueFee,// จำนวน ค่าปรับ
    })

  }
  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  onClickSave() {
    this.taxFee = null;
    const form = this.dialogTaxFeeForm.value
    const tax = {
      codeTax: '', // code Tax
      typeTax: form.typeTax, // ประเภท Tax
      taxBaseCaculate: form.taxBaseCaculate,// ฐานการคำนวณ Tax
      valueTax: form.valueTax,// จำนวน
      codeFee: '', // code Fee
      typeFee: form.typeFee, // ประเภท ค่าปรับ
      feeBaseCaculate: form.feeBaseCaculate, // ฐานการคำนวณ ค่าปรับ
      valueFee: form.valueFee,// จำนวน ค่าปรับ
    }
    if (tax.typeTax === '11') {
      tax.codeTax = 'A2'
    }
    else if (tax.typeTax === '10') {
      tax.codeTax = 'A1'
    }
    if (tax.typeFee === '01') {
      tax.codeFee = 'B1'
    }
    else if (tax.typeFee === '02') {
      tax.codeFee = 'B2'
    }

    if (tax.valueTax) {
      this.taxFee = tax;
    }
    else {
      this.taxFee = null;
    }

    console.log(this.taxFee)
    this.dialogRef.close({
      event: 'save',
      taxFee: this.taxFee
    });
  }

}
