import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ns021aRoutingModule } from './ns021a-routing.module';
import { Ns021aComponent } from './ns021a.component';
import { Ns0211aComponent } from './ns0211a/ns0211a.component';
import { Ns0212aComponent } from './ns0212a/ns0212a.component';
import { Ns0213aComponent } from './ns0213a/ns0213a.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Ns021aComponent, Ns0211aComponent, Ns0212aComponent, Ns0213aComponent],
  imports: [
    SharedModule,
    CommonModule,
    Ns021aRoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class Ns021aModule { }
