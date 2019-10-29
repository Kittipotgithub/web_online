import { Component, OnInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-ns022',
  templateUrl: './ns022.component.html',
  styleUrls: ['./ns022.component.scss']
})
export class Ns022Component implements OnInit {
  topic = 'การรับเงินของหน่วยงาน (นส. 022)';
  description = 'สร้างการรับเงินของหน่วยงาน';

  constructor(public constant: Constant, private router: Router, private sidebarService: SidebarService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((value: any) => {
      const urlName = value.url;
      if (urlName.indexOf('ns0221') > 0) {
        this.description = 'สร้างการรับเงินของหน่วยงาน';
      } else if (urlName.indexOf('ns0222')  > 0) {
        this.description = ' กลับรายการการรับเงินของหน่วยงาน';
      } else if (urlName.indexOf('ns0223')  > 0) {
        this.description = 'ค้นหาข้อมูลการรับเงินของหน่วยงาน';
      }
    });
  }

  ngOnInit() {
    this.sidebarService.updatePageType('ns1');
    this.sidebarService.updateNowPage('ns022');
  }

}
