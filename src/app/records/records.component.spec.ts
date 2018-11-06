import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SimpleChange } from "@angular/core";
import {
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatDatepickerModule,
  MatCardModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialog
} from "@angular/material";
import * as _moment from "moment";

import { RecordsService } from "../records.service";

import { RecordsComponent } from "./records.component";
import { MonthPickerComponent } from "../month-picker/month-picker.component";
import { AngularFirestore } from "@angular/fire/firestore";
import { of } from "rxjs";

describe("RecordsComponent", () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let RecordsServiceMock;

  beforeEach(async(() => {
    RecordsServiceMock = jasmine.createSpyObj("RecordsService", [
      "getRecords",
      "deleteRecord",
      "addRecord"
    ]);
    RecordsServiceMock.getRecords.and.returnValue(
      of([
        {
          amount: 1,
          date: new Date(),
          familyID: "f-id1",
          title: "title1",
          uid: "u-id1",
          id: "id1"
        },
        {
          amount: 2,
          date: new Date(),
          familyID: "f-id2",
          title: "title2",
          uid: "u-id2",
          id: "id2"
        }
      ])
    );

    class MatDialogMock {
      open() {
        return {
          afterClosed: () => of(true, false)
        };
      }
    }

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
        MatInputModule,
        MatMenuModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: AngularFirestore },
        { provide: RecordsService, useValue: RecordsServiceMock },
        {
          provide: MatDialog,
          useClass: MatDialogMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should filter records by search value", () => {
    expect(component).toBeTruthy();
    component.displayedColumns = ["title", "amount"];
    component.handleDateChange(_moment());
    component.ngOnChanges({
      familyID: new SimpleChange("fi-id2", "fi-id1", null)
    });
    fixture.detectChanges();

    const recordElement: HTMLElement = fixture.nativeElement;
    const searchInput: HTMLInputElement = recordElement.querySelector(
      "#search-input"
    );
    const columnTitle = recordElement.querySelector(
      ".mat-row .mat-column-title"
    );
    searchInput.value = "title1";
    searchInput.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    expect(component.dataSource.dataLength).toEqual(1);
    expect(columnTitle.textContent).toEqual(" title1 ");
    expect(columnTitle.textContent).not.toEqual(" title2 ");
  });

  it("should handle delete record", () => {
    component.handleDeleteClick({ id: "id" });
    expect(RecordsServiceMock.deleteRecord).toHaveBeenCalled();
  });

  it("should clone record", () => {
    component.cloneRecord({ title: "title", amount: 5 });
    expect(RecordsServiceMock.addRecord).toHaveBeenCalled();
  });

  it("should handle isHandset false", () => {
    component.ngOnChanges({ isHandset: new SimpleChange(true, false, null) });
  });

  it("should handle isHandset true", () => {
    component.ngOnChanges({ isHandset: new SimpleChange(false, true, null) });
  });
});
