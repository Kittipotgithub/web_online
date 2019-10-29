import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';

//recieve data from parent
export interface DialogData {
  page: any;
  xml_text: any;
}

@Component({
  selector: 'app-dialog-export-xml',
  templateUrl: './dialog-export-xml.component.html',
  styleUrls: ['./dialog-export-xml.component.scss']
})
export class DialogExportXmlComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogExportXmlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public constant: Constant,
  ) { }

  ngOnInit() {
    //mock up xal data 
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  copyToClipBoard() {
    console.log("copyToClipBoard")
  }

}
