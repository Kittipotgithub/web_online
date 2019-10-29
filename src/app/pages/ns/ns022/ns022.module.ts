import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ns022RoutingModule } from './ns022-routing.module';
import { Ns022Component } from './ns022.component';
import { Ns0221Component } from './ns0221/ns0221.component';
import { Ns0222Component } from './ns0222/ns0222.component';
import { Ns0223Component } from './ns0223/ns0223.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Ns022Component, Ns0221Component, Ns0222Component, Ns0223Component],
  imports: [
    SharedModule,
    CommonModule,
    Ns022RoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class Ns022Module { }
