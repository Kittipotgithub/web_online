import { CurrencyPipe } from './shared/pipe/currency.pipe';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
// material angular
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { PagesModule } from '@pages/pages.module';
import { HeaderComponent } from '@shared/component/header/header.component';
import { ModalComponent } from '@shared/component/modal/modal/modal.component';
import { SidebarComponent } from '@shared/component/sidebar/sidebar.component';
import { Constant } from '@shared/constant';
import { GlobalObject } from '@shared/global-object';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Utils } from './shared/utils';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    SidebarComponent,

    ModalComponent
    // input
  ],
  imports: [
    PagesModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    NgxPaginationModule,
    MatProgressBarModule
  ],
  exports: [NgxPaginationModule],
  providers: [GlobalObject, Constant, FormBuilder, Utils,CurrencyPipe, 
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
