import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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
  constructor(private afs: AngularFirestore
  ) { }

  getRecords(uid: String) {
    this.recordsCollection = this.afs.collection<Record[]>('records', ref => ref
      .where('uid', '==', uid)
      .orderBy('amount', 'asc'));
    return this.recordsCollection.valueChanges();
  }

  addRecord(record: Record, uid: String) {
    const newRecord = { ...record, uid: uid, date: new Date() };
    this.afs.collection<Record>('records').add(newRecord);
  }
}
