import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatInputModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule, MatSelectModule, MatRadioModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { RecordsComponent } from './records/records.component';
import { RecordsService } from './records.service';
import { AddRecordComponent } from './add-record/add-record.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FamilyFormComponent } from './family-form/family-form.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecordsComponent,
    AddRecordComponent,
    FamilyFormComponent,
    MonthPickerComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent],
  providers: [AngularFirestore, AngularFireAuth, RecordsService],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule { }
