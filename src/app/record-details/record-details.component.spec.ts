import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { RecordDetailsComponent } from "./record-details.component";

describe("RecordDetailsComponent", () => {
  let component: RecordDetailsComponent;
  let fixture: ComponentFixture<RecordDetailsComponent>;

  beforeEach(async(() => {
    const ActivatedRouteMock = { paramMap: of() };

    @Component({ selector: "app-add-record", template: "" })
    class AddRecordsComponent {
      @Input()
      currentRecord: string;
    }

    @Component({ selector: "app-items-table", template: "" })
    class ItemsTableComponent {}

    TestBed.configureTestingModule({
      declarations: [
        RecordDetailsComponent,
        AddRecordsComponent,
        ItemsTableComponent
      ],
      providers: [{ provide: ActivatedRoute, useValue: ActivatedRouteMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
