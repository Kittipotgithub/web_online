import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateFiBody } from '@core/models/create-fi-body';
import { CreateFiHead } from '@core/models/create-fi-head';
import { CreateFiTail } from '@core/models/create-fi-tail';
import { FiService } from '@core/services/fi/fi.service';
import { Constant } from '@shared/constant';
import { WebInfo } from '@core/models/web-info';
import { LocalStorageService } from '@core/services';
import { DialogExportXmlComponent } from '../dialog-export-xml/dialog-export-xml.component';

export interface DialogData {
  page: any;
  head: CreateFiHead;
  item: CreateFiBody[];
  headerTable: [];
}
@Component({
  selector: 'app-dialog-save-progress-bar',
  templateUrl: './dialog-save-progress-bar.component.html',
  styleUrls: ['./dialog-save-progress-bar.component.scss']
})
export class DialogSaveProgressBarComponent implements OnInit {
  listResultPresave = [];
  resultSave = null;

  isPresaveSuccess = true;
  isSaveSuccess = false;
  allPage: any;
  pathPage: string;
  createPage: string;
  searchPage: string;
  backListPage: string;
  editPage: string;
  webInfo: WebInfo;
  xml: string;
  isLoading: boolean = false;
  isProgressBarDisplay: boolean = false;
  progressValue: number = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogSaveProgressBarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private createFiService: FiService,

    public constant: Constant,
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.allPage = this.data.page;
    this.findPage();
    this.save(0, this.data.head, this.data.item);
    setTimeout(function(){ 
    }, 3000);
  }

  ngAfterViewInit(): void {
    
  }

  // startTimer(seconds: number) {
  //   const time = seconds;
  //   const timer$ = interval(1000);

  //   const sub = timer$.subscribe((sec) => {
  //     this.progressbarValue = 100 - sec * 100 / seconds;
  //     this.curSec = sec;

  //     if (this.curSec === seconds) {
  //       sub.unsubscribe();
  //     }
  //   });
  // }

  findPage() {
    if (this.allPage.size > 0) {
      for (const [key, value] of this.allPage) {
        if (key === 'path') {
          this.pathPage = value;
        } else if (key === 'create') {
          this.createPage = value;
        } else if (key === 'search') {
          this.searchPage = value;
        } else if (key === 'backList') {
          this.backListPage = value;
        } else if (key === 'edit') {
          this.editPage = value;
        }
      }
    }
  }

  startTimer() {
    if(this.progressValue <= 90) {
      setInterval(() => {
        this.progressValue = this.progressValue + 10
      }, 1000);
    }
  }

  save(flag: number, head: {}, items: {}) {
    if(flag === 1) {
      this.startTimer()
    }
    this.isLoading = true;
    const itemsAll = {
      header: this.data.head,
      items: this.data.item,
      webInfo: this.localStorageService.getWebInfo()
    };
    this.createFiService.create(itemsAll).subscribe(result => {
      this.listResultPresave = [];
      const resultMessages = result.data.messages;
      if (flag === 0) {
        if (result.status === 'F') {
          if (resultMessages.length > 0) {
            this.listResultPresave = resultMessages;
            this.isPresaveSuccess = false;
            this.isSaveSuccess = false;
          }
        } else {
          this.isPresaveSuccess = true;
          this.isSaveSuccess = false;
          this.listResultPresave = resultMessages;
        }
        this.xml = result.xml;
      } else if (flag === 1) {
        if (result.status === 'F') {
          if (resultMessages.length > 0) {
            this.listResultPresave = resultMessages;
            this.isPresaveSuccess = false;
            this.isSaveSuccess = false;
          }
        } else {
          this.isPresaveSuccess = false;
          this.isSaveSuccess = true;
          this.resultSave = {
            accDocNo: result.data.accDocNo,
            compCode: result.data.compCode,
            fiscYear: result.data.fiscYear
          };
          this.progressValue = 100
        }
        this.xml = result.xml;
      }
      this.isLoading = false;
      return result;
    });
  }

  onClickExportXML() {
    // may be receieve xml data from service
    const dialogRef = this.dialog.open(DialogExportXmlComponent, {
      width: '70vw',
      data: {
        page: this.data.page,
        xml_text: this.xml
      }
    });

    dialogRef.afterClosed().subscribe(result => { });
    // this.dialogRef.close({ event: 'cancle' });
  }

  onConfirmSave() {
    this.data.head.flag = 1;
    this.isProgressBarDisplay = true;
    this.save(1, this.data.head, this.data.item);
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  onEditDocument(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  onCreateNewDocument(): void {
    this.router.navigate([this.pathPage + '/' + this.createPage]);
    this.dialogRef.close();
  }

  onDisplayDocument() {
    if (this.isSaveSuccess) {
      this.router.navigate([this.pathPage + '/' + this.createPage], {
        queryParams: { docNo: this.resultSave.accDocNo, docYear: this.resultSave.fiscYear }
      });
      this.dialogRef.close({ event: 'search' });
    }
  }

  onSearchPage(): void {
    this.router.navigate([this.pathPage + '/' + this.searchPage]);
    this.dialogRef.close();
  }
 
  printReport(type) {
    const payload = {
      compCode: this.resultSave.compCode,
      docNo: this.resultSave.accDocNo,
      fiscYear: this.resultSave.fiscYear,
      formId: this.data.head.formId,
      format: type
    };
    // this.reportService.reportLog(payload);
  }
}
