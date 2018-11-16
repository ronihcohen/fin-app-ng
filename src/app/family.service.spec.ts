import { TestBed } from "@angular/core/testing";

import { FamilyService } from "./family.service";
import { AngularFirestore } from "@angular/fire/firestore";

import { AngularFirestoreMock } from "./records.service.spec";

describe("FamilyService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: AngularFirestoreMock }]
    }));

  it("should be created", () => {
    const service: FamilyService = TestBed.get(FamilyService);
    service.updateFamilyID("fid", "uid");
  });
});
