import { TestBed } from "@angular/core/testing";

import { RecordsService } from "./records.service";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _moment from "moment";
import { of } from "rxjs";

describe("RecordsService", () => {
  beforeEach(() => {
    const AngularFirestoreMock = {
      collection: () => ({
        snapshotChanges: () =>
          of([
            {
              payload: { doc: { id: "uid", data: () => ({ title: "test" }) } }
            }
          ])
      })
    };
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: AngularFirestoreMock }]
    });
  });

  it("should be created", () => {
    const service: RecordsService = TestBed.get(RecordsService);
    service
      .getRecords("family-uid", _moment())
      .subscribe(result => expect(result).toBeTruthy());
  });
});
