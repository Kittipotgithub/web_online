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
  selector: 'app-ns011',
  templateUrl: './ns011.component.html',
  styleUrls: ['./ns011.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]

})
export class Ns011Component implements OnInit {
  @ViewChild('tabRef', { static: true }) tabRef: any;
  ns011FormCreate: FormGroup;

  departmentCodeControl: FormControl; // รหัสหน่วยงาน
  dailyDateControl: FormControl; // ประจำวันที่
  areaCodeControl: FormControl; // รหัสพื้นที่
  fiscPeriodControl: FormControl; // งวด
  disbursementCodeControl: FormControl; // รหัสหน่วยเบิกจ่าย
  typeReceiveControl: FormControl; // ประเภทการรับเงิน
  referenceControl: FormControl; // การอ้างอิง
  typeMoneyControl: FormControl; // ประเภทเงิน
  bankBookControl: FormControl; // Bank book
  yearSourceMoneyControl: FormControl; // ปีแหล่งของเงิน
  sourceMoneyCodeControl: FormControl; // รหัสแหล่งของเงิน
  amountMoneyCreditControl: FormControl; // จำนวนเงินเครดิค
  centerCodeControl: FormControl; // รหัสศูนย์ต้นทุน
  digitAccountDepositControl: FormControl; // รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
  incomeCodeControl: FormControl; //รหัสรายได้
  descriptionDocumentControl: FormControl; // คำอธิบายเอกสาร

  typeAccountCodeControl: FormControl; // รหัสบัญชีแยกประเภท
  accountDepositCodeControl: FormControl; // รหัสบัญชีเงินฝากคลัง
  ownAccountDepositCodeControl: FormControl; // รหัสเจ้าของบัญชีเงินฝากคลัง
  amountMoneyDebitControl: FormControl; // จำนวนเงินเดบิต
  tradingPartnerCodeControl: FormControl; // รหัสหน่วยงานคู่ค้า
  detailControl: FormControl; // รายละเอียดบรรทัดรายการ


  isDisabledFromTypeReceive = false; // // ประเภทการรับเงิน
  isDisabledFromTypeMoney = false; // ประเภทเงิน

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
  bankBookBidingName = ''

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
    this.dailyDateControl = this.formBuilder.control(''); // ประจำวันที่
    this.areaCodeControl = this.formBuilder.control(''); // รหัสพื้นที่
    this.fiscPeriodControl = this.formBuilder.control(''); // งวด
    this.disbursementCodeControl = this.formBuilder.control(''); // รหัสหน่วยเบิกจ่าย
    this.typeReceiveControl = this.formBuilder.control(''); // ประเภทการรับเงิน
    this.referenceControl = this.formBuilder.control(''); // การอ้างอิง
    this.typeMoneyControl = this.formBuilder.control(''); // ประเภทเงิน
    this.bankBookControl = this.formBuilder.control(''); // Bank book
    this.yearSourceMoneyControl = this.formBuilder.control(''); // ปีแหล่งของเงิน
    this.sourceMoneyCodeControl = this.formBuilder.control(''); // รหัสแหล่งของเงิน
    this.amountMoneyDebitControl = this.formBuilder.control(''); // จำนวนเงินเดบิต
    this.centerCodeControl = this.formBuilder.control(''); // รหัสศูนย์ต้นทุน
    this.digitAccountDepositControl = this.formBuilder.control(''); // รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
    this.incomeCodeControl = this.formBuilder.control(''); //รหัสรายได้
    this.descriptionDocumentControl = this.formBuilder.control(''); // คำอธิบายเอกสาร

