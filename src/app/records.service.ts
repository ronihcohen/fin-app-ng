import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

export interface Record {
  title: string;
  amount: number;
  category: string;
  date: Date;
  familyID: String;
  id: String;
}
export interface Doc { records: Record[]; }

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private recordsCollection: AngularFirestoreCollection<Record>;
  private recordDoc: AngularFirestoreDocument<Record>;
  constructor(private afs: AngularFirestore
  ) { }

  getRecords(familyID: String, date: Moment) {
    this.recordsCollection = this.afs.collection<Record>('records', ref => ref
      .orderBy('date', 'desc')
      .where('date', '>=', date.startOf('month').toDate())
      .where('date', '<=', date.endOf('month').toDate())
      .where('familyID', '==', familyID));
    return this.recordsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addRecord(record: Record, familyID: String) {
    const newRecord = { ...record, familyID: familyID, date: new Date() };
    this.afs.collection<Record>('records').add(newRecord);
  }

  deleteRecord(id: String) {
    this.recordDoc = this.afs.doc<Record>(`records/${id}`);
    this.recordDoc.delete();
  }
}
