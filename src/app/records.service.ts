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
  uid: String;
}
export interface Doc { records: Record[]; }

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private recordsCollection: AngularFirestoreCollection<Record[]>;
  private recordDoc: AngularFirestoreDocument<Record>;
  constructor(private afs: AngularFirestore
  ) { }

  getRecords(uid: String) {
    this.recordsCollection = this.afs.collection<Record[]>('records', ref => ref
      .where('uid', '==', uid)
      .orderBy('amount', 'asc'));
    return this.recordsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Record[];
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addRecord(record: Record, uid: String) {
    const newRecord = { ...record, uid: uid, date: new Date() };
    this.afs.collection<Record>('records').add(newRecord);
  }

  deleteRecord(id: String) {
    this.recordDoc = this.afs.doc<Record>(`records/${id}`);
    this.recordDoc.delete();
  }
}
