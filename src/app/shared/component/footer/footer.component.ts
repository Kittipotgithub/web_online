import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  appVersion = '0.4.65';
  constructor() {
    this.appVersion = this.appVersion;
  }

  ngOnInit() {}
}
