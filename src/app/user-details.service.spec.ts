import { TestBed } from "@angular/core/testing";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserDetailsService } from "./user-details.service";
import { of } from "rxjs";
import { AngularFirestoreMock } from "./records.service.spec";
import { AngularFirestore } from "@angular/fire/firestore";

describe("UserDetailsService", () => {
  const AngularFireAuthStub = {
    auth: { signInWithPopup: () => {}, signOut: () => {} },
    user: of(false, { uid: "mock-uid" })
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
      ]
    }));

  it("should be created", () => {
    const service: UserDetailsService = TestBed.get(UserDetailsService);
    expect(service).toBeTruthy();
  });
});
