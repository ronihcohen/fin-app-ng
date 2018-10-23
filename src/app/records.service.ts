import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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

  getRecords(familyID: String) {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    this.recordsCollection = this.afs.collection<Record>('records', ref => ref
      .orderBy('date', 'desc')
      .where('date', '>', firstDay)
      .where('date', '<', lastDay)
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
