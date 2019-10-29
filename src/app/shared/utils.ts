export class Utils {
  public current = new Date().getFullYear() + 543;
  private past = this.current - 6;
  private future = this.current + 8;
  public fisc_year = 0;
  public fisc_period = [];
  public round = '0';

  private listAllValidateRequired = new Map([
    ['department', 'กรุณา กรอก รหัสหน่วยงาน'],
    ['documentDate', 'กรุณา กรอก วันที่เอกสาร'],
    ['areaCode', 'กรุณา กรอก รหัสพื้นที่'],
    ['postDate', 'กรุณา กรอก วันที่ผ่านรายการ'],
    ['disbursementCode', 'กรุณา กรอก รหัสหน่วยเบิกจ่าย'],
    ['documentType', 'กรุณา กรอก ประเภทเอกสาร'],
    ['reserveDocument', 'กรุณา กรอก reserveDocument'],
    ['typeAccountCode', 'กรุณา กรอก รหัสบัญชีแยกประเภท'],
    ['centerCode', 'กรุณา กรอก รหัสศูนย์ต้นทุน'],
    // ['yearSourceMoney', 'กรุณา กรอก yearSourceMoney'],
    ['sourceMoneyCode', 'กรุณา กรอก แหล่งของเงิน'],
    ['sourceBudgetCode', 'กรุณา กรอก รหัสงบประมาณ'],
    ['mainActivityCode', 'กรุณา กรอก รหัสกิจกรรมหลัก'],
    ['subActivityCode', 'กรุณา กรอก รหัสกิจกรรมย่อย'],
    ['accountDepositCode', 'กรุณา กรอก รหัสบัญชีเงินฝากคลัง'],
    ['ownAccountDepositCode', 'กรุณา กรอก   รหัสเจ้าของบัญชีเงินฝากคลัง'],
    ['subAccountCode', 'กรุณา กรอก รหัสบัญชีย่อย'],
    ['ownSubAccountCode', 'กรุณา กรอก  รหัสเจ้าของบัญชีย่อย'],
    ['subBookBankCode', 'กรุณา กรอก subBookBankCode'],
    ['packageCode', 'กรุณา กรอก รหัสหมวดพัสดุ'],
    ['tradingPartnerCode', 'กรุณา กรอก tradingPartnerCode'],
    ['incomeCode', 'กรุณา กรอก รหัสรายได้'],
    ['docNoMinistry', 'กรุณา กรอก เลขที่หนังสือกระทรวงการคลัง'],
    ['amountMoney', 'กรุณา กรอก จำนวนเงิน'],
    ['lineDescription', 'กรุณา กรอก รายละเอียดบรรทัดรายการ'],

    ['citizenId', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี'],
    ['nameTH', 'กรุณา กรอก ชื่อ(ภาษาไทย)'],
    ['typeGroupSeller', 'กรุณา เลือก ประเภทกลุ่มผู้ขาย'],
    ['bankAccountNo', 'กรุณา กรอก หมายเลขบัญชีธนาคาร'],
    ['branchNo', 'กรุณา กรอก รหัสธนาคาร'],
    ['ownAccountNameEN', 'กรุณา กรอก ชื่อเจ้าของบัญชี (ภาษาอังกฤษ)'],

    ['numberContract', 'กรุณา กรอก เลขที่ใบสั่งซื้อ/สัญญา'],
    ['taxIDSeller', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี(ผู้ขาย)'],

    ['gpscCode', 'กรุณา กรอก รหัส GPSC'],
    ['unitForOrder', 'กรุณา กรอก ราคาต่อหน่วย'],
    ['additionalText', 'กรุณา กรอก ข้อความเพิ่มเติม'],
    ['amountForOrder', 'กรุณา กรอก จำนวนที่สั่งซื้อ'],
    ['pricePerUnit', 'กรุณา กรอก ราคาต่อหน่วย'],
    ['vendorTaxId', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี(ผู้ขาย)'],
    ['vendorBankAccount', 'กรุณา กรอก เลขที่บัญชีเงินฝากธนาคาร'],

    ['GFMISNo', 'กรุณา กรอก เลขที่ใบสั่งซื้อระบบ GFMIS'],
    ['vendorCancelOrderCode', 'กรุณา กรอก ผู้ขอยกเลิก(ผู้ขาย)'],
    ['reasonCancelOrder', 'กรุณา กรอก เหตุผลในการยกเลิก'],
    ['explanationReasonCancelOrder', 'กรุณา กรอก คำอธิบายเหตุผลในการยกเลิก'],

    ['budgetAccount', 'กรุณา กรอก รายการผูกพันงบประมาณ'],
    ['headerText', 'กรุณา กรอก ข้อความ'],
    ['reasonCode', 'กรุณา กรอก เหตุผล'],
    ['reasonDescription', 'กรุณา กรอก รายละเอียดเหตุผล'],
    ['reference', 'กรุณา กรอก การอ้างอิง'],

    ['description', 'กรุณา กรอก รายการ'],
    ['vendorName', 'กรุณา กรอก รายชื่อเจ้าหนี้'],
    ['define', 'กรุณา กรอก การกำหนด'],

    ['assetCode', 'กรุณา กรอก  หมวดสินทรัพย์'],
    ['explanation1', 'กรุณา กรอก คำอธิบาย 1'],
    ['productNumber', 'กรุณา กรอก  เลขที่ผลิตภัณฑ์'],
    ['unit', 'กรุณา กรอก 	หน่วย'],
    ['username', 'กรุณา กรอก 	รหัสผู้ใช้งาน'],
    ['amountMoneyCredit', 'กรุณา กรอก 	จำนวนเงินเครดิต'],
    ['amountMoneyDebit', 'กรุณา กรอก 	จำนวนเงินเดบิต']
  ]);

  private listReverseValidateRequired = new Map([
    ['docNo', 'กรุณา กรอก เลขที่ใบบันทึกรายการบัญชี'],
    ['reverseReason', 'กรุณา กรอก เหตุผลในการกลับรายการ']
  ]);

  private listSearchNormalValidateRequired = new Map([
    ['docNoFrom', 'กรุณา กรอก เลขที่เอกสารขอเบิก'],
    ['docNoTo', 'กรุณา กรอก เลขที่เอกสารขอเบิก'],
    ['GFMISNoFrom', 'กรุณากรอก รหัสผู้ขายในระบบ GFMIS'],
    ['GFMISNoTo', 'กรุณา กรอก รหัสผู้ขายในระบบ GFMIS'],
    ['citizenId', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี'],
    ['assetNoMainFrom', 'กรุณา กรอก เลขที่สินทรัพย์หลัก']
  ]);

  private listSearchNormalBCValidateRequired = new Map([
    ['docNoFrom', 'กรุณา กรอก เลขที่ใบบันทึกรายการบัญชี'],
    ['docNoTo', 'กรุณา กรอก เลขที่ใบบันทึกรายการบัญชี']
  ]);

  private listCancelValidateRequired = new Map([
    ['docNo', 'กรุณา กรอก เลขที่เอกสารสำรองเงิน'],
    ['cancelReason', 'กรุณา กรอก เหตุผลในการขอยกเลิก']
  ]);

  public checkValidateRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listAllValidateRequired) {
          if (key1 === key2) {
            if (!value1) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public CalculateYear() {
    const listYear = [];
    for (let i = this.past; i <= this.future; i++) {
      listYear.push({ id: i, name: i });
    }
    return listYear;
  }

  public checkInputNumberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public checkValidateCenterCodeAndBudgetCode(value, listValidate) {
    const centerCode = value.centerCode.substr(0, 5); // รหัสศูนย์ต้นทุน 5 หลักแรก
    const budgetCode = value.budgetCode.substr(0, 5); // รหัสงบประมาณ 5 หลักแรก

    if (centerCode !== budgetCode) {
      listValidate.push('รหัสศูนย์ต้นทุน และ รหัสงบประมาณ ไม่ถูกต้องตามเงื่อนไข '); // รหัสงบประมาณ 5 หลักแรก = รหัสศูนย์ต้นทุน 5 หลักแรก
    }
  }
  public checkValidateSubAccountAndOwnSubAccount(value, listValidate) {
    const subAccount = value.subAccount; //   รหัสบัญชีย่อย
    const ownSubAccount = value.ownSubAccount; //    รหัสเจ้าของบัญชีย่อย

    const tHead = 'กรุณากรอก';
    if (subAccount && !ownSubAccount) {
      listValidate.push(tHead + 'รหัสเจ้าของบัญชีย่อย ');
    } else if (!subAccount && ownSubAccount) {
      listValidate.push(tHead + 'รหัสบัญชีย่อย ');
    }
  }
  public checkCreditWithDebit(debit, credit, listValidate) {
    const costDebit = debit; //   เดบิตทั้งหมด
    const costCredit = credit; //    เครดิตทั้งหมด

    if (costDebit !== costCredit) {
      listValidate.push(' จำนวนเงิน เดบิต และ เครดิต  ไม่เท่ากัน ');
    }
    return listValidate;
  }
  public checkValidateAccountDepositAndOwnAccountDeposit(value, listValidate) {
    const accountDeposit = value.accountDeposit; //  รหัสบัญชีเงินฝากคลัง
    const ownAccountDeposit = value.ownAccountDeposit; //  รหัสเจ้าของบัญชีเงินฝากคลัง

    const tHead = 'กรุณากรอก';
    if (accountDeposit && !ownAccountDeposit) {
      listValidate.push(tHead + 'รหัสเจ้าของบัญชีเงินฝากคลัง ');
    } else if (!accountDeposit && ownAccountDeposit) {
      listValidate.push(tHead + 'รหัสบัญชีเงินฝากคลัง ');
    }
  }

  public checkValidateRelationshipData(value, listValidate) {
    const sourceBudgetCode = value.sourceBudgetCode ? value.sourceBudgetCode.toString() : ''; // รหัสงบประมาณ
    const mainActivityCode = value.mainActivityCode ? value.mainActivityCode.toString() : ''; // รหัสกิจกรรมหลัก
    const departmentCode = value.departmentCode ? value.departmentCode.toString() : ''; // รหัสศูนย์ต้นทุน
    const sourceMoneyCode = value.sourceMoneyCode ? value.sourceMoneyCode.toString() : ''; // แหล่งของเงิน
    const areaCode = value.areaCode ? value.areaCode.toString() : ''; // รหัสพื้นที่

    const year = value.GJAHR !== null && value.GJAHR !== undefined ? value.GJAHR : 0;
    const chkYear = year;

    if (sourceBudgetCode.length >= 5) {
      // const gsber_from_kostl = areaCode;
      // const gsber_from_fkber = mainActivityCode;
      // const areaCode = areaCode;

      const sourceBudgetCodeFiveCharacters = sourceBudgetCode.substr(0, 5); // รหัสงบประมาณ 5 หลักแรก
      const mainActivityCodeFiveCharacters = mainActivityCode.substr(0, 5); // รหัสกิจกรรมหลัก 5 หลักแรก
      const departmentCodeFiveCharacters = departmentCode.substr(0, 5); // รหัสศูนย์ต้นทุน 5 หลักแรก

      let checked = false;

      // console.log('checkedcheckedcheckedcheckedcheckedchecked')
      // console.log(sourceBudgetCode)
      // console.log(mainActivityCode)
      // console.log(departmentCode)
      // console.log(sourceMoneyCode)
      // console.log(areaCode)
      // console.log(sourceBudgetCodeFiveCharacters)
      // console.log(mainActivityCodeFiveCharacters)
      // console.log(departmentCodeFiveCharacters)

      // const tHead = 'กรุณากรอก';
      const tHead = '';
      if (
        sourceMoneyCode.substr(2, 2) === '19' &&
        sourceBudgetCodeFiveCharacters === departmentCodeFiveCharacters &&
        areaCode === mainActivityCodeFiveCharacters
      ) {
        checked = true;
      } else if (
        (sourceMoneyCode.substr(2, 1) === '2' || sourceMoneyCode.substr(2, 1) === '3') &&
        sourceBudgetCode.length === 5 &&
        sourceBudgetCodeFiveCharacters === departmentCodeFiveCharacters &&
        areaCode === mainActivityCodeFiveCharacters
      ) {
        checked = true;
      } else if (sourceMoneyCode.substr(2, 1) === '1') {
        if (
          (sourceMoneyCode.substr(2, 2) === '11' || sourceMoneyCode.substr(2, 2) === '10') &&
          sourceBudgetCode.length === 20 &&
          sourceBudgetCodeFiveCharacters === departmentCodeFiveCharacters &&
          departmentCodeFiveCharacters === mainActivityCodeFiveCharacters
        ) {
          checked = true;
        } else if (
          sourceMoneyCode.substr(2, 2) === '11' &&
          sourceBudgetCode.length === 20 &&
          sourceBudgetCodeFiveCharacters === '80808' &&
          mainActivityCodeFiveCharacters === '80808'
        ) {
          checked = true;
        } else if (
          sourceMoneyCode.substr(2, 2) === '13' &&
          (sourceBudgetCode.length === 13 ||
            sourceBudgetCode.length === 15 ||
            sourceBudgetCode.length === 17 ||
            sourceBudgetCode.length === 20) &&
          sourceBudgetCodeFiveCharacters === '90909'
        ) {
          checked = true;
        }
      } else if (
        sourceMoneyCode.substr(2, 1) === '4' &&
        sourceBudgetCode.length === 20 &&
        sourceBudgetCodeFiveCharacters === departmentCodeFiveCharacters
      ) {
        checked = true;
      } else if (
        sourceMoneyCode.substr(2, 2) === '41' &&
        (sourceBudgetCode.length === 13 ||
          sourceBudgetCode.length === 15 ||
          sourceBudgetCode.length === 17 ||
          sourceBudgetCode.length === 20) &&
        sourceBudgetCodeFiveCharacters === '90909'
      ) {
        checked = true;
      } else {
        checked = false;
      }
      if (!checked) {
        listValidate.push('แหล่งของเงิน รหัสงบประมาณ รหัสศูนย์ต้นทุน และ รหัสกิจกรรมหลัก ไม่ถูกต้องตามเงื่อนไข !');
      }
      const geberYY = sourceMoneyCode.substr(0, 2);
      if (year !== null && year !== 0) {
        console.log(geberYY);
        console.log(chkYear.toString().substr(-2));
        if (geberYY !== chkYear.toString().substr(-2)) {
          listValidate.push('กรอกแหล่งของเงินไม่ถูกต้อง (ระบุเป็นปี 2 หลัก+running no. 5 หลัก)');
        }
      }

      return listValidate;
    }
  }

  public checkValidateReverseRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listReverseValidateRequired) {
          if (key1 === key2) {
            if (!value1) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public checkValidateSearchBCNormalRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listSearchNormalBCValidateRequired) {
          if (key1 === key2) {
            if (!value1) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public checkValidateSearchNormalRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listSearchNormalValidateRequired) {
          if (key1 === key2) {
            if (!value1) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public checkValidateCancelRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listCancelValidateRequired) {
          if (key1 === key2) {
            if (!value1) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public parseDate(day, month, year) {
    // let day = date.getDate()
    day = +day < 10 ? '0' + day : day;
    // let month = date.getMonth()
    month = +month < 10 ? '0' + month : month;

    // fix year by TANG Change
    // const newDate = new Date();
    // if (newDate.getFullYear() < year) {
    //   year = year - 543;
    // } else {
    //   year = year;
    // }
    return year + '-' + month + '-' + day;
  }

  /*
   * for backup parse date
   *
   * */
  public parseDateBackup(day, month, year) {
    // let day = date.getDate()
    day = +day < 10 ? '0' + day : day;
    // let month = date.getMonth()
    month = +month < 10 ? '0' + month : month;

    return year + '-' + month + '-' + day;
  }

  public calculateFiscYear(date: Date) {
    const month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month >= 10) {
      return (year = date.getFullYear() + 544); // old code
    } else {
      return year + 543; // old code
    }
  }

  public calculateRound(date: Date) {
    const month = date.getMonth() + 1;
    if (month >= 4 && month <= 9) {
      return '1';
    } else {
      return '2';
    }
  }
  public calculateFiscPeriod(date: Date) {
    this.fisc_period = [];
    const listFiscPeriod = [];
    const relationshipPeriod = new Map();
    relationshipPeriod.set('1', '4');
    relationshipPeriod.set('2', '5');
    relationshipPeriod.set('3', '6');
    relationshipPeriod.set('4', '7');
    relationshipPeriod.set('5', '8');
    relationshipPeriod.set('6', '9');
    relationshipPeriod.set('7', '10');
    relationshipPeriod.set('8', '11');
    relationshipPeriod.set('9', '12');
    relationshipPeriod.set('10', '1');
    relationshipPeriod.set('11', '2');
    relationshipPeriod.set('12', '3');

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month === 9 && day === 30) {
      listFiscPeriod.push('13');
      listFiscPeriod.push('14');
      listFiscPeriod.push('15');
      listFiscPeriod.push('16');
      this.fisc_period = listFiscPeriod;
      return listFiscPeriod;
    } else {
      const result = relationshipPeriod.get(month.toString());
      listFiscPeriod.push(result);
      this.fisc_period = listFiscPeriod;
      return listFiscPeriod;
    }
  }

  public parseOrderNoToString(orderNo) {
    let s = orderNo;
    while (s.length < 4) {
      s = '0' + s;
    }
    console.log('s ===', s);
    return s;
  }

  public parseOrderNoToNumber(orderNo) {
    let s = orderNo;
    while (s.length < 4) {
      s = '0' + s;
    }
    console.log('s ===', s);
    return s;
  }

  public convertYearToAD(year: string): string {
    if (year) {
      const buddhistYear = Number(year);
      const adYear = buddhistYear - 543;
      return adYear.toString();
    } else {
      return new Date().getFullYear.toString();
    }
  }

  public convertYearToBuddhist(year: string): number {
    if (year) {
      const AD = Number(year);
      const buddhistYear = AD + 543;
      return buddhistYear;
    } else {
      return new Date().getFullYear();
    }
  }

  public covertMonthNameThai(fullMonth: string) {
    const month = fullMonth.split('-')[0];
    let monthThai = '';
    switch (month) {
      case 'Jan':
        monthThai = ' มกราคม ';
        break;
      case 'Feb':
        monthThai = ' กุมภาพันธ์ ';
        break;
      case 'Mar':
        monthThai = ' มีนาคม ';
        break;
      case 'Apr':
        monthThai = ' เมษายน ';
        break;
      case 'May':
        monthThai = ' พฤษภาคม ';
        break;
      case 'Jun':
        monthThai = ' มิถุนายน ';
        break;
      case 'Jul':
        monthThai = ' กรกฎาคม ';
        break;
      case 'Aug':
        monthThai = ' สิงหาคม ';
        break;
      case 'Sep':
        monthThai = ' กันยายน ';
        break;
      case 'Oct':
        monthThai = ' ตุลาคม ';
        break;
      case 'Nov':
        monthThai = ' พฤศจิกายน ';
        break;
      case 'Dec':
        monthThai = ' ธันวาคม ';
        break;
      default:
        monthThai = '';
        break;
    }
    return monthThai;
  }
}
