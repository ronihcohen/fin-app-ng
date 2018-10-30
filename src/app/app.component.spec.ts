import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RecordsContainerComponent } from './records-container/records-container.component';

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
} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { SettingsModule } from './settings/settings.module';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_BASE_HREF } from '@angular/common';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RecordsComponent,
        AddRecordComponent,
        MonthPickerComponent,
        DeleteDialogComponent,
        ToolbarComponent,
        RecordsContainerComponent,
      ],
      imports: [
        RouterTestingModule,
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
        MatDialogModule,
        SettingsModule,
        MatMenuModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fin-app-ng'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('fin-app-ng');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to fin-app-ng!');
  });
});
