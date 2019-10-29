import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ns03RoutingModule } from './ns03-routing.module';
import { Ns03Component } from './ns03.component';
import { Ns031Component } from './ns031/ns031.component';
import { Ns032Component } from './ns032/ns032.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Ns03Component, Ns031Component, Ns032Component],
  imports: [
    SharedModule,
    CommonModule,
    Ns03RoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class Ns03Module { }
