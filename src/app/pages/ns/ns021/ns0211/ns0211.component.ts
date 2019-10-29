import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { Constant } from '@shared/constant';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserProfile } from '@core/models/user-profile';
import { WebInfo } from '@core/models/web-info';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '@shared/utils';
import { LocalStorageService } from '@core/services';
import { MasterService } from '@core/services/master/master.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DialogSearchComponent } from '@shared/component/dialog-search/dialog-search.component';
import { DialogSaveKbComponent } from '@shared/component/dialog-save-kb/dialog-save-kb.component';
import { DialogTaxFeeComponent } from '@shared/component/dialog-tax-fee/dialog-tax-fee.component';
import { SearchFiDetailBody } from '@core/models/search-fi-detail-body';
import { FiService } from '@core/services/fi/fi.service';
import { DatepickerHeaderComponent } from '@shared/component/datepicker-header/datepicker-header.component'

@Component({
  selector: 'app-ns0211',
  templateUrl: './ns0211.component.html',
  styleUrls: ['./ns0211.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]

})
export class Ns0211Component implements OnInit {
  @ViewChild('tabRef', { static: true }) tabRef: any;
  ns0211FormCreate: FormGroup;

  departmentCodeControl: FormControl; // รหัสหน่วยงาน
  depositDateControl: FormControl; // วันที่ในใบนำฝาก
  areaCodeControl: FormControl; // รหัสพื้นที่
  fiscPeriodControl: FormControl; // งวด
  disbursementCodeControl: FormControl; // รหัสหน่วยเบิกจ่าย
  typeRemittanceControl: FormControl; // ประเภทเงินที่นำส่ง
  referenceControl: FormControl; // การอ้างอิง

  centerCodeControl: FormControl; // รหัสศูนย์ต้นทุน
  sourceBudgetCodeControl: FormControl; // รหัสงบประมาณ
  incomeCodeControl: FormControl; //รหัสรายได้
  descriptionDocumentControl: FormControl; // คำอธิบายเอกสาร

  typeMoneyControl: FormControl; // ประเภทเงิน
  yearSourceMoneyControl: FormControl; // ปีแหล่งของเงิน
  sourceMoneyCodeControl: FormControl; // รหัสแหล่งของเงิน
  depositNoControl: FormControl; //  เลขที่ใบนำฝาก
  amountMoneyControl: FormControl; // จำนวนเงิน





  isDisabledFromSearch = false; // check if content from search
  isOpenCollapseDetail = true;
  isLoading = false;
  isBtnDelete = true; // เช็คปุ่มdelete
  isBtnNew = true; // เช็คปุ่มสร้างรายการใหม่
  isSubmitedForm = false;
  isTaxInputApply = false; // เช็คสถานะ ภาษี
  isDisabledSearchBankAccountVendor = false; // เช็ค ปุ่ม search bank account

  isSelectOrder = false;
  tabSelectedIndex = 0;
  p = 1;
  tabAmount: number;
  selectListOrder = null; // เลือกหน้ารายการบัญชีที่เลือกจากตาราง
  documentNo = 1; // เลขลำดับ


  taxFee = null; // ประเภท ภาษี และมูลค่า ค่าปรับ

  totalPrice = 0;
  totalTax = 0;
  totalFee = 0;
  netPrice = 0;



  listValidate = [];
  listDocument = [];
  listFiscPeriod = [];

  typeAccountCodeBindingName = '';
  centerCodeBindingName = '';
  sourceMoneyCodeBindindName = '';
  sourceBudgetCodeBindingName = '';
  mainActivityCodeBindingName = '';
  subActivityCodeBindingName = '';
  subAccountCodeBindingName = '';
  packageCodeBindingName = '';
  accountDepositCodeBindingName = '';
  backupDocumentBindindName = '';
  vendorTaxIdBindingName = '';
  incomeBindingName = '';
  docNoFromSearchDetail = '';
  typeWithdrawalFromSearch = '';
  paymentMethodFromSearch = '';

  accountDocNo = '';
  reverseDocNo = '';
  createBy = '';
  accountDocNoFiscYear = '';
  reverseDocNoFiscYear = '';


  userProfile: UserProfile;
  private webInfo: WebInfo;
  public datePickerHeader = DatepickerHeaderComponent;

  constructor(public constant: Constant,
    private localStorageService: LocalStorageService,
    private utils: Utils,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private fiService: FiService,
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.userProfile = this.localStorageService.getUserProfile();
    this.webInfo = this.localStorageService.getWebInfo();
    this.createFormControl();
    this.createFormGroup();
    this.route.queryParams.subscribe(params => {
      if (params.docNo && params.docYear) {
        this.searchDocumentDetail(params.docNo, params.docYear);
      } else {
        this.newDocument();
      }
    });
  }

  ngAfterViewInit(): void {
    this.tabAmount = this.tabRef._tabs.length;
    // this.globalObject.isShowMenu = true;
  }

  createFormControl() {
    this.departmentCodeControl = this.formBuilder.control(''); // รหัสหน่วยงาน
    this.depositDateControl = this.formBuilder.control(''); // วันที่ในใบนำฝาก
    this.areaCodeControl = this.formBuilder.control(''); // รหัสพื้นที่
    this.fiscPeriodControl = this.formBuilder.control(''); // งวด
    this.disbursementCodeControl = this.formBuilder.control(''); // รหัสหน่วยเบิกจ่าย
    this.typeRemittanceControl = this.formBuilder.control(''); // ประเภทเงินที่นำส่ง
    this.referenceControl = this.formBuilder.control(''); // การอ้างอิง

    this.centerCodeControl = this.formBuilder.control(''); // รหัสศูนย์ต้นทุน
    this.sourceBudgetCodeControl = this.formBuilder.control(''); // รหัสงบประมาณ
    this.incomeCodeControl = this.formBuilder.control(''); //รหัสรายได้
    this.descriptionDocumentControl = this.formBuilder.control(''); // คำอธิบายเอกสาร

    this.typeMoneyControl = this.formBuilder.control(''); // ประเภทเงิน
    this.yearSourceMoneyControl = this.formBuilder.control(''); // ปีแหล่งของเงิน
    this.sourceMoneyCodeControl = this.formBuilder.control(''); // รหัสแหล่งของเงิน
    this.depositNoControl = this.formBuilder.control(''); //  เลขที่ใบนำฝาก
    this.amountMoneyControl = this.formBuilder.control(''); // จำนวนเงิน
  }

  createFormGroup() {
    this.ns0211FormCreate = this.formBuilder.group({
      departmentCode: this.departmentCodeControl, // รหัสหน่วยงาน
      depositDate: this.depositDateControl, // วันที่ในใบนำฝาก
      areaCode: this.areaCodeControl, // รหัสพื้นที่
      fiscPeriod: this.fiscPeriodControl, // งวด
      disbursementCode: this.disbursementCodeControl, // รหัสหน่วยเบิกจ่าย
      typeRemittance: this.typeRemittanceControl, // ประเภทเงินที่นำส่ง
      reference: this.referenceControl, // การอ้างอิง

      centerCode: this.centerCodeControl, // รหัสศูนย์ต้นทุน
      sourceBudgetCode: this.sourceBudgetCodeControl, // รหัสงบประมาณ
      incomeCode: this.incomeCodeControl, //รหัสรายได้
      descriptionDocument: this.descriptionDocumentControl, // คำอธิบายเอกสาร

      typeMoney: this.typeMoneyControl, // ประเภทเงิน
      yearSourceMoney: this.yearSourceMoneyControl, // ปีแหล่งของเงิน
      sourceMoneyCode: this.sourceMoneyCodeControl, // รหัสแหล่งของเงิน
      depositNo: this.depositNoControl,//  เลขที่ใบนำฝาก
      amountMoney: this.amountMoneyControl, // จำนวนเงิน
    });
  }

  newDocument() {
    this.ns0211FormCreate.enable();
    this.defaultInput();
    this.isDisabledFromSearch = false;
    this.listDocument = [];
    this.documentNo = this.listDocument.length + 1;
    this.isLoading = false;
  }
  newDocumentFromSearch() {

    this.isDisabledFromSearch = false;
    const result = this.listDocument.filter(item => item.pk !== '31');
    this.listDocument = result;

    this.setInputFormSelect(this.listDocument[0]);
    this.ns0211FormCreate.enable();
  }
  defaultInput() {
    this.docNoFromSearchDetail = '';
    this.typeAccountCodeBindingName = '';
    this.centerCodeBindingName = '';
    this.sourceMoneyCodeBindindName = '';
    this.sourceBudgetCodeBindingName = '';
    this.mainActivityCodeBindingName = '';
    this.subActivityCodeBindingName = '';
    this.subAccountCodeBindingName = '';
    this.packageCodeBindingName = '';
    this.backupDocumentBindindName = '';

    this.ns0211FormCreate.patchValue({
      departmentCode: this.userProfile.userdata.divisionCode, // รหัสหน่วยงาน
      depositDate: new Date(), // วันที่ในใบนำฝาก
      areaCode: this.userProfile.userdata.areaCode, // รหัสพื้นที่
      fiscPeriod: this.utils.fisc_period, // งวด
      disbursementCode: this.userProfile.userdata.divisionCode, // รหัสหน่วยเบิกจ่าย
      typeRemittance: this.constant.LIST_TYPE_DEPOSIT_MONEY_NS021[0].id, // ประเภทเงินที่นำส่ง
      reference: '', // การอ้างอิง

      centerCode: '', // รหัสศูนย์ต้นทุน
      sourceBudgetCode: '', // รหัสงบประมาณ
      incomeCode: '', //รหัสรายได้
      descriptionDocument: '', // คำอธิบายเอกสาร

      typeMoney: this.constant.LIST_TYPE_MONEY_NS01[0].id, // ประเภทเงิน
      yearSourceMoney: this.utils.fisc_year, // ปีแหล่งของเงิน
      sourceMoneyCode: '', // รหัสแหล่งของเงิน
      depositNo: '',
      amountMoney: '', // จำนวนเงิน
    });
  }
  setInputFormSelect(item) {
    this.typeAccountCodeBindingName = item.typeAccountName;
    this.centerCodeBindingName = item.centerName;
    this.sourceMoneyCodeBindindName = item.sourceMoneyName;
    this.sourceBudgetCodeBindingName = item.sourceBudgetName;
    this.mainActivityCodeBindingName = item.mainActivityName;
    this.subActivityCodeBindingName = item.subActivityName;
    this.subAccountCodeBindingName = item.subAccountName;
    this.packageCodeBindingName = item.packageName;
    this.incomeBindingName = item.incomeName;
    this.ns0211FormCreate.patchValue({


      departmentCode: item.departmentCode, // รหัสหน่วยงาน
      documentDate: item.documentDate, // วันที่เอกสาร
      areaCode: item.areaCode, // รหัสพื้นที่
      postDate: item.postDate, // วันที่ผ่านรายการ
      disbursementCode: item.disbursementCode, // รหัสหน่วยเบิกจ่าย
      fiscPeriod: item.fiscPeriod, // งวด
      reference: item.reference, // การอ้างอิง
      typeWithDrawal: item.typeWithDrawal, // ประเภทรายการขอเบิก
      paymentMethod: item.paymentMethod, // วิธีการชำระเงิน
      yearSourceMoney: item.yearSourceMoney, // ปีแหล่งของเงิน
      sourceMoneyCode: item.sourceMoneyCode, // รหัสแหล่งของเงิน
      incomeCode: item.incomeCode, //รหัสรายได้
      docNoMinistry: item.docNoMinistry, //เลขที่หนังสือกระทรวงการคลัง
      vendorTaxId: item.vendorTaxId, // เลขประจำตัวบัตรประชาชน /เลขประจำตัวผู้เสียภาษี
      vendorBankAccount: item.vendorBankAccount, // เลขที่บัญชีเงินฝากธนาคาร
      descriptionDocument: item.descriptionDocument, // คำอธิบายเอกสาร
      typeAccountCode: item.typeAccountCode, // รหัสบัญชีแยกประเภท
      centerCode: item.centerCode, // รหัสศูนย์ต้นทุน
      sourceBudgetCode: item.sourceBudgetCode, // รหัสงบประมาณ
      mainActivityCode: item.mainActivityCode, // รหัสกิจกรรมหลัก
      amountMoney: item.amountMoney, // จำนวนเงิน
    });
  }
  clearInputDetailAccount() {
    this.typeAccountCodeBindingName = '';
    this.centerCodeBindingName = '';
    this.sourceMoneyCodeBindindName = '';
    this.sourceBudgetCodeBindingName = '';
    this.mainActivityCodeBindingName = '';
    this.subActivityCodeBindingName = '';
    this.subAccountCodeBindingName = '';
    this.packageCodeBindingName = '';
    this.backupDocumentBindindName = '';
    this.ns0211FormCreate.patchValue({
      typeAccountCode: '', // รหัสบัญชีแยกประเภท
      centerCode: '', // รหัสศูนย์ต้นทุน
      sourceBudgetCode: '', // รหัสงบประมาณ
      mainActivityCode: '', // รหัสกิจกรรมหลัก
      amountMoney: '', // จำนวนเงิน
    });
  }
  setInputFromSearchToForm(head, items) {
    console.log('===head', head);
    console.log('===items', items);
    const dateDoc = new Date(head.dateDoc);
    const postDoc = new Date(head.datePost);
    const item = items[0] as any;

    this.typeAccountCodeBindingName = item.glAccName;
    this.centerCodeBindingName = item.costCenterName;
    this.sourceMoneyCodeBindindName = item.fundSourceName;
    this.sourceBudgetCodeBindingName = item.bgCodeName;
    this.mainActivityCodeBindingName = item.bgActivityName;
    this.subActivityCodeBindingName = item.costActivity;
    this.subAccountCodeBindingName = item.subAccName;
    this.packageCodeBindingName = '';
    this.backupDocumentBindindName = '';
    this.accountDocNo = head.accDocNo;
    this.reverseDocNo = head.revAccDocNo;
    this.createBy = head.userWeb;
    this.accountDocNoFiscYear = head.fiscYear;
    this.reverseDocNoFiscYear = head.revFiscYear;
    // this.checkDocumentTypeFromSearch(head)


    this.ns0211FormCreate.patchValue({
      departmentCode: head.compCode, // รหัสหน่วยงาน
      documentDate: dateDoc, // วันที่เอกสาร
      areaCode: item.bgArea, // รหัสพื้นที่
      postDate: postDoc, // วันที่ผ่านรายการ
      disbursementCode: item.paymentCenter, // รหัสหน่วยเบิกจ่าย
      fiscPeriod: head.period, // งวด
      reference: head.refDocNo, // อ้างอิง
      yearSourceMoney: Number(head.fiscYear) + 543,
      sourceMoneyCode: item.fundSource, // รหัสแหล่งของเงิน

      typeWithDrawal: this.constant.LIST_TYPE_REQUEST_WITHDRAWAL_KB05[0].id, // ประเภทรายการขอเบิก
      paymentMethod: this.constant.LIST_PAYMENT_KB05[0].id, // วิธีการชำระเงิน
      incomeCode: item.income,
      docNoMinistry: '', //เลขที่หนังสือกระทรวงการคลัง

      vendorTaxId: head.vendorTaxId, // เลขประจำตัวบัตรประชาชน /เลขประจำตัวผู้เสียภาษี
      vendorBankAccount: item.bankAccNo, // เลขที่บัญชีเงินฝากธนาคาร
      descriptionDocument: head.headerDesc, // คำอธิบายเอกสาร
      pk: item.postingKey,
      backupDocumentNo: head.brDocNo, // เลขที่เอกสารสำรองเงิน
      typeAccountCode: item.glAcc, // รหัสบัญชีแยกประเภท
      centerCode: item.costCenter, // รหัสศูนย์ต้นทุน
      sourceBudgetCode: item.bgCode, // รหัสงบประมาณ
      mainActivityCode: item.bgActivity, // รหัสกิจกรรมหลัก
      subActivityCode: item.costActivity, // รหัสกิจกรรมย่อย
      subAccountCode: item.subAcc, // รหัสบัญชีย่อย
      ownSubAccountCode: item.subAccOwner, // รหัสเจ้าของบัญชีย่อย
      packageCode: item.productGroup, // รหัสหมวดพัสดุ
      tradingPartnerCode: item.tradingPartner, // รหัสหน่วยงานคู่ค้า
      amountMoney: item.amount, // จำนวนเงิน
      detail: item.lineDesc // รายละเอียดบรรทัดรายการ
    });
    this.listDocument = [];

    items.forEach((item: any) => {
      const data: any = {
        typeAccountName: item.glAccName,
        centerName: item.costCenterName,
        sourceMoneyName: item.fundSourceName,
        sourceBudgetName: item.bgCodeName,
        mainActivityName: item.bgActivityName,
        subActivityName: item.costActivity,
        subAccountName: item.subAccName,
        packageName: '',

        // for kb
        vendorTaxId: head.vendorTaxId, // เลขประจำตัวบัตรประชาชน /เลขประจำตัวผู้เสียภาษี
        vendorBankAccount: item.bankAccNo, // เลขที่บัญชีเงินฝากธนาคาร
        backupDocumentNo: head.brDocNo, // เลขที่เอกสารสำรองเงิน
        descriptionDocument: head.headerDesc, // คำอธิบายเอกสาร
        typeWithDrawal: this.constant.LIST_TYPE_REQUEST_WITHDRAWAL_KB05[0].id, // ประเภทรายการขอเบิก
        paymentMethod: this.constant.LIST_PAYMENT_KB05[0].id, // วิธีการชำระเงิน
        docNoMinistry: '', //เลขที่หนังสือกระทรวงการคลัง
        // for kb
        departmentCode: head.compCode,
        documentDate: dateDoc,
        areaCode: item.bgArea,
        postDate: postDoc,
        disbursementCode: item.paymentCenter,
        documentType: head.docType,
        fiscPeriod: head.period, // งวด
        reference: head.refDocNo, // การอ้างอิง
        pk: item.postingKey,
        reserveDocument: item.revAccDocNo,
        typeAccountCode: item.glAcc, // รหัสบัญชีแยกประเภท
        centerCode: item.costCenter, // รหัสศูนย์ต้นทุน
        yearSourceMoney: Number(head.fiscYear) + 543, // ปีแหล่งของเงิน
        sourceMoneyCode: item.fundSource, // รหัสแหล่งของเงิน
        sourceBudgetCode: item.bgCode, // รหัสงบประมาณ
        mainActivityCode: item.bgActivity, // รหัสกิจกรรมหลัก
        subActivityCode: item.costActivity, // รหัสบัญชีย่อย
        accountDepositCode: item.depositAcc,
        ownAccountDepositCode: item.depositAccOwner,
        subAccountCode: item.subAcc, // รหัสบัญชีย่อย
        ownSubAccountCode: item.subAccOwner, // รหัสเจ้าของบัญชีย่อย
        subBookBankCode: item.bankAccNo,
        packageCode: item.productGroup, // รหัสหมวดพัสดุ
        tradingPartnerCode: item.tradingPartner, // รหัสหน่วยงานคู่ค้า
        incomeCode: item.income,
        amountMoney: item.amount, // จำนวนเงิน
        detail: item.lineDesc // รายละเอียดบรรทัดรายการ
      };
      this.listDocument.push(data);
      // this.checkDocumentTypeFromCreate();
      this.calculateTotalPrice();
      this.calculateTax();
      this.calculateFee();
      this.calculateNetPrice();
      // this.getTotalCost();
    });
  }
  selectDocument(item, i) {
    this.selectListOrder = i + 1;
    this.documentNo = i + 1;
    this.setInputFormSelect(item);

    this.isBtnDelete = false;
    this.isBtnNew = false;
    this.isSelectOrder = true;
  }
  keepOrder(value) {
    const map = this.addKeyValidate(value);
    this.listValidate = [];
    this.utils.checkValidateRequired(map, this.listValidate);
    // this.checkValidateWithDrawalAndPayment();
    // this.utils.checkValidateRelationshipData(value, this.listValidate);
    this.isSubmitedForm = true;
    if (this.listValidate.length <= 0) {
      this.isSubmitedForm = false;
      value.pk = '40';
      if (this.documentNo > this.listDocument.length) {
        this.saveIntoList(value);
      } else {
        this.editIntoList(value);
      }
    }
    this.selectListOrder = null;
    this.isSelectOrder = false;
  }
  createNewOrder(value) {
    const map = this.addKeyValidate(value);
    this.listValidate = [];
    this.utils.checkValidateRequired(map, this.listValidate);
    // this.checkValidateWithDrawalAndPayment();
    // this.utils.checkValidateRelationshipData(value, this.listValidate);
    if (this.listValidate.length <= 0) {
      value.pk = '40';
      this.saveIntoList(value);
    }
    this.isSelectOrder = false;
  }
  deleteOrder() {
    this.listDocument.splice(this.documentNo - 1, 1);
    this.documentNo = this.listDocument.length + 1;
    this.isBtnDelete = true;
    this.isBtnNew = true;
    this.clearInputDetailAccount();
    this.calculateTotalPrice();
    this.calculateTax();
    this.calculateFee();
    this.calculateNetPrice();
  }
  calculateTotalPrice() {
    let totalPrice = 0;
    this.totalPrice = 0;
    this.listDocument.forEach(document => {
      if (document.pk === '40') {
        totalPrice += document.amountMoney;
      }
    });
    this.totalPrice = totalPrice;
  }
  calculateTax() {
    if (this.taxFee != null) {
      if (this.taxFee.typeTax) {
        this.totalTax = this.taxFee.valueTax;
      }
    } else {
      this.totalTax = 0;
    }
  }
  calculateFee() {
    if (this.taxFee != null) {
      this.totalFee = this.taxFee.valueFee;
    } else {
      this.totalFee = 0;
    }
  }
  calculateNetPrice() {
    if (this.totalPrice > this.totalTax) {
      this.netPrice = this.totalPrice - (Number(this.totalTax) + Number(this.totalFee));
    }
  }

  saveIntoList(value) {
    value.typeAccountName = this.typeAccountCodeBindingName;
    value.centerName = this.centerCodeBindingName;
    value.sourceMoneyName = this.sourceMoneyCodeBindindName;
    value.sourceBudgetName = this.sourceBudgetCodeBindingName;
    value.mainActivityName = this.mainActivityCodeBindingName;
    value.subActivityName = this.subActivityCodeBindingName;
    value.subAccountName = this.subAccountCodeBindingName;
    value.packageName = this.packageCodeBindingName;
    value.incomeName = this.incomeBindingName;
    this.listDocument.push(value);
    this.documentNo = this.listDocument.length + 1;
    this.isBtnDelete = true;
    this.isBtnNew = true;
    this.clearInputDetailAccount();
    this.calculateTotalPrice();
    this.calculateTax();
    this.calculateFee();
    this.calculateNetPrice();
  }
  editIntoList(value) {
    value.typeAccountName = this.typeAccountCodeBindingName;
    value.centerName = this.centerCodeBindingName;
    value.sourceMoneyName = this.sourceMoneyCodeBindindName;
    value.sourceBudgetName = this.sourceBudgetCodeBindingName;
    value.mainActivityName = this.mainActivityCodeBindingName;
    value.subActivityName = this.subActivityCodeBindingName;
    value.subAccountName = this.subAccountCodeBindingName;
    value.packageName = this.packageCodeBindingName;
    value.incomeName = this.incomeBindingName;
    this.listDocument[this.documentNo - 1] = value;
    this.documentNo = this.listDocument.length + 1;
    this.isBtnDelete = true;
    this.isBtnNew = true;
    this.clearInputDetailAccount();
    this.calculateTotalPrice();
    this.calculateTax();
    this.calculateFee();
    this.calculateNetPrice();
  }

  addKeyValidate(value) {
    const keyValidate = new Map();
    keyValidate.set('reference', value.reference);
    keyValidate.set('sourceMoneyCode', value.sourceMoneyCode);
    keyValidate.set('amountMoneyCredit', value.amountMoneyCredit);
    keyValidate.set('incomeCode', value.incomeCode);
    keyValidate.set('typeAccountCode', value.typeAccountCode);
    keyValidate.set('amountMoneyDebit', value.amountMoneyDebit);

    return keyValidate;
  }

  searchDocumentDetail(docNo, docYear) {
    // Object.keys(this.classStyleLabel).forEach(v => (this.classStyleLabel[v] = 'text-black'));
    // const yearTh = Number(docYear) + 543;
    const yearTh = Number(docYear);
    const payload: SearchFiDetailBody = {
      compCode: this.userProfile.userdata.departmentCode,
      accDocNo: docNo,
      fiscYear: yearTh.toString(),
      formId: this.constant.FORM_ID_NS.ns01,
      webInfo: this.webInfo
    };
    this.fiService.searchDetail(payload).subscribe(result => {
      this.isLoading = false;
      const header = result.data.header as any;
      const listTable = result.data.items as any;
      this.setInputFromSearchToForm(header, listTable);
      this.isDisabledFromSearch = true;
      this.ns0211FormCreate.disable();
    });
  }
  openDialogPreSave() {
    const allPageNs01 = new Map();
    allPageNs01.set('path', 'ns01');
    allPageNs01.set('create', 'ns011');
    allPageNs01.set('search', 'ns012');
    allPageNs01.set('backList', 'ns013');
    this.listValidate = [];
    // this.utils.checkCreditWithDebit(this.sumCostDebit, this.sumCostCredit, this.listValidate);
    let codeTax = ''; // code Tax
    let typeTax = ''; // ประเภท Tax
    let taxBaseCaculate = ''; // ฐานการคำนวณ Tax
    let valueTax = ''; // จำนวน
    let codeFee = ''; // code Fee
    let typeFee = ''; // ประเภท ค่าปรับ
    let feeBaseCaculate = ''; // ฐานการคำนวณ ค่าปรับ
    let valueFee = ''; // จำนวน ค่าปรับ
    if (this.taxFee !== null) {
      codeTax = this.taxFee.codeTax;
      typeTax = this.taxFee.typeTax;
      taxBaseCaculate = this.taxFee.taxBaseCaculate;
      valueTax = this.taxFee.valueTax;
      if (!this.taxFee.feeBaseCaculate && !this.taxFee.valueFee) {
        codeFee = this.taxFee.codeFee;
        typeFee = this.taxFee.typeFee;
        feeBaseCaculate = this.taxFee.feeBaseCaculate;
        valueFee = this.taxFee.valueFee;
      }
    }
    let header;
    const listItem = [];
    if (this.listValidate.length <= 0) {
      if (this.listDocument.length > 0) {
        const form = this.ns0211FormCreate.value;
        console.log(form);
        const dayDocDate = form.documentDate.getDate();
        const monthDocDate = form.documentDate.getMonth() + 1;
        const yearDocDate = form.documentDate.getFullYear();
        const dayPostDocDate = form.postDate.getDate();
        const monthPostDocDate = form.postDate.getMonth() + 1;
        const yearPostDocDate = form.postDate.getFullYear();

        header = {
          flag: 0,
          accDocNo: '',
          amount: 0,
          brDocNo: form.backupDocumentNo,
          compCode: this.webInfo.compCode,
          costCenter1: '',
          costCenter2: '',
          currency: 'THB',
          dateDoc: this.utils.parseDate(dayDocDate, monthDocDate, yearDocDate),
          datePost: this.utils.parseDate(dayPostDocDate, monthPostDocDate, yearPostDocDate),
          docStatus: '',
          docType: 'K06',
          fiscYear: form.yearSourceMoney,
          formId: this.constant.FORM_ID_NS.ns01,
          headerDesc: form.descriptionDocument,
          invDocNo: '',
          payee: '',
          paymentCenter: form.disbursementCode,
          paymentMethod: form.paymentMethod,
          period: 0,
          poDocNo: '',
          refDocNo: form.reference,
          revAccDocNo: '',
          revDatePost: '',
          revFiscYear: '',
          revInvDocNo: '',
          revReasonPost: '',
          timestamp: '',
          userWeb: this.webInfo.userWeb,
          vendor: '',
          vendorName: '',
          vendorTaxId: form.vendorTaxId
        };
        this.listDocument.forEach((order, index) => {
          const item = {
            accType: 'S',
            amount: order.amountMoney,
            assetNo: '',
            assetSubNo: '',
            assetTranType: '',
            assignment: '',
            bankAccNo: order.vendorBankAccount,
            bankBook: '',
            bankBookName: '',
            bankBranchNo: '',
            bgActivity: order.mainActivityCode,
            bgActivityName: '',
            bgArea: order.areaCode,
            bgAreaName: '',
            bgCode: order.sourceBudgetCode,
            bgCodeName: '',
            brDocNo: form.backupDocumentNo,
            brLine: index + 1,
            compCode: order.departmentCode,
            costActivity: order.subActivityCode,
            costActivityName: '',
            costCenter: order.centerCode,
            costCenterName: '',
            creditMemoDocNo: '',
            creditMemoFiscalYear: 0,
            dateBaseline: '',
            depositAcc: order.accountDepositCode,
            depositAccName: '',
            depositAccOwner: order.ownAccountDepositCode,
            depositAccOwnerName: '',
            fundSource: order.sourceMoneyCode,
            fundSourceName: '',
            glAcc: order.typeAccountCode,
            glAccName: '',
            gpsc: '',
            income: order.incomeCode,
            incomeName: order.incomeName,
            lineDesc: order.detail,
            paymentCenter: order.disbursementCode,
            paymentMethod: order.paymentMethod,
            paymentTerm: '',
            poDocNo: '',
            poLine: 0,
            postingKey: order.pk,
            productGroup: '',
            qty: 0,
            reference1: '',
            reference3: '',
            specialGl: '',
            subAcc: order.subAccountCode, // รหัสบัญชีย่อย
            subAccName: '',
            subAccOwner: order.ownSubAccountCode, // รหัสเจ้าของบัญชีย่อย
            subAccOwnerName: '',
            tradingPartherName: '',
            tradingPartner: order.tradingPartnerCode,
            tradingPartnerBusArea: '',
            uom: '',
            uomIso: '',
            vendor: '',
            vendorName: '',
            vendorTaxId: form.vendorTaxId,
            wtxAmount: valueTax,
            wtxAmountP: valueFee,
            wtxBase: taxBaseCaculate,
            wtxBaseP: feeBaseCaculate,
            wtxCode: codeTax,
            wtxCodeP: codeFee,
            wtxType: typeTax,
            wtxTypeP: typeFee
          };
          listItem.push(item);
        });
        console.log(header);
        console.log(listItem);
        const dialogRef = this.dialog.open(DialogSaveKbComponent, {
          width: '70vw',
          data: {
            page: allPageNs01,
            head: header,
            item: listItem
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result.event === 'save') {
            } else {
            }
          }
        });
      } else {
        this.listValidate.push('กรุณากรอกรายการบัญชี');
      }
    }
  }
  openDialogTaxFee() {
    const dialogRef = this.dialog.open(DialogTaxFeeComponent, {
      width: '40vw',
      data: {
        taxFee: this.taxFee,
        type: '2'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result && result.event === 'save') {
        this.taxFee = result.taxFee;
        if (this.taxFee !== null) {
          this.isTaxInputApply = true;
          this.calculateTotalPrice();
          this.calculateTax();
          this.calculateFee();
          this.calculateNetPrice();
        } else {
          this.isTaxInputApply = false;
          this.calculateTotalPrice();
          this.calculateTax();
          this.calculateFee();
          this.calculateNetPrice();
        }
      }
    });
  }

  // openDialogSearchBudgetReserve(type) {
  //   const dialogRef = this.dialog.open(DialogSearchBudgetReserveComponent, {
  //     width: '70vw',
  //     data: { type }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result && result.event) {
  //       this.ns0211FormCreate.patchValue({ [result.type]: result.value });
  //     }
  //   });
  // }
  openDialogSearch(type) {
    let specialCase: any;
    if (type === 'vendorBankAccount') {
      specialCase = {
        vendorTaxId: this.ns0211FormCreate.get('vendorTaxId').value
      };
    }
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      width: '70vw',
      data: { type, specialCase }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event) {
        this.ns0211FormCreate.patchValue({ [result.type]: result.value });
        if (type === 'vendorTaxId') {
          this.vendorTaxIdBindingName = result.name;
          if (result.value != undefined || result.value != null || result.value != '') {
            this.ns0211FormCreate.controls.vendorBankAccount.enable();
          }
        }
        if (type === 'typeAccountCode') {
          this.typeAccountCodeBindingName = result.name;
        } else if (type === 'centerCode') {
          this.centerCodeBindingName = result.name;
        } else if (type === 'sourceMoneyCode') {
          this.sourceMoneyCodeBindindName = result.name;
        } else if (type === 'sourceBudgetCode') {
          this.sourceBudgetCodeBindingName = result.name;
        } else if (type === 'mainActivityCode') {
          this.mainActivityCodeBindingName = result.name;
        } else if (type === 'subActivityCode') {
          this.subActivityCodeBindingName = result.name;
        } else if (type === 'subAccountCode') {
          this.subAccountCodeBindingName = result.name;
        } else if (type === 'packageCode') {
          this.packageCodeBindingName = result.name;
        } else if (type === 'accountDepositCode') {
          this.accountDepositCodeBindingName = result.name;
        } else if (type === 'incomeCode') {
          this.incomeBindingName = result.name;
        }
      }
    });
  }
  onChangePostDate(event) {
    const date = event.value;
    this.utils.fisc_year = this.utils.calculateFiscYear(date);
    this.ns0211FormCreate.patchValue({
      yearSourceMoney: this.utils.fisc_year
    });
  }

  onBlurSearch(type) {
    const form = this.ns0211FormCreate.value;
    if (type === 'typeAccountCode') {
      this.masterService.findOneDataTypeAccount(form.typeAccountCode).subscribe(data => {
        const response = data as any;
        console.log('responce:', response);
        if (response) {
          this.ns0211FormCreate.patchValue({
            typeAccountCode: response.value
          });
          this.typeAccountCodeBindingName = response.name;
        } else {
          this.typeAccountCodeBindingName = 'ไม่พบ';
        }
      });
    } else if (type === 'centerCode') {
      this.masterService.findOneDataCenter(this.userProfile.userdata.departmentCode, form.centerCode).subscribe(data => {
        const response = data as any;
        if (response) {
          this.ns0211FormCreate.patchValue({
            centerCode: response.valueCode
          });
          this.centerCodeBindingName = response.name;
        }
      });
    } else if (type === 'sourceMoneyCode') {
      this.masterService.findOneDataSourceMoney(form.sourceMoneyCode).subscribe(data => {
        const response = data as any;
        console.log(response);
        if (response) {
          this.ns0211FormCreate.patchValue({
            sourceMoneyCode: response.valueCode
          });
          this.sourceMoneyCodeBindindName = response.name;
        }
      });
    } else if (type === 'sourceBudgetCode') {
      this.masterService.findOneDataSourceBudget(form.sourceBudgetCode).subscribe(data => {
        const response = data as any;
        if (response) {
          this.ns0211FormCreate.patchValue({
            sourceBudgetCode: response.valueCode
          });
          this.sourceBudgetCodeBindingName = response.name;
        }
      });
    } else if (type === 'mainActivityCode') {
      this.masterService.findOneDataMainActivity(form.mainActivityCode).subscribe(data => {
        const response = data as any;
        if (response) {
          this.ns0211FormCreate.patchValue({
            mainActivityCode: response.valueCode
          });
          this.mainActivityCodeBindingName = response.name;
        }
      });
    } else if (type === 'subActivityCode') {
      this.masterService.findOneDataSubActivity(form.subActivityCode).subscribe(data => {
        const response = data as any;
        if (response) {
          this.ns0211FormCreate.patchValue({
            subActivityCode: response.valueCode
          });
          this.subActivityCodeBindingName = response.name;
        }
      });
    } else if (type === 'subAccountCode') {
      this.masterService.findOneDataSubAccount(form.subAccountCode).subscribe(data => {
        const response = data as any;
        console.log(response);
        if (response) {
          this.ns0211FormCreate.patchValue({
            subAccountCode: response.valueCode
          });
          this.subAccountCodeBindingName = response.name;
        }
      });
    } else if (type === 'packageCode') {
      const object = {
        textSearch: form.packageCode
      };
      this.masterService.findOneDataPackage(object).subscribe(data => {
        const response = data as any;
        console.log(response);
        const status = response.statusCode;
        if (status === 200) {
        }
      });
    } else if (type === 'incomeCode') {

      this.masterService.findOneIncome(form.incomeCode).subscribe(data => {
        const response = data as any;
        console.log(response);
        const status = response.statusCode;
        if (response) {
          this.ns0211FormCreate.patchValue({
            incomeCode: response.valueCode
          });
          this.incomeBindingName = response.name;
        }
      });
    }
  }

  openCollapseDetail() {
    this.isOpenCollapseDetail = !this.isOpenCollapseDetail;
  }

  clickSelectOrderList(type) {
    if (type === 'prev') {
      this.selectListOrder = this.selectListOrder - 1;
    } else {
      this.selectListOrder = this.selectListOrder + 1;
    }
    this.selectDocument(this.listDocument[this.selectListOrder - 1], this.selectListOrder - 1);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tabSelectedIndex = tabChangeEvent.index;
  }

  checkTab(type) {
    if (type === 'prev') {
      this.tabSelectedIndex = this.tabSelectedIndex - 1;
    } else {
      this.tabSelectedIndex = this.tabSelectedIndex + 1;
    }
  }
}
