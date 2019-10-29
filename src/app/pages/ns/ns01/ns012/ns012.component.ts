import { Component, OnInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Utils } from '@shared/utils';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FiDocument } from '@core/models/fi-document';
import { SearchFiHead } from '@core/models/search-fi-header';
import { Router } from '@angular/router';
import { FiService } from '@core/services/fi/fi.service';
import { WebInfoService } from '@core/services/web-info.service';
import { LocalStorageService } from '@core/services';
import { UserProfile } from '@core/models/user-profile';
import { WebInfo } from '@core/models/web-info';
import { DatepickerHeaderComponent } from '@shared/component/datepicker-header/datepicker-header.component'
@Component({
  selector: 'app-ns012',
  templateUrl: './ns012.component.html',
  styleUrls: ['./ns012.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]

})
export class Ns012Component implements OnInit {
  ns012FormSearch: FormGroup;

  withdrawalRequestTypeControl: FormControl; //ใบขอเบิกเงินจากระบบ
  docNoFromControl: FormControl; // เลขที่ใบขอเบิกเงิน เริ่ม
  docNoToControl: FormControl; // เลขที่ใบขอเบิกเงิน ถึง
  yearBudgetControl: FormControl; // ปีงบประมาณ

  searchTypeControl: FormControl;
  conditionFromControl: FormControl; // วันที่
  conditionToControl: FormControl; // วันที่
  refDocNoFromControl: FormControl; // เอกสารอ้างอิง
  refDocNoToControl: FormControl; // เอกสารอ้างอิง
  docTypeFromControl: FormControl; // ประเภทการจัดเก็บรายได้
  docTypeToControl: FormControl; // ประเภทการจัดเก็บรายได้
  centerCodeFromControl: FormControl; // รหัสศูนย์ต้นทุนผู้จัดเก็บ
  centerCodeToControl: FormControl; // รหัสศูนย์ต้นทุนผู้จัดเก็บ
  ownCenterCodeFromControl: FormControl; // รหัสศูนย์ต้นทุนเจ้าของรายได้
  ownCenterCodeToControl: FormControl; // รหัสศูนย์ต้นทุนเจ้าของรายได้

  isLoading = true;
  listDocument: FiDocument[] = [];
  listValidate: [];
  listMessageResponse = [];
  p = 1;
  userProfile: UserProfile;
  private webInfo: WebInfo;
  public datePickerHeader = DatepickerHeaderComponent;
  constructor(

    public constant: Constant,
    private formBuilder: FormBuilder,
    private utils: Utils,
    private fiService: FiService,
    private router: Router,
    private webInfoService: WebInfoService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.createFormControl();
    this.createFormGroup();
    this.isLoading = false;
  }
  createFormControl() {
    // normal
    this.withdrawalRequestTypeControl = this.formBuilder.control('web');
    this.docNoFromControl = this.formBuilder.control('');
    this.docNoToControl = this.formBuilder.control('');
    this.yearBudgetControl = this.formBuilder.control(this.utils.fisc_year);

    // codition
    this.searchTypeControl = this.formBuilder.control('1');
    this.conditionFromControl = this.formBuilder.control(new Date());
    this.conditionToControl = this.formBuilder.control(new Date());
    this.refDocNoFromControl = this.formBuilder.control('');
    this.refDocNoToControl = this.formBuilder.control('');


    this.docTypeFromControl = this.formBuilder.control(''); // ประเภทการจัดเก็บรายได้
    this.docTypeToControl = this.formBuilder.control(''); // ประเภทการจัดเก็บรายได้
    this.centerCodeFromControl = this.formBuilder.control(''); // รหัสศูนย์ต้นทุนผู้จัดเก็บ
    this.centerCodeToControl = this.formBuilder.control(''); // รหัสศูนย์ต้นทุนผู้จัดเก็บ
    this.ownCenterCodeFromControl = this.formBuilder.control(''); // รหัสศูนย์ต้นทุนเจ้าของรายได้
    this.ownCenterCodeToControl = this.formBuilder.control(''); // รหัสศูนย์ต้นทุนเจ้าของรายได้

  }
  createFormGroup() {
    this.ns012FormSearch = this.formBuilder.group({
      withdrawalRequestType: this.withdrawalRequestTypeControl,
      docNoFrom: this.docNoFromControl,
      docNoTo: this.docNoToControl,
      yearBudget: this.yearBudgetControl,

      searchType: this.searchTypeControl,
      conditionFrom: this.conditionFromControl,
      conditionTo: this.conditionToControl,

      refDocNoFrom: this.refDocNoFromControl,
      refDocNoTo: this.refDocNoToControl,

      docTypeFrom: this.docTypeFromControl, // ประเภทการจัดเก็บรายได้
      docTypeTo: this.docTypeToControl,// ประเภทการจัดเก็บรายได้
      centerCodeFrom: this.centerCodeFromControl, // รหัสศูนย์ต้นทุนผู้จัดเก็บ
      centerCodeTo: this.centerCodeToControl,// รหัสศูนย์ต้นทุนผู้จัดเก็บ
      ownCenterCodeFrom: this.ownCenterCodeFromControl, // รหัสศูนย์ต้นทุนเจ้าของรายได้
      ownCenterCodeTo: this.ownCenterCodeToControl, // รหัสศูนย์ต้นทุนเจ้าของรายได้

    });
  }

  onSearch(type) {
    const form = this.ns012FormSearch.value;
    this.checkValidateDocNo(form, type);
    this.listMessageResponse = [];
    // set search params
    const searchFi: SearchFiHead = {
      accDocNoFrom: '',
      accDocNoTo: '',
      createdFrom: '',
      createdTo: '',
      dateDocFrom: '',
      dateDocTo: '',
      datePostFrom: '',
      datePostTo: '',
      docTypeTo: '',
      docTypeFrom: '',
      fiscYear: this.utils.convertYearToAD(form.yearBudget),
      formId: this.constant.FORM_ID_NS.ns01,
      period: 1,
      refDocNoFrom: '',
      refDocNoTo: '',
      vendorTaxId: '',
      webInfo: this.webInfo
    };
    if (type === 'normal') {
      searchFi.accDocNoFrom = form.docNoFrom;
      searchFi.accDocNoTo = form.docNoTo;
      searchFi.fiscYear = this.utils.convertYearToAD(form.yearBudget);
    } else if (type === 'condition') {
      const dayFrom = form.conditionFrom.getDate();
      const monthFrom = form.conditionFrom.getMonth() + 1;
      const yearFrom = form.conditionFrom.getFullYear();
      const dayTo = form.conditionTo.getDate();
      const monthTo = form.conditionTo.getMonth() + 1;
      const yearTo = form.conditionTo.getFullYear();
      if (form.searchType === '1') {
        // วันที่บันทึกรายการ
        searchFi.createdFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        searchFi.createdTo = this.utils.parseDate(dayTo, monthTo, yearTo);
        searchFi.datePostFrom = '';
        searchFi.datePostTo = '';
        searchFi.dateDocFrom = '';
        searchFi.dateDocTo = '';
      } else if (form.searchType === '2') {
        // วันที่ผ่านรายการ
        searchFi.datePostFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        searchFi.datePostTo = this.utils.parseDate(dayTo, monthTo, yearTo);
        searchFi.createdFrom = '';
        searchFi.createdTo = '';
        searchFi.dateDocFrom = '';
        searchFi.dateDocTo = '';
      } else if (form.searchType === '3') {
        // วันที่เอกสาร
        searchFi.dateDocFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        searchFi.dateDocTo = this.utils.parseDate(dayTo, monthTo, yearTo);
        searchFi.createdFrom = '';
        searchFi.createdTo = '';
        searchFi.datePostFrom = '';
        searchFi.datePostTo = '';
      }
      searchFi.docTypeFrom = form.docTypeFrom;
      searchFi.docTypeTo = form.docTypeTo;
      searchFi.refDocNoFrom = form.refDocNoFrom;
      searchFi.refDocNoTo = form.refDocNoTo;
    
    }

    if (this.listValidate.length <= 0) {
      console.log(searchFi);
      this.search(searchFi);
    }
  }
  checkValidateDocNo(form, type) {
    this.listValidate = [];
    if (type === 'normal') {
      const keyValidate = new Map();
      if (!form.docNoFrom) {
        keyValidate.set('docNoFrom', form.docNoFrom);
      }
      this.utils.checkValidateSearchBCNormalRequired(keyValidate, this.listValidate);
    } else if (type === 'condition') {
    }
  }

  search(searchFi) {
    this.isLoading = true;
    this.listDocument = [];
    this.fiService.search(searchFi).subscribe(result => {
      console.log(result);
      this.isLoading = false;
      const data = result.data;
      if (data.headers.length > 0 && data.headers.length <= 500) {
        this.listDocument = data.headers;
      } else if (data.headers.length > 500) {
        this.listMessageResponse.push('ไม่สามารถแสดงผลการค้นหาเกิน 500 รายการได้ กรุณาเปลี่ยนเงื่อนไขการค้นหาใหม่');
      } else {
        this.listMessageResponse.push('ไม่พบเอกสาร');
      }
    });
  }

  selectDocument(document) {
    this.router.navigate(['ns01/ns011'], {
      queryParams: { docNo: document.accDocNo, docYear: document.fiscYear }
    });
  }

}
