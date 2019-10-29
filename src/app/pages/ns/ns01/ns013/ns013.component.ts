import { Component, OnInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { UserProfile } from '@core/models/user-profile';
import { DatepickerHeaderComponent } from '@shared/component/datepicker-header/datepicker-header.component'

@Component({
  selector: 'app-ns013',
  templateUrl: './ns013.component.html',
  styleUrls: ['./ns013.component.scss']
})
export class Ns013Component implements OnInit {
  listValidate = []

  isLoading: boolean = false
  userProfile: UserProfile;
  public datePickerHeader = DatepickerHeaderComponent;
  constructor(
    public constant: Constant,

  ) { }

  ngOnInit() {
  }

  submitReverse() {

  }

}
