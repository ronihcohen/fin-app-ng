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
    const RecordsServiceMock = jasmine.createSpyObj("RecordsService", [
      "getRecords"
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

    component.displayedColumns = ["title", "amount"];
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
    fixture.detectChanges();
  });

  it("should filter by search value", () => {
    expect(component).toBeTruthy();
    component.familyID = "f-id";
    component.ngOnChanges({
      familyID: new SimpleChange(null, component.familyID, null)
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
    expect(columnTitle.textContent).toEqual("title1");
  });
});
