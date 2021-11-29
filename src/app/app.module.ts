import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTableComponent } from './components/pages/page-table/page-table.component';
import { PageLoginComponent } from './components/pages/page-login/page-login.component';
import { TableComponent } from './components/pages/page-table/table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './network/jwt.interceptor';
import { BtnCellRendererComponent } from './components/pages/page-table/btn-cell-renderer/btn-cell-renderer.component';
import { PopupModifyRowComponent } from './components/pages/page-table/popup-modify-row/popup-modify-row.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageTableComponent,
    PageLoginComponent,
    TableComponent,
    BtnCellRendererComponent,
    PopupModifyRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([BtnCellRendererComponent]),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
