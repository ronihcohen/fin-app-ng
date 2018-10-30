import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsContainerComponent } from './records-container.component';
import { RecordsComponent } from '../records/records.component';
import { AddRecordComponent } from '../add-record/add-record.component';
import { MonthPickerComponent } from '../month-picker/month-picker.component';

import {
  MatCardModule,
} from '@angular/material';

describe('RecordsContainerComponent', () => {
  let component: RecordsContainerComponent;
  let fixture: ComponentFixture<RecordsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecordsContainerComponent,
        RecordsComponent,
        AddRecordComponent,
        MonthPickerComponent
      ],
      imports: [
        MatCardModule
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
