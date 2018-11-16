import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
  MatCardModule,
  MatSelectModule,
  MatRadioModule,
  MatMenuModule
} from "@angular/material";
import { RecordsService } from "./records.service";

import { ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "@angular/cdk/layout";
import { SettingsModule } from "./settings/settings.module";

import { RecordsComponent } from "./records/records.component";
import { AddRecordComponent } from "./add-record/add-record.component";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { RecordsContainerComponent } from "./records-container/records-container.component";
import { RecordDetailsComponent } from "./record-details/record-details.component";

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    AddRecordComponent,
    MonthPickerComponent,
    DeleteDialogComponent,
    ToolbarComponent,
    RecordsContainerComponent,
    RecordDetailsComponent
  ],
  imports: [
    BrowserModule,
    SettingsModule,
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
    MatDialogModule,
    MatMenuModule
  ],
  bootstrap: [AppComponent],
  providers: [AngularFirestore, AngularFireAuth, RecordsService],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule {}
