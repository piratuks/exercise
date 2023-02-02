import { NgModule } from '@angular/core';

import { routing } from './test-view.page.router.module';
import {TestViewPage} from './test-view.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import {TabsModule} from 'ngx-tabset';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    routing,
    NgxSpinnerModule,
    TabsModule,
    CommonModule,
    MDBBootstrapModule,
    FormsModule,
    DlDateTimeDateModule, 
    DlDateTimePickerModule
  ],
  declarations: [TestViewPage],
  providers: [DatePipe]
})
export class TestViewPageModule {


}
