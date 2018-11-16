import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule
} from "@angular/material";

import { AddRecordComponent } from "./add-record.component";
import { RecordsService } from "../records.service";
import { MatSnackBar } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { UserDetailsService } from "../user-details.service";
import { of } from "rxjs";

describe("AddRecordComponent", () => {
  let component: AddRecordComponent;
  let fixture: ComponentFixture<AddRecordComponent>;
  let addRecordSpy;
  let getUserDetailsSpy;

  beforeEach(async(() => {
    const RecordsServiceMock = jasmine.createSpyObj("RecordsService", [
      "addRecord"
    ]);
    addRecordSpy = RecordsServiceMock.addRecord.and.returnValue(true);

    const UserDetailsServiceMock = jasmine.createSpyObj("UserDetailsService", [
      "getUserDetails"
    ]);
    getUserDetailsSpy = UserDetailsServiceMock.getUserDetails.and.returnValue(
      of()
    );

    TestBed.configureTestingModule({
      declarations: [AddRecordComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: RecordsService, useValue: RecordsServiceMock },
        { provide: UserDetailsService, useValue: UserDetailsServiceMock },
        FormBuilder,
        MatSnackBar
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should compile", () => {
    expect(component).toBeTruthy();
  });

  it("should call addRecord on valid submit", () => {
    const addRecordElement: HTMLElement = fixture.nativeElement;
    const button = addRecordElement.querySelector("button");
    const titleInput: HTMLInputElement = addRecordElement.querySelector(
      "#title-input"
    );
    const amountInput: HTMLInputElement = addRecordElement.querySelector(
      "#amount-input"
    );

    titleInput.value = "aaa";
    amountInput.value = "123";

    titleInput.dispatchEvent(new Event("input"));
    amountInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(button.textContent).toEqual("Submit");

    button.click();
    expect(addRecordSpy.calls.any()).toBe(true, "addRecord called");
    expect(titleInput.value).toBe("");
  });

  it("should not call addRecord on invalid submit", () => {
    const addRecordElement: HTMLElement = fixture.nativeElement;
    const button = addRecordElement.querySelector("button");
    const titleInput: HTMLInputElement = addRecordElement.querySelector(
      "#title-input"
    );
    const amountInput: HTMLInputElement = addRecordElement.querySelector(
      "#amount-input"
    );

    titleInput.value = "aaa";
    amountInput.value = "aaa"; // should be a number so the form is invalid

    titleInput.dispatchEvent(new Event("input"));
    amountInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(button.textContent).toEqual("Submit");

    button.click();
    expect(addRecordSpy.calls.any()).toBe(false, "addRecord wasn't called");
    expect(titleInput.value).toBe("aaa");
  });
});
