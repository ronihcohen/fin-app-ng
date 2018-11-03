import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

import { MonthPickerComponent } from "./month-picker.component";
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

import * as _moment from "moment";

describe("MonthPickerComponent", () => {
  let component: MonthPickerComponent;
  let fixture: ComponentFixture<MonthPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonthPickerComponent],
      imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    component.chosenYearHandler(_moment());
    const datepicker = fixture.debugElement.query(By.css("mat-datepicker"))
      .context;
    component.chosenMonthHandler(_moment(), datepicker);
  });
});
