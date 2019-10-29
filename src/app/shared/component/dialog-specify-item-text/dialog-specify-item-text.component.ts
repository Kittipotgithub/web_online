import { Utils } from '@shared/utils';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

export interface DialogData {
  itemText: [];
}
@Component({
  selector: 'app-dialog-specify-item-text',
  templateUrl: './dialog-specify-item-text.component.html',
  styleUrls: ['./dialog-specify-item-text.component.scss']
})
export class DialogSpecifyItemTextComponent implements OnInit {
  dialogSpecifyItem: FormGroup;
  typeTextControl: FormControl; // ประเภทข้อความ
  additionalTextControl: FormControl; // ข้อความเพิ่มเติม
  isLoading: boolean = false;
  documentNo = 1; // เลขลำดับ
  listDocument = [];
  isBtnDelete = true; // เช็คปุ่มdelete
  listValidate = [];
  selectListOrder = null; // เลือกหน้ารายการบัญชีที่เลือกจากตาราง
  listItemText = [];
  constructor(
    public dialogRef: MatDialogRef<DialogSpecifyItemTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public constant: Constant,
    private formBuilder: FormBuilder,
    private utils:Utils
  ) { }

  ngOnInit() {
    this.createFormControl()
    this.createFormGroup();
    this.listItemText = this.data.itemText
    if (this.listItemText.length > 0) {
      this.setInputFormEdit(this.listItemText)

    }


  }

  createFormControl() {
    this.typeTextControl = this.formBuilder.control('F01'); // ประเภทข้อความ
    this.additionalTextControl = this.formBuilder.control(''); // ข้อความเพิ่มเติม

  }
  createFormGroup() {
    this.dialogSpecifyItem = this.formBuilder.group({
      typeText: this.typeTextControl,
      additionalText: this.additionalTextControl

    })
  }
  setInputFormEdit(items) {
    const item = items[0];

    this.dialogSpecifyItem.patchValue({
      typeText: item.typeText,
      additionalText: item.additionalText
    })

    this.listDocument = [];
    items.forEach(item => {
      const data = {
        typeText: item.typeText,
        additionalText: item.additionalText
      }
      this.listDocument.push(data)
    });

  }
  addKeyValidate(value) {
    const keyValidate = new Map();
    keyValidate.set('additionalText', value.additionalText);


    return keyValidate;
  }
  keepOrder(value) {
    const map = this.addKeyValidate(value);
    console.log(map)
    this.listValidate = [];
    this.utils.checkValidateRequired(map,this.listValidate)
   
   
    if (this.listValidate.length <= 0) {
      console.log(this.documentNo)
      console.log(this.listDocument.length)
      if (this.documentNo > this.listDocument.length) {
        console.log('save')
        this.saveIntoList(value);
      }
      else {
        console.log('edit')
        this.editIntoList(value);
      }
    }
    this.selectListOrder = null;
  }
  selectDocument(item, i) {
    console.log(i)
    this.selectListOrder = i + 1;
    this.documentNo = i + 1;
    this.isBtnDelete = false;
    this.setInputFormSelect(item)
    console.log(this.documentNo)

  }
  editIntoList(value) {
    this.listDocument[this.documentNo - 1] = value;
    this.documentNo = this.listDocument.length + 1;
    this.isBtnDelete = true;
    this.clearInput();
  }

  saveIntoList(value) {
    this.listDocument.push(value);
    this.documentNo = this.listDocument.length + 1;
    this.isBtnDelete = true;
    this.clearInput();
  }
  deleteOrder() {
    this.listDocument.splice(this.documentNo - 1, 1);
    this.documentNo = this.listDocument.length + 1;
    this.isBtnDelete = true;

  }
  clearInput() {
    this.dialogSpecifyItem.patchValue({
      typeText: 'F01',
      additionalText: ''
    })
  }
  setInputFormSelect(item) {
    this.dialogSpecifyItem.patchValue({
      typeText: item.typeText,
      additionalText: item.additionalText
    })
  }



  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  onClickSave() {

    this.dialogRef.close({
      event: 'save',
      listItemText: this.listDocument
    });
  }

}
