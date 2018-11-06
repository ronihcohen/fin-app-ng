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

import { FamilyFormComponent } from "./family-form.component";

import { Router } from "@angular/router";
import { FamilyService } from "../family.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatSnackBar } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { of } from "rxjs";

describe("FamilyFormComponent", () => {
  let component: FamilyFormComponent;
  let fixture: ComponentFixture<FamilyFormComponent>;

  const FamilyServiceMock = jasmine.createSpyObj("FamilyService", [
    "updateFamilyID"
  ]);
  FamilyServiceMock.updateFamilyID.and.returnValue(
    new Promise(resolve => resolve())
  );

  beforeEach(async(() => {
    const AngularFireAuthStub = {
      user: of({ uid: "mock-uid" })
    };

    TestBed.configureTestingModule({
      declarations: [FamilyFormComponent],
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
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: FamilyService, useValue: FamilyServiceMock },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        FormBuilder,
        MatSnackBar
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should compile", () => {
    const familyFormElement: HTMLElement = fixture.nativeElement;
    const button = familyFormElement.querySelector("button");
    const familySecretInput: HTMLInputElement = familyFormElement.querySelector(
      "#family-secret"
    );
    familySecretInput.value = "1q2w3e4r5t6y7u8i";
    familySecretInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    button.click();
    expect(FamilyServiceMock.updateFamilyID).toHaveBeenCalled();
  });
});
