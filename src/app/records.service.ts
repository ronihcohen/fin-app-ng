import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Record {
  title: string;
  amount: number;
  category: string;
  date: Date;
}
export interface Doc { records: Record[]; }

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private doc: AngularFirestoreDocument<Doc>;

  constructor(private db: AngularFirestore
  ) { }

  getRecords(uid) {
    this.doc = this.db.doc<Doc>(`balance/${uid}`);
    return this.doc.valueChanges().pipe(map(doc => doc.records));
  }
}
