import { MasterService } from './../../../core/services/master/master.service';
import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';
import { Utils } from '@shared/utils';
import { UserProfile } from '@core/models/user-profile';
import { LocalStorageService } from '@core/services';

export interface DialogData {
  type: string;
  title: string;
  specialCase: {
    bankCode: '';
    vendorTaxId: '';
  };
}

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss']
})
export class DialogSearchComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  title = 'ค้นหา';
  errorMessage = '';
  dataSource = [];
  dataSourceHeader = [];
  searchType = '';
  isLoading = false;
  taxIDSellerNoList = [{ id: 1, name: 'Priyakorn', tax: '1002937465' }, { id: 2, name: 'Kittipot', tax: '1003857674' }];
  userProfile: UserProfile;
  constructor(
    public dialogRef: MatDialogRef<DialogSearchComponent>,
    public constant: Constant,
    private masterService: MasterService,
    private localStorageService: LocalStorageService,
    private utils: Utils,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = false;
  }

  ngOnInit() {
    this.userProfile = this.localStorageService.getUserProfile();
    if (this.data.type === 'centerCode') {
      this.loadCenterCode('');
    } else if (this.data.type === 'packageCode') {
      this.loadPackageCode('');
    }
    this.setTitle();
    this.searchType = this.data.type;
  }

  setTitle() {
    if (this.data.title !== undefined) {
      this.title = this.data.title;
    } else {
      if (this.data.type === 'typeAccountCode') {
        this.title = 'รหัสบัญชีแยกประเภท';
      } else if (this.data.type === 'centerCode') {
        this.title = 'รหัสศูนย์ต้นทุน';
      } else if (this.data.type === 'ownCenterCode') {
        this.title = 'รหัสศูนย์ต้นทุนรหัสศูนย์ต้นทุนเจ้าของรายได้';
      } else if (this.data.type === 'areaCode') {
        this.title = 'รหัสพื้นที่';
      } else if (this.data.type === 'sourceMoneyCode') {
        this.title = 'รหัสแหล่งของเงิน';
      } else if (this.data.type === 'sourceBudgetCode') {
        this.title = 'รหัสงบประมาณ';
      } else if (this.data.type === 'mainActivityCode') {
        this.title = 'รหัสกิจกรรมหลัก';
      } else if (this.data.type === 'subActivityCode') {
        this.title = 'รหัสกิจกรรมย่อย';
      } else if (this.data.type === 'subAccountCode') {
        this.title = 'รหัสบัญชีย่อย';
      } else if (this.data.type === 'accountDepositCode') {
        this.title = 'รหัสบัญชีเงินฝากคลัง';
      } else if (this.data.type === 'packageCode') {
        this.title = 'รหัสหมวดพัสดุ';
      } else if (this.data.type === 'gpscCode') {
        this.title = 'รหัส GPSC';
      } else if (this.data.type === 'vendorTaxId') {
        this.title = 'รหัสประจำตัวผู้เสียภาษี(ผู้ขาย)';
      } else if (this.data.type === 'vendorBankAccount') {
        this.title = 'เลขที่บัญชีเงินฝากธนาคาร';
      } else if (this.data.type === 'assetCode') {
        this.title = 'หมวดสินทรัพย์';
      } else if (this.data.type === 'unit') {
        this.title = 'หน่วย';
      } else if (this.data.type === 'incomeCode') {
        this.title = 'รหัสรายได้';
      }
      else if (this.data.type === 'bankBook') {
        this.title = 'Bank book';
      }

    }
  }

  search(e) {
    this.errorMessage = '';
    this.dataSource = [];
    if (this.data.type === 'typeAccountCode') {
      this.loadTypeAccountCode(e.value);
    } else if (this.data.type === 'centerCode') {
      this.loadCenterCode(e.value);

    } else if (this.data.type === 'ownCenterCode') {
      this.loadCenterCode(e.value);
    } else if (this.data.type === 'areaCode') {
      this.loadAreaCode(e.value);
    } else if (this.data.type === 'sourceMoneyCode') {
      this.loadSourceMoneyDataCode(e.value);
    } else if (this.data.type === 'sourceBudgetCode') {
      this.loadSourceBudgetCode(e.value);
    } else if (this.data.type === 'mainActivityCode') {
      this.loadMainActivityCode(e.value);
    } else if (this.data.type === 'subActivityCode') {
      this.loadSubActivityCode(e.value);
    } else if (this.data.type === 'subAccountCode') {
      this.loadSubAccountCode(e.value);
    } else if (this.data.type === 'packageCode') {
      this.loadPackageCode(e.value);
    } else if (this.data.type === 'branchNo') {
      this.loadBankBranch(e.value);
    } else if (this.data.type === 'accountDepositCode') {
      this.loadDepositAccount(e.value);
    } else if (this.data.type === 'gpscCode') {
      this.loadGPSCCode(e.value);
    } else if (this.data.type === 'vendorTaxId') {
      this.loadVendorTaxId(e.value);
    } else if (this.data.type === 'vendorBankAccount') {
      this.loadVendorBankAccount(e.value);
    } else if (this.data.type === 'assetCode') {
      this.loadAsset(e.value);
    } else if (this.data.type === 'unit') {
      this.loadUnit();
    } else if (this.data.type === 'incomeCode') {
      this.loadIncome(e.value);
    } else if (this.data.type === 'bankBook') {
      this.loadBankBook(e.value);
    }

  }

  onNoClick(): void {
    this.errorMessage = '';
    this.dialogRef.close({
      event: false,
      type: this.data.type,
      value: ''
    });
  }

  loadDepositAccount(textSearch) {
    this.isLoading = true;
    this.errorMessage = '';
    this.masterService
      .findDepositAccountWithParam(this.userProfile.userdata.departmentCode, this.userProfile.userdata.areaCode, textSearch)
      .subscribe(data => {
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.depositAccount;
        } else {
          this.errorMessage = response.message;
        }
      });
  }

  loadTypeAccountCode(textSearch) {
    if (textSearch === '' || textSearch === undefined) {
      this.errorMessage = '* กรุณาระบุเงื่อนไข';
      return false;
    } else {
      this.errorMessage = '';
      this.isLoading = true;
      this.masterService.findTypeAccountWithParam(textSearch).subscribe(data => {
        this.isLoading = false;
        const response = data as any;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.typeAccountCode;
        } else {
          this.errorMessage = response.message;
        }
      });
    }
  }

  loadCenterCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findCostCenterWithParam(this.userProfile.userdata.departmentCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.centerCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadAreaCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findAreaCodeWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.areaCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadSourceMoneyDataCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findSourceMoneyWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.sourceMoneyCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadSourceBudgetCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findBudgetCodeWithParam(this.userProfile.userdata.departmentCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.sourceBudgetCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadMainActivityCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findBudgetAcitivityWithParam(this.userProfile.userdata.departmentCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.mainActivityCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadSubActivityCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findSubActivityWithParam(this.userProfile.userdata.departmentCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.subActivityCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadSubAccountCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findSubAccountWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.subAccountCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadPackageCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findProductCategoryWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.packageCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadGPSCCode(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findGPSCWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.gpscCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadVendorTaxId(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findVendorWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.vendorTaxId;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadVendorBankAccount(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findVendorBankAccountWithParam(this.data.specialCase.vendorTaxId, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.vendorBankAccount;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadAsset(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findAssetWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.assetCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadUnit() {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findAllUOM().subscribe(data => {
      this.isLoading = false;
      const response = data as any;
      // if (response.status === 'T') {
      this.dataSource = response;
      this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.unit;
      // } else {
      //   this.errorMessage = response.message;
      // }
    });
  }
  loadIncome(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findIncomeWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.incomeCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }
  loadBankBook(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findbankBookWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.bankBook;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  // TODO ต่างกันตรงไหนบอกที
  loadBankBranch(textSearch) {
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findAllBankBranchByBankCode(this.data.specialCase.bankCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.bankBranch;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  chooseDataSearch(value, name, optional) {
    this.errorMessage = '';
    this.dialogRef.close({
      event: true,
      type: this.data.type,
      value,
      name,
      optional
    });
  }
}
