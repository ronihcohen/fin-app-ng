import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatCardModule,
  MatMenuModule,
  MatDialog
} from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

import { ItemsTableComponent } from "./items-table.component";
import { AngularFirestoreMock } from "../records.service.spec";
import { of } from "rxjs";
import { RecordsService } from "../records.service";

describe("ItemsTableComponent", () => {
  let component: ItemsTableComponent;
  let fixture: ComponentFixture<ItemsTableComponent>;
  const ActivatedRouteMock = { paramMap: of() };
  let RecordsServiceMock;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsTableComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatMenuModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
        { provide: AngularFirestore, useValue: AngularFirestoreMock },
        { provide: RecordsService, useValue: RecordsServiceMock },
        {
          provide: MatDialog,
          useClass: MatDialogMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should compile", () => {
    expect(component).toBeTruthy();
  });
});
