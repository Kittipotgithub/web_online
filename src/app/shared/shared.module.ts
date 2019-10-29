import { DialogSaveKbComponent } from './component/dialog-save-kb/dialog-save-kb.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeadContentComponent } from './component/head-content/head-content.component';
import { LoadingComponent } from './component/loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './component/footer/footer.component';
import { DialogSaveComponent } from './component/dialog-save/dialog-save.component';
import { DialogSearchComponent } from './component/dialog-search/dialog-search.component';
import { DialogReverseComponent } from './component/dialog-reverse/dialog-reverse.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NumberOnlyDirective } from './directives/number-only.directive';

import { CurrencyPipe } from './pipe/currency.pipe';
import { CurrencyDirective } from './directives/currency.directive';

import { ReactiveFormsModule } from '@angular/forms';
import { DialogSpecifyGeneralTextComponent } from './component/dialog-specify-general-text/dialog-specify-general-text.component';
import { DialogSpecifyItemTextComponent } from './component/dialog-specify-item-text/dialog-specify-item-text.component';
import { ThaidatePipe } from './pipe/thaidate.pipe';
import { DialogExportXmlComponent } from './component/dialog-export-xml/dialog-export-xml.component';

import { MatTabsModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';

import { DatepickerHeaderComponent } from './component/datepicker-header/datepicker-header.component';
import { DialogSaveProgressBarComponent } from './component/dialog-save-progress-bar/dialog-save-progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    HeadContentComponent,
    FooterComponent,
    LoadingComponent,

    NumberOnlyDirective,
    CurrencyDirective,
    CurrencyPipe,
    ThaidatePipe,

    DialogSaveComponent,

    DialogSearchComponent,


    DialogReverseComponent,
    DialogSaveKbComponent,
    DialogExportXmlComponent,

    DialogSpecifyGeneralTextComponent,
    DialogSpecifyItemTextComponent,

    DatepickerHeaderComponent,
    DialogSaveProgressBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxPaginationModule,
    MatProgressBarModule
  ],
  exports: [HttpClientModule, HeadContentComponent, FooterComponent, LoadingComponent, NumberOnlyDirective, CurrencyDirective, ThaidatePipe]
})
export class SharedModule { }
