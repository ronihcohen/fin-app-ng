import { async, inject, TestBed } from "@angular/core/testing";
import { AngularFireAuth } from "@angular/fire/auth";
import { of } from "rxjs";
import { AuthGuard } from "./auth.guard";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
  "RouterStateSnapshot",
  ["toString"]
);

describe("AuthGuard", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AngularFireAuth,
          useValue: { user: of({ uid: "mock-uid" }) }
        }
      ]
    });
  }));

  it("should return true when user is logged in", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      guard
        .canActivate(new ActivatedRouteSnapshot(), mockSnapshot)
        .subscribe(result => expect(result).toBeTruthy());
    }
  ));

  it("should return false when user is not logged in", () => {
    TestBed.overrideProvider(AngularFireAuth, {
      useValue: { user: of(false) }
    });
    const guard = TestBed.get(AuthGuard);
    guard
      .canActivate(new ActivatedRouteSnapshot(), mockSnapshot)
      .subscribe(result => expect(result).toBeFalsy());
  });
});