    this.typeAccountCodeControl = this.formBuilder.control(''); // รหัสบัญชีแยกประเภท
    this.accountDepositCodeControl = this.formBuilder.control(''); // รหัสบัญชีเงินฝากคลัง
    this.ownAccountDepositCodeControl = this.formBuilder.control('');// รหัสเจ้าของบัญชีเงินฝากคลัง
    this.amountMoneyCreditControl = this.formBuilder.control(''); // จำนวนเงินเครดิค
    this.tradingPartnerCodeControl = this.formBuilder.control(''); // รหัสหน่วยงานคู่ค้า
    this.detailControl = this.formBuilder.control(''); // รายละเอียดบรรทัดรายการ
  }

  createFormGroup() {
    this.ns011FormCreate = this.formBuilder.group({
      departmentCode: this.departmentCodeControl, // รหัสหน่วยงาน
      dailyDate: this.dailyDateControl, // ประจำวันที่
      areaCode: this.areaCodeControl, // รหัสพื้นที่
      fiscPeriod: this.fiscPeriodControl, // งวด
      disbursementCode: this.disbursementCodeControl, // รหัสหน่วยเบิกจ่าย
      typeReceive: this.typeReceiveControl, // ประเภทการรับเงิน
      reference: this.referenceControl, // การอ้างอิง
      typeMoney: this.typeMoneyControl, // ประเภทเงิน
      bankBook: this.bankBookControl,// // Bank book
      yearSourceMoney: this.yearSourceMoneyControl, // ปีแหล่งของเงิน
      sourceMoneyCode: this.sourceMoneyCodeControl, // รหัสแหล่งของเงิน
      amountMoneyDebit: this.amountMoneyDebitControl, // จำนวนเงินเดบิต
      centerCode: this.centerCodeControl, // รหัสศูนย์ต้นทุน
      digitAccountDeposit: this.digitAccountDepositControl,// รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
      incomeCode: this.incomeCodeControl, //รหัสรายได้
      descriptionDocument: this.descriptionDocumentControl, // คำอธิบายเอกสาร

      typeAccountCode: this.typeAccountCodeControl, // รหัสบัญชีแยกประเภท
      accountDepositCode: this.accountDepositCodeControl,// รหัสบัญชีเงินฝากคลัง
      ownAccountDepositCode: this.ownAccountDepositCodeControl,// รหัสเจ้าของบัญชีเงินฝากคลัง
      amountMoneyCredit: this.amountMoneyCreditControl, // จำนวนเงินเครดิค
      tradingPartnerCode: this.tradingPartnerCodeControl, // รหัสหน่วยงานคู่ค้า
      detail: this.detailControl, // รายละเอียดบรรทัดรายการ
    });
  }

  newDocument() {
    this.ns011FormCreate.enable();
    this.defaultInput();
    this.isDisabledFromSearch = false;
    this.listDocument = [];
    this.documentNo = this.listDocument.length + 1;
    this.isLoading = false;
  }
  newDocumentFromSearch() {

    this.isDisabledFromSearch = false;
    const result = this.listDocument.filter(item => item.pk !== '40');
    this.listDocument = result;
    this.listDocument.forEach(document => {
      if (document.pk === '50') {
        document.amountMoneyCredit = Number(document.amountMoneyCredit) * -1;

      }
    })

    this.setInputFormSelect(this.listDocument[0]);
    this.ns011FormCreate.enable();
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

    this.ns011FormCreate.patchValue({
      departmentCode: this.userProfile.userdata.departmentCode, // รหัสหน่วยงาน
      dailyDate: new Date(), // ประจำวันที่
      areaCode: this.userProfile.userdata.areaCode, // รหัสพื้นที่
      fiscPeriod: this.utils.fisc_period, // งวด
      disbursementCode: this.userProfile.userdata.divisionCode, // รหัสหน่วยเบิกจ่าย
      typeReceive: this.constant.LIST_TYPE_RECEIVE_MONEY_NS01[0].id, // ประเภทการรับเงิน
      reference: '', // การอ้างอิง
      typeMoney: this.constant.LIST_TYPE_MONEY_NS01[0].id, // ประเภทเงิน
      bankBook: '',// Bank book
      yearSourceMoney: this.utils.fisc_year, // ปีแหล่งของเงิน
      sourceMoneyCode: '', // รหัสแหล่งของเงิน
      amountMoneyDebit: '', // จำนวนเงินเดบิต
      centerCode: '', // รหัสศูนย์ต้นทุน
      digitAccountDeposit: '',// รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
      incomeCode: '', //รหัสรายได้
      descriptionDocument: '', // คำอธิบายเอกสาร
      typeAccountCode: '', // รหัสบัญชีแยกประเภท
      accountDepositCode: '',// รหัสบัญชีเงินฝากคลัง
      ownAccountDepositCode: '',// รหัสเจ้าของบัญชีเงินฝากคลัง
      amountMoneyCredit: '', // จำนวนเงินเครดิค
      tradingPartnerCode: '', // รหัสหน่วยงานคู่ค้า
      detail: '', // รายละเอียดบรรทัดรายการ
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
    // this.incomeBindingName = item.incomeName;
    this.accountDepositCodeBindingName=item.accountDepositName;
    this.ns011FormCreate.patchValue({


      departmentCode: item.departmentCode, // รหัสหน่วยงาน
      // dailyDate: item.dailyDate, // ประจำวันที่
      areaCode: item.areaCode, // รหัสพื้นที่
      fiscPeriod: item.fiscPeriod, // งวด
      disbursementCode: item.disbursementCode, // รหัสหน่วยเบิกจ่าย
      // typeReceive: item.typeReceive, // ประเภทการรับเงิน
      reference: item.reference, // การอ้างอิง
      // typeMoney: item.typeMoney, // ประเภทเงิน
      // bankBook: item.bankBook,// Bank book
      yearSourceMoney: item.yearSourceMoney, // ปีแหล่งของเงิน
      sourceMoneyCode: item.sourceMoneyCode, // รหัสแหล่งของเงิน
      // amountMoneyDebit: item.amountMoneyDebit, // จำนวนเงินเดบิต
      centerCode: item.centerCode, // รหัสศูนย์ต้นทุน
      // digitAccountDeposit: item.digitAccountDeposit,// รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
      // incomeCode: item.incomeCode, //รหัสรายได้
      // descriptionDocument: item.descriptionDocument, // คำอธิบายเอกสาร
      typeAccountCode: item.typeAccountCode, // รหัสบัญชีแยกประเภท
      accountDepositCode: item.accountDepositCode,// รหัสบัญชีเงินฝากคลัง
      ownAccountDepositCode: item.ownAccountDepositCode,// รหัสเจ้าของบัญชีเงินฝากคลัง
      amountMoneyCredit: item.amountMoneyCredit, // จำนวนเงินเครดิค
      tradingPartnerCode: item.tradingPartnerCode, // รหัสหน่วยงานคู่ค้า
      detail: item.detail, // รายละเอียดบรรทัดรายการ
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
    this.accountDepositCodeBindingName='';

    this.ns011FormCreate.patchValue({
      // bankBook: '',// Bank book
      // digitAccountDeposit: '',// รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
      // incomeCode: '', //รหัสรายได้

      typeAccountCode: '', // รหัสบัญชีแยกประเภท
      accountDepositCode: '',// รหัสบัญชีเงินฝากคลัง
      ownAccountDepositCode: '',// รหัสเจ้าของบัญชีเงินฝากคลัง
      amountMoneyCredit: '', // จำนวนเงินเครดิค
      tradingPartnerCode: '', // รหัสหน่วยงานคู่ค้า
      detail: '', // รายละเอียดบรรทัดรายการ
    });
  }
  clearInputFormtTypeReceive() {
    this.incomeBindingName = ''
    this.ns011FormCreate.patchValue({
      bankBook: '',// Bank book
      digitAccountDeposit: '',// รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
      incomeCode: '', //รหัสรายได้

      accountDepositCode: '',// รหัสบัญชีเงินฝากคลัง
      ownAccountDepositCode: '',// รหัสเจ้าของบัญชีเงินฝากคลัง

    });

  }
  setInputFromSearchToForm(head, items) {
    console.log('===head', head);
    console.log('===items', items);
    const dateDoc = new Date(head.dateDoc);
    const postDoc = new Date(head.datePost);
    const item40 = items[0] as any;
    const item50 = items[1] as any;

    this.typeAccountCodeBindingName = item40.glAccName;
    this.centerCodeBindingName = item40.costCenterName;
    this.sourceMoneyCodeBindindName = item40.fundSourceName;
    this.sourceBudgetCodeBindingName = item40.bgCodeName;
    this.mainActivityCodeBindingName = item40.bgActivityName;
    this.subActivityCodeBindingName = item40.costActivity;
    this.subAccountCodeBindingName = item40.subAccName;
    this.accountDepositCodeBindingName= item40.depositAccName
    this.incomeBindingName = item50.incomeName;
    this.bankBookBidingName = item40.bankBookName
    this.packageCodeBindingName = '';
    this.backupDocumentBindindName = '';
    this.accountDocNo = head.accDocNo;
    this.reverseDocNo = head.revAccDocNo;
    this.createBy = head.userWeb;
    this.accountDocNoFiscYear = head.fiscYear;
    this.reverseDocNoFiscYear = head.revFiscYear;
    // this.checkDocumentTypeFromSearch(head)


    this.ns011FormCreate.patchValue({
      departmentCode: head.compCode, // รหัสหน่วยงาน
      documentDate: dateDoc, // วันที่เอกสาร
      areaCode: item40.bgArea, // รหัสพื้นที่
      postDate: postDoc, // วันที่ผ่านรายการ
      disbursementCode: item40.paymentCenter, // รหัสหน่วยเบิกจ่าย
      fiscPeriod: head.period, // งวด
      reference: head.refDocNo, // อ้างอิง
      yearSourceMoney: Number(head.fiscYear) + 543,
      sourceMoneyCode: item40.fundSource, // รหัสแหล่งของเงิน


      //ns
      dailyDate: dateDoc,
      typeReceive: head.docType, // ประเภทการรับเงิน
      typeMoney: item40.glAcc, // ประเภทเงิน
      bankBook: item40.bankBook,// Bank book
      amountMoneyDebit: item40.amount, // จำนวนเงินเดบิต
      digitAccountDeposit: item50.depositAcc.substr(-3, 3),// รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
      incomeCode: item50.income, //รหัสรายได้
      accountDepositCode: item40.depositAcc,// รหัสบัญชีเงินฝากคลัง
      ownAccountDepositCode: item40.depositAccOwner,// รหัสเจ้าของบัญชีเงินฝากคลัง
      amountMoneyCredit: item40.amount, // จำนวนเงินเครดิค
      //ns

      vendorTaxId: head.vendorTaxId, // เลขประจำตัวบัตรประชาชน /เลขประจำตัวผู้เสียภาษี
      vendorBankAccount: item40.bankAccNo, // เลขที่บัญชีเงินฝากธนาคาร
      descriptionDocument: head.headerDesc, // คำอธิบายเอกสาร
      pk: item40.postingKey,
      backupDocumentNo: head.brDocNo, // เลขที่เอกสารสำรองเงิน
      typeAccountCode: item40.glAcc, // รหัสบัญชีแยกประเภท
      centerCode: item40.costCenter, // รหัสศูนย์ต้นทุน
      sourceBudgetCode: item40.bgCode, // รหัสงบประมาณ
      mainActivityCode: item40.bgActivity, // รหัสกิจกรรมหลัก
      subActivityCode: item40.costActivity, // รหัสกิจกรรมย่อย
      subAccountCode: item40.subAcc, // รหัสบัญชีย่อย
      ownSubAccountCode: item40.subAccOwner, // รหัสเจ้าของบัญชีย่อย
      packageCode: item40.productGroup, // รหัสหมวดพัสดุ
      tradingPartnerCode: item40.tradingPartner, // รหัสหน่วยงานคู่ค้า
      amountMoney: item40.amount, // จำนวนเงิน
      detail: head.headerDesc // รายละเอียดบรรทัดรายการ
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
        accountDepositName: item.depositAccName,
        ownAccountDepositName: item.depositAccOwnerName,
        packageName: '',


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
        amountMoneyCredit: item.amount, // จำนวนเงินCredit

        detail: item.lineDesc // รายละเอียดบรรทัดรายการ
      };

      this.listDocument.push(data);

      // this.checkDocumentTypeFromCreate();

      // this.getTotalCost();
    });
    console.log(this.listDocument)
    const result = this.listDocument.find(item => item.pk === '40');
    result.detail = head.headerDesc

    this.listDocument.forEach(document => {
      if (document.pk === '50') {
        document.amountMoneyCredit = Number(document.amountMoneyCredit) * -1;

      }
    })
    console.log(this.listDocument)
    this.calculateTotalPrice();
    this.calculateTax();
    this.calculateFee();
    this.calculateNetPrice();
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
    // this.utils.checkValidateRequired(map, this.listValidate);
    // this.checkValidateWithDrawalAndPayment();
    // this.utils.checkValidateRelationshipData(value, this.listValidate);
    this.isSubmitedForm = true;
    if (this.listValidate.length <= 0) {
      this.isSubmitedForm = false;
      value.pk = '50';
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
      value.pk = '50';
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
    if (this.isDisabledFromSearch) {
      this.listDocument.forEach(document => {
        if (document.pk === '50') {
          totalPrice += document.amountMoneyCredit;
        }
      });
      this.totalPrice = totalPrice;
    }
    else {
      this.listDocument.forEach(document => {
        if (document.pk === '40') {
          totalPrice += document.amountMoneyCredit;
        }
      });
      this.totalPrice = totalPrice;
    }
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
      this.ns011FormCreate.disable();
    });
  }

  onTypeReceiveChange(event) {

    console.log(event)
    if (event == 'RA') {
      this.isDisabledFromTypeMoney = false;
      this.bankBookBidingName = ''
      this.ns011FormCreate.patchValue({
        bankBook: '',// Bank book
        digitAccountDeposit: '',// รหัสบัญชีเงินฝากคลัง (3หลักท้าย)
        incomeCode: '', //รหัสรายได้
  
        accountDepositCode: '',// รหัสบัญชีเงินฝากคลัง
        ownAccountDepositCode: '',// รหัสเจ้าของบัญชีเงินฝากคลัง
  
      });

    }
    else if (event == 'RB') {
      this.isDisabledFromTypeMoney = true;
    }
    if (this.isDisabledFromSearch) {
      this.clearInputFormtTypeReceive();
    }
  }
  onTypeMoneyChange(event) {
    if (event == '1101010101') {
      this.isDisabledFromTypeReceive = false;
    }
    else if (event == '1101020601') {
      this.isDisabledFromTypeReceive = false;
    }
    else if (event == '1101020606') {
      this.isDisabledFromTypeReceive = true;
    }
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
        const form = this.ns011FormCreate.value;
        console.log(form);
        const dayDocDate = form.dailyDate.getDate();
        const monthDocDate = form.dailyDate.getMonth() + 1;
        const yearDocDate = form.dailyDate.getFullYear();
        // const dayPostDocDate = form.postDate.getDate();
        // const monthPostDocDate = form.postDate.getMonth() + 1;
        // const yearPostDocDate = form.postDate.getFullYear();

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
          datePost: this.utils.parseDate(dayDocDate, monthDocDate, yearDocDate),
          docStatus: '',
          docType: form.typeReceive,
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
        this.generatePostingKey40(form, listItem)

        this.listDocument.forEach((order, index) => {
          const item = {
            accType: 'S',
            amount: order.amountMoneyCredit,
            assetNo: '',
            assetSubNo: '',
            assetTranType: '',
            assignment: '',
            bankAccNo: order.vendorBankAccount,
            bankBook: order.bankBook,
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

  generatePostingKey40(form, listItem) {
    const item40 = {
      accType: 'S',
      amount: form.amountMoneyDebit,
      assetNo: '',
      assetSubNo: '',
      assetTranType: '',
      assignment: '',
      bankAccNo: form.vendorBankAccount,
      bankBook: form.bankBook,
      bankBookName: '',
      bankBranchNo: '',
      bgActivity: form.mainActivityCode,
      bgActivityName: '',
      bgArea: form.areaCode,
      bgAreaName: '',
      bgCode: form.sourceBudgetCode,
      bgCodeName: '',
      brDocNo: form.backupDocumentNo,
      brLine: '',
      compCode: form.departmentCode,
      costActivity: form.subActivityCode,
      costActivityName: '',
      costCenter: form.centerCode,
      costCenterName: '',
      creditMemoDocNo: '',
      creditMemoFiscalYear: 0,
      dateBaseline: '',
      depositAcc: form.accountDepositCode,
      depositAccName: '',
      depositAccOwner: form.ownAccountDepositCode,
      depositAccOwnerName: '',
      fundSource: form.sourceMoneyCode,
      fundSourceName: '',
      glAcc: form.typeMoney,
      glAccName: '',
      gpsc: '',
      income: '',
      incomeName: form.incomeName,
      lineDesc: form.detail,
      paymentCenter: form.disbursementCode,
      paymentMethod: form.paymentMethod,
      paymentTerm: '',
      poDocNo: '',
      poLine: 0,
      postingKey: '40',
      productGroup: '',
      qty: 0,
      reference1: '',
      reference3: '',
      specialGl: '',
      subAcc: form.subAccountCode, // รหัสบัญชีย่อย
      subAccName: '',
      subAccOwner: form.ownSubAccountCode, // รหัสเจ้าของบัญชีย่อย
      subAccOwnerName: '',
      tradingPartherName: '',
      tradingPartner: form.tradingPartnerCode,
      tradingPartnerBusArea: '',
      uom: '',
      uomIso: '',
      vendor: '',
      vendorName: '',
      wtxAmount: '',
      wtxAmountP: '',
      wtxBase: '',
      wtxBaseP: '',
      wtxCode: '',
      wtxCodeP: '',
      wtxType: '',
      wtxTypeP: ''
    };
    listItem.push(item40)
    return listItem;
  }

  // openDialogSearchBudgetReserve(type) {
  //   const dialogRef = this.dialog.open(DialogSearchBudgetReserveComponent, {
  //     width: '70vw',
  //     data: { type }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result && result.event) {
  //       this.ns011FormCreate.patchValue({ [result.type]: result.value });
  //     }
  //   });
  // }
  openDialogSearch(type) {
    let specialCase: any;
    if (type === 'vendorBankAccount') {
      specialCase = {
        vendorTaxId: this.ns011FormCreate.get('vendorTaxId').value
      };
    }
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      width: '70vw',
      data: { type, specialCase }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event) {
        this.ns011FormCreate.patchValue({ [result.type]: result.value });
        if (type === 'vendorTaxId') {
          this.vendorTaxIdBindingName = result.name;
          if (result.value != undefined || result.value != null || result.value != '') {
            this.ns011FormCreate.controls.vendorBankAccount.enable();
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
          this.ns011FormCreate.patchValue({ ownAccountDepositCode: result.optional });
        } else if (type === 'incomeCode') {
          this.incomeBindingName = result.name;
        } else if (type === 'bankBook') {
          this.bankBookBidingName = result.name;
        }
      }
    });
  }
  onChangePostDate(event) {
    const date = event.value;
    this.utils.fisc_year = this.utils.calculateFiscYear(date);
    this.ns011FormCreate.patchValue({
      yearSourceMoney: this.utils.fisc_year
    });
  }

  onBlurSearch(type) {
    const form = this.ns011FormCreate.value;
    if (type === 'typeAccountCode') {
      this.masterService.findOneDataTypeAccount(form.typeAccountCode).subscribe(data => {
        const response = data as any;
        console.log('responce:', response);
        if (response) {
          this.ns011FormCreate.patchValue({
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
          this.ns011FormCreate.patchValue({
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
          this.ns011FormCreate.patchValue({
            sourceMoneyCode: response.valueCode
          });
          this.sourceMoneyCodeBindindName = response.name;
        }
      });
    } else if (type === 'sourceBudgetCode') {
      this.masterService.findOneDataSourceBudget(form.sourceBudgetCode).subscribe(data => {
        const response = data as any;
        if (response) {
          this.ns011FormCreate.patchValue({
            sourceBudgetCode: response.valueCode
          });
          this.sourceBudgetCodeBindingName = response.name;
        }
      });
    } else if (type === 'mainActivityCode') {
      this.masterService.findOneDataMainActivity(form.mainActivityCode).subscribe(data => {
        const response = data as any;
        if (response) {
          this.ns011FormCreate.patchValue({
            mainActivityCode: response.valueCode
          });
          this.mainActivityCodeBindingName = response.name;
        }
      });
    } else if (type === 'subActivityCode') {
      this.masterService.findOneDataSubActivity(form.subActivityCode).subscribe(data => {
        const response = data as any;
        if (response) {
          this.ns011FormCreate.patchValue({
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
          this.ns011FormCreate.patchValue({
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
          this.ns011FormCreate.patchValue({
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
