import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from "@angular/core";

import { RecordsContainerComponent } from "./records-container.component";
import { MonthPickerComponent } from "../month-picker/month-picker.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FamilyService } from "../family.service";

import {
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatMenuModule,
  MatSnackBarModule
} from "@angular/material";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { BreakpointObserver } from "@angular/cdk/layout";
import { of } from "rxjs";

describe("RecordsContainerComponent", () => {
  let component: RecordsContainerComponent;
  let fixture: ComponentFixture<RecordsContainerComponent>;

  beforeEach(() => {
    const AngularFireAuthStub = {
      user: of(true)
    };
    const BreakpointObserverMock = { observe: () => of({ matches: true }) };
    const FamilyServiceMock = { getUserDetails: () => of(false) };

    @Component({ selector: "app-add-record", template: "" })
    class AddRecordsComponent {
      @Input()
      familyID: string;
      @Input()
      uid: string;
    }

    @Component({ selector: "app-records", template: "" })
    class RecordsComponent {
      @Input()
      familyID: string;
      @Input()
      uid: string;
      @Input()
      isHandset: boolean;
    }

    TestBed.configureTestingModule({
      declarations: [
        RecordsContainerComponent,
        RecordsComponent,
        AddRecordsComponent,
        MonthPickerComponent
      ],
      imports: [
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatMenuModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFirestore },
        { provide: BreakpointObserver, useValue: BreakpointObserverMock },
        { provide: FamilyService, useValue: FamilyServiceMock }
      ]
    }).compileComponents();
  });

  it("should compile with user", () => {
    fixture = TestBed.createComponent(RecordsContainerComponent);
    component = fixture.componentInstance;
    component.userDetailsSubscription = of({ familyID: "fid" }).subscribe(
      () => {}
    );
    component.familyID = "fid";
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should compile with familyID", () => {
    TestBed.overrideProvider(FamilyService, {
      useValue: { getUserDetails: () => of(true) }
    });
    fixture = TestBed.createComponent(RecordsContainerComponent);
    component = fixture.componentInstance;
    component.userDetailsSubscription = of({ familyID: "fid" }).subscribe(
      () => {}
    );
    component.familyID = "fid";
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should compile without user", () => {
    TestBed.overrideProvider(AngularFireAuth, {
      useValue: {
        user: of(false)
      }
    });
    fixture = TestBed.createComponent(RecordsContainerComponent);
    component = fixture.componentInstance;
    component.userDetailsSubscription = of({ familyID: "fid" }).subscribe(
      () => {}
    );
    component.familyID = "fid";
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
