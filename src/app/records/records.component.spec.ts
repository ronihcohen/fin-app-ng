import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SimpleChange } from "@angular/core";
import {
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatDatepickerModule,
  MatCardModule
} from "@angular/material";

import { RecordsService } from "../records.service";

import { RecordsComponent } from "./records.component";
import { MonthPickerComponent } from "../month-picker/month-picker.component";
import { AngularFirestore } from "@angular/fire/firestore";
import { of } from "rxjs";

describe("RecordsComponent", () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;

  beforeEach(async(() => {
    const RecordsServiceMock = {
      getRecords: () =>
        of([
          {
            amount: 123,
            date: new Date(),
            familyID: "f-id",
            title: "title",
            uid: "u-id",
            id: "id"
          },
          {
            amount: 1234,
            date: new Date(),
            familyID: "f-id3",
            title: "title4",
            uid: "u-id5",
            id: "id6"
          }
        ])
    };
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
      providers: [
        { provide: AngularFirestore },
        { provide: RecordsService, useValue: RecordsServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should compile", () => {
    expect(component).toBeTruthy();
  });

  it("should render records", () => {
    expect(component).toBeTruthy();
    component.familyID = "f-id";

    component.ngOnChanges({
      familyID: new SimpleChange(null, component.familyID, null)
    });
    component.dataSource = null;
    fixture.detectChanges();
  });
});
