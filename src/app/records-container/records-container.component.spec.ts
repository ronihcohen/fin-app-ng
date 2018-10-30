import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsContainerComponent } from './records-container.component';
import { RecordsComponent } from '../records/records.component';
import { AddRecordComponent } from '../add-record/add-record.component';
import { MonthPickerComponent } from '../month-picker/month-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule
} from '@angular/material';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
} from '@angular/fire/firestore';

import { of } from 'rxjs';

describe('RecordsContainerComponent', () => {
  let component: RecordsContainerComponent;
  let fixture: ComponentFixture<RecordsContainerComponent>;

  beforeEach(async(() => {
    const AngularFireAuthStub = {
      user: of({ uid: 'mock-uid' }),
    };

    TestBed.configureTestingModule({
      declarations: [
        RecordsContainerComponent,
        RecordsComponent,
        AddRecordComponent,
        MonthPickerComponent
      ],
      imports: [
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFirestore }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
