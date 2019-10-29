import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ns022aRoutingModule } from './ns022a-routing.module';
import { Ns022aComponent } from './ns022a.component';
import { Ns0221aComponent } from './ns0221a/ns0221a.component';
import { Ns0222aComponent } from './ns0222a/ns0222a.component';
import { Ns0223aComponent } from './ns0223a/ns0223a.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Ns022aComponent, Ns0221aComponent, Ns0222aComponent, Ns0223aComponent],
  imports: [
    SharedModule,
    CommonModule,
    Ns022aRoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class Ns022aModule { }
