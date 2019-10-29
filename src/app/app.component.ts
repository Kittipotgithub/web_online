import { Constant } from '@shared/constant';
import { Utils } from './shared/utils';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalObject } from '@shared/global-object';
import { MasterService } from '@core/services/master/master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'newgf-client';

  isShowSidebar;
  errorMessage = '';
  constructor(public globalObject: GlobalObject, private masterService: MasterService, private utils: Utils, private constant: Constant) {
    this.utils.fisc_period = this.utils.calculateFiscPeriod(new Date()); // หางวด
    this.utils.fisc_year = this.utils.calculateFiscYear(new Date());
    this.utils.round = this.utils.calculateRound(new Date());
    this.constant.LIST_YEAR = this.utils.CalculateYear();
  }

  ngOnInit() {
    console.log('globalObject is show menu ', this.globalObject.isShowMenu);
  }

  ngAfterViewInit(): void {
    this.loadAreaCode();
  }
  loadAreaCode() {
    this.errorMessage = '';
    this.masterService.findAreaCodeWithParam('').subscribe(data => {
      const response = data as any;
      if (response.status === 'T') {
        console.log(response);
        this.constant.LIST_AREA_CODE = response.data;
      } else {
        this.errorMessage = response.message;
      }
    });
  }
}
