import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ns021RoutingModule } from './ns021-routing.module';
import { Ns021Component } from './ns021.component';
import { Ns0211Component } from './ns0211/ns0211.component';
import { Ns0212Component } from './ns0212/ns0212.component';
import { Ns0213Component } from './ns0213/ns0213.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Ns021Component, Ns0211Component, Ns0212Component, Ns0213Component],
  imports: [
    SharedModule,
    CommonModule,
    Ns021RoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class Ns021Module { }
