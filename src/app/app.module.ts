import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppCoreModule } from './app-core/app-core.module';
import { SortableTableDirective } from './table-functionality/sortable-column/sortable-table.directive';
import { SortableColumnComponent } from './table-functionality/sortable-column/sortable-column.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SortableColumnComponent,
    SortableTableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCoreModule,
    ModalModule.forRoot(),
    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
