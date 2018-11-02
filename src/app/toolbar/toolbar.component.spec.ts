import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarComponent } from "./toolbar.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import { MatToolbarModule, MatMenuModule } from "@angular/material";

import { of } from "rxjs";

describe("ToolbarComponent", () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    const AngularFireAuthStub = {
      user: of({ uid: "mock-uid" })
    };

    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MatToolbarModule, MatMenuModule],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: Router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
