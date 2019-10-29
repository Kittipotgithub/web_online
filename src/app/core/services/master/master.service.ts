import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { FiDocument } from '@core/models/fi-document';
import { FiDocumentDetail } from '@core/models/fi-document-detail';
import { FiPayment } from '@core/models/fi-payment';
import { UserProfile } from '@core/models/user-profile';
import { LocalStorageService } from '..';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private apiService: ApiService) {}

  // รหัสบัญชีแยกประเภท type Account code
  findTypeAccountWithParam(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/typeAccount/getByValue/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสบัญชีย่อย  getAllCASubAccount
  findSubAccountWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/subAccount/getAll';
    } else {
      url = '/master/subAccount/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(result => {
        return result;
      })
    );
  }

  // รหัสสาขา
  findAllBank() {
    return this.apiService.get('/master/bank/getAll').pipe(
      map(data => {
        // check service not return status code
        return data.data;
      })
    );
  }

  // // รหัสสาขา (รหัสธนาคาร)
  // findAllBankBranch() {
  //   return this.apiService.get('/master/bankBranch/getAll').pipe(
  //     map(data => {
  //       // check service not return status code
  //       return data;
  //     })
  //   );
  // }

  // รหัสสาขา (รหัสธนาคาร) all
  findAllBankBranchByBankCode(bankCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/bankBranch/getByBank/' + bankCode;
    } else {
      url = '/master/bankBranch/getByBankAndValue/' + bankCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(result => {
        return result;
      })
    );
  }

  // จังหวัด
  findAllProvince() {
    const result = {
      data: {},
      errors: []
    };
    return this.apiService.get('/master/getAllProvince').pipe(
      map(data => {
        return data.data;
      })
    );
  }

  // ประเทศ
  findAllCountry() {
    const result = {
      data: {},
      errors: []
    };
    return this.apiService.get('/master/getAllCountry').pipe(
      map(data => {
        return data.data;
      })
    );
  }

  // หน่วยสินค้า
  findAllUOM() {
    const result = {
      data: {},
      errors: []
    };
    return this.apiService.get('/master/getAllUOM').pipe(
      map(data => {
        return data.data;
      })
    );
  }

  // รหัส วิธีการจัดซื้อจัดจ้าง
  findAllProcureMethod() {
    return this.apiService.get('/master/procureMethod/getAll').pipe(
      map(data => {
        console.log(data);
        return data.data;
      })
    );
  }

  // รหัสศูนย์ต้นทุน
  findCostCenterWithParam(compCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/costCenter/getAll/' + compCode;
    } else {
      url = '/master/costCenter/getByValue/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // รหัสศูนย์ต้นทุน
  findAreaCodeWithParam(textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/disbursement/getAll';
    } else {
      url = '/master/disbursement/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสแหล่งของเงิน
  findSourceMoneyWithParam(textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/fundSource/getAll';
    } else {
      url = '/master/fundSource/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสงบประมาณ
  findBudgetCodeWithParam(compCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/budgetCode/getAll/' + compCode;
    } else {
      url = '/master/budgetCode/getByValue/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสกิจกรรมหลัก
  findBudgetAcitivityWithParam(compCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/mainActivity/getAll/' + compCode;
    } else {
      url = '/master/mainActivity/getByValue/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสกิจกรรมย่อย
  findSubActivityWithParam(compCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/subActivity/getAll/' + compCode;
    } else {
      url = '/master/subActivity/getByValue/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสบัญชีเงินฝากคลัง
  findDepositAccountWithParam(compCode, areaCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/depositAccount/getAll/' + compCode + '/' + areaCode;
    } else {
      url = '/master/depositAccount/getByValue/' + compCode + '/' + areaCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสพัสดุ
  findProductCategoryWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/productCategory/getAll';
    } else {
      url = '/master/productCategory/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสเลขภาษีผู้ขาย
  findVendorWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/vendor/getAll';
    } else {
      url = '/master/vendor/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // เลขบัญชีผู้ขาย
  findVendorBankAccountWithParam(vendorTaxId, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/vendorBank/getByTaxId/' + vendorTaxId;
    } else {
      url = '/master/vendorBank/getByTaxAndValue/' + vendorTaxId + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัส gpsc
  findGPSCWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/gpsc/getAll';
    } else {
      url = '/master/gpsc/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }

  // รหัส Asset
  findAssetWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/asset/getAll';
    } else {
      url = '/master/asset/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
    // รหัส Income
    findIncomeWithParam(textSearch): Observable<FiPayment> {
      let url = '';
      if (textSearch === '') {
        url = '/master/income/getAll';
      } else {
        url = '/master/income/getByValue/' + textSearch;
      }
      return this.apiService.get(url).pipe(
        map(data => {
          console.log(data);
          return data;
        })
      );
    }
      // รหัส bank book
      findbankBookWithParam(textSearch): Observable<FiPayment> {
        let url = '';
        if (textSearch === '') {
          url = '/master/getAllCABankBook';
        } else {
          url = '/master/getAllCABankBook/' + textSearch;
        }
        return this.apiService.get(url).pipe(
          map(data => {
            console.log(data);
            return data;
          })
        );
      }
  

  // - - - - - - - - - - - -  Find one - - - - - - - - - - - - //

  // รหัสสาขา (รหัสธนาคาร) by text search
  findOneRountingNo(textSearch) {
    return this.apiService.get('/master/bankBranch/getOne/' + textSearch).pipe(
      map(result => {
        return result;
      })
    );
  }

  findOneDataTypeAccount(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/typeAccount/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataCenter(areaCode, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/costCenter/getOne/' + areaCode + '/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSourceMoney(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/fundSource/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSourceBudget(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/budgetCode/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataMainActivity(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/mainActivity/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSubActivity(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/subActivity/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSubAccount(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/subAccount/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataDepositAccount(compCode, areaCode, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/depositAccount/getOne/' + compCode + '/' + areaCode + '/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataPackage(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/productCategory/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataVendor(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/vendor/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataVendorBankAccount(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/vendorBank/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataGPSC(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/gpsc/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataAssetAcct(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/assetAcct/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneAssetGroup(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/asset/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
  findOneIncome(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/income/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
}
