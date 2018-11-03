import { TestBed } from "@angular/core/testing";

import { RecordsService } from "./records.service";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _moment from "moment";
import { of } from "rxjs";

const date = new Date();

describe("RecordsService", () => {
  beforeEach(() => {
    const recordWithoutID = {
      title: "record",
      amount: 1,
      date: date,
      familyID: "record-fid",
      uid: "record-uid"
    };
    const AngularFirestoreMock = {
      collection: () => ({
        snapshotChanges: () =>
          of([
            {
              payload: {
                doc: { id: "record-id", data: () => recordWithoutID }
              }
            }
          ])
      })
    };
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: AngularFirestoreMock }]
    });
  });

  it("should return records with record id", () => {
    const service: RecordsService = TestBed.get(RecordsService);

    const record = {
      title: "record",
      amount: 1,
      date: date,
      familyID: "record-fid",
      uid: "record-uid",
      id: "record-id"
    };

    service
      .getRecords("family-uid", _moment())
      .subscribe(result => expect(result).toEqual([record]));
  });
});
