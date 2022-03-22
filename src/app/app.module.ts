import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppCoreModule } from './app-core/app-core.module';
import { DoubleTapDirective } from './landing-page/double-tap.directive';
import { SortableTableDirective } from './table-functionality/sortable-column/sortable-table.directive';
import { SortableColumnComponent } from './table-functionality/sortable-column/sortable-column.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DoubleTapDirective,
    SortableColumnComponent,
    SortableTableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCoreModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
