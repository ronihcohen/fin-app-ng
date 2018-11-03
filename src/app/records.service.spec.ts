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
      collection: (string, cb) => ({
        cb: cb
          ? cb({
              orderBy: () => ({
                where: () => ({ where: () => ({ where: () => {} }) })
              })
            })
          : null,
        add: () => {},
        snapshotChanges: () =>
          of([
            {
              payload: {
                doc: { id: "record-id", data: () => recordWithoutID }
              }
            }
          ])
      }),
      doc: () => ({ delete: () => {} })
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

  it("should add new record", () => {
    const service: RecordsService = TestBed.get(RecordsService);

    const newRecord = {
      title: "record",
      amount: 1
    };

    service.addRecord(newRecord, "record-fid", "uid");
  });

  it("should delete record", () => {
    const service: RecordsService = TestBed.get(RecordsService);
    service.deleteRecord("id");
  });
});
