import { TestBed } from "@angular/core/testing";

import { RecordsService } from "./records.service";
import { AngularFirestore } from "@angular/fire/firestore";

describe("RecordsService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore }]
    }));

  it("should be created", () => {
    const service: RecordsService = TestBed.get(RecordsService);
    expect(service).toBeTruthy();
  });
});
