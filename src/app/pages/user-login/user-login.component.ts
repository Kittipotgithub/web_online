import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfile } from '@core/models/user-profile';
import { UserProfileService } from '@core/services/user-profile.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/services';
import { WebInfoService } from '@core/services/web-info.service';
import { WebInfo } from '@core/models/web-info';
import { SidebarService } from '@core/services/sidebar.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Utils } from '@shared/utils';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  login: FormGroup;

  usernameControl: FormControl; // รหัสหน่วยงาน

  userProfile$: Observable<UserProfile>; // สำหรับไปโชว์ที่ template
  private _destroyed$ = new Subject();

  listValidate = [];

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private webInfoService: WebInfoService,
    private sidebarService: SidebarService,
    private utils: Utils
  ) {}

  ngOnInit() {
    this.createFormControl();
    this.createFormGroup();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  createFormControl() {
    // checked
    this.usernameControl = this.formBuilder.control(''); // username
  }

  createFormGroup() {
    // checked
    this.login = this.formBuilder.group({
      username: this.usernameControl // username
    });
  }

  getUserOneByUsername(username): Observable<any> {
    const payload = {
      username
    };
    return this.userProfileService.getOneByUsername(payload);
  }
  submitClick() {
    const form = this.login.value;
    let username = form.username;
    // const map = this.addKeyValidate(form);
    // this.listValidate = [];
    // this.utils.checkValidateRequired(map, this.listValidate);
    if (!username) {
      username = '120050000110';
    }

    this.getUserOneByUsername(username).subscribe(data => {
      const result = data.data as UserProfile;
      this.localStorageService.setUserProfile(result);
      this.webInfoService.getIPAddress().subscribe((ipAddress: any) => {
        console.log(result);
        const webInfo: WebInfo = {
          bgArea: result.userdata.areaCode,
          compCode: result.userdata.departmentCode,
          ipAddress: ipAddress.ip,
          paymentCenter: result.userdata.divisionCode,
          userWeb: result.userdata.username
        };
        this.localStorageService.setWebInfo(webInfo);
        this.sidebarService.updateUserProfile(result);
        this.router.navigate(['/menu']);
      });
    });

    // sessionStorage.setItem('user_data', '1');
    // this.globalObject.userData = {
    //   name: 'สมชาย ใจดี',
    //   position: 'นักวิชาการเงินและบัญชี',
    //   deapartment: 'สำนักงานเลขานุการกรม กรมพัฒนาพลังงานทดแทน&อนุร',
    //   username: '120050000110'
    // };
    // this.router.navigate(['/menu']);
  }

  addKeyValidate(value) {
    const keyValidate = new Map();
    keyValidate.set('username', value.username);
    return keyValidate;
  }
}
