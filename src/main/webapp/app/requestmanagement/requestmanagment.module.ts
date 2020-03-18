import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestComponent } from 'app/requestmanagement/request/request.component';
import { REQUEST_ROUTE } from 'app/requestmanagement/request/request.route';
import { RequestHistoryComponent } from 'app/requestmanagement/request/requesthistory.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'app/material.module';

@NgModule({
  imports: [
    RouterModule.forChild(REQUEST_ROUTE),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule
  ],
  declarations: [RequestComponent, RequestHistoryComponent],
  entryComponents: [],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequestmanagmentModule {}
