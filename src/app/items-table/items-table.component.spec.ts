import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatCardModule
} from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

import { ItemsTableComponent } from "./items-table.component";
import { AngularFirestoreMock } from "../records.service.spec";
import { of } from "rxjs";

describe("ItemsTableComponent", () => {
  let component: ItemsTableComponent;
  let fixture: ComponentFixture<ItemsTableComponent>;
  const ActivatedRouteMock = { paramMap: of() };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsTableComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatCardModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
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
