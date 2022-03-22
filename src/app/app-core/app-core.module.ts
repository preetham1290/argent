import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ModalModule
  ],
  providers: []
})
export class AppCoreModule { }
