import { Component, OnInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-ns03',
  templateUrl: './ns03.component.html',
  styleUrls: ['./ns03.component.scss']
})
export class Ns03Component implements OnInit {
  topic = 'การรับเงินแทนกัน (นส. 03)';
  description = 'สร้างข้อมูลการรับเงินแทนกัน';

  constructor(public constant: Constant, private router: Router, private sidebarService: SidebarService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((value: any) => {
      const urlName = value.url;
      if (urlName.indexOf('ns031') > 0) {
        this.description = 'สร้างข้อมูลการรับเงินแทนกัน';
      } else if (urlName.indexOf('ns032')  > 0) {
        this.description = ' ค้นหาข้อมูลการรับเงินแทนกัน';
      }
    });
  }

  ngOnInit() {
    this.sidebarService.updatePageType('ns1');
    this.sidebarService.updateNowPage('ns03');
  }

}
