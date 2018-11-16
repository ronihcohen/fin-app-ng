import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Moment } from "moment";

export interface Record {
  title: string;
  amount: number;
  date: Date;
  familyID: string;
  uid: string;
}
export interface Doc {
  records: Record[];
}

export interface NewRecord {
  title: string;
  amount: number;
}

@Injectable({
  providedIn: "root"
})
export class RecordsService {
  private recordsCollection: AngularFirestoreCollection<Record>;
  private recordDoc: AngularFirestoreDocument<Record>;
  constructor(private afs: AngularFirestore) {}

  getRecords(familyID: String, date: Moment) {
    this.recordsCollection = this.afs.collection<Record>("records", ref =>
      ref
        .orderBy("date", "desc")
        .where("date", ">=", date.startOf("month").toDate())
        .where("date", "<=", date.endOf("month").toDate())
        .where("familyID", "==", familyID)
    );
    return this.recordsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addRecord(record: NewRecord, familyID: string, uid: string) {
    const newRecord: Record = {
      ...record,
      familyID: familyID,
      uid: uid,
      date: new Date()
    };
    this.afs.collection<Record>("records").add(newRecord);
  }

  addItem(item: NewRecord, record: string) {
    const newItem = {
      ...item,
      date: new Date()
    };
    this.afs.collection("records/" + record + "/items").add(newItem);
  }

  deleteRecord(id: String) {
    this.recordDoc = this.afs.doc<Record>(`records/${id}`);
    this.recordDoc.delete();
  }
}
