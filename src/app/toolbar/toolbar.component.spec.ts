import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarComponent } from "./toolbar.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import { MatToolbarModule, MatMenuModule } from "@angular/material";
import { BreakpointObserver } from "@angular/cdk/layout";

import { of } from "rxjs";

describe("ToolbarComponent", () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    const BreakpointObserverMock = {
      observe: () =>
        of(
          { matches: false },
          { matches: true },
          { matches: false },
          { matches: true }
        )
    };

    const AngularFireAuthStub = {
      auth: { signInWithPopup: () => {}, signOut: () => {} },
      user: of(false, { uid: "mock-uid" })
    };

    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [MatToolbarModule, MatMenuModule],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: BreakpointObserver, useValue: BreakpointObserverMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should handle login/logout", () => {
    expect(component).toBeTruthy();
    component.login();
    component.logout();
  });
});
