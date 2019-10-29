import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ns01RoutingModule } from './ns01-routing.module';
import { Ns01Component } from './ns01.component';
import { Ns011Component } from './ns011/ns011.component';
import { Ns012Component } from './ns012/ns012.component';
import { Ns013Component } from './ns013/ns013.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Ns01Component, Ns011Component, Ns012Component, Ns013Component],
  imports: [
    SharedModule,
    CommonModule,
    Ns01RoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class Ns01Module { }
