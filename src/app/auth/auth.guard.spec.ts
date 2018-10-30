import { TestBed, async, inject } from "@angular/core/testing";
import { AngularFireAuth } from "@angular/fire/auth";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: AngularFireAuth }]
    });
  });

  it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
