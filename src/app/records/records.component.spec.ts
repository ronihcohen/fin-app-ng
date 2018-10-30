import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatDatepickerModule,
  MatCardModule,
} from '@angular/material';

import { RecordsComponent } from './records.component';
import { MonthPickerComponent } from '../month-picker/month-picker.component';
import {
  AngularFirestore,
} from '@angular/fire/firestore';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsComponent, MonthPickerComponent],
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
      ],
      providers: [{ provide: AngularFirestore }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
