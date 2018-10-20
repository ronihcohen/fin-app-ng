import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Record {
  title: string;
  amount: number;
  category: string;
  date: Date;
}
export interface Doc { records: Record[]; }

@Component({
  selector: 'app-balance-table',
  templateUrl: './balance-table.component.html',
  styleUrls: ['./balance-table.component.scss']
})
export class BalanceTableComponent implements OnInit {
  @Input() uid: String;
  records: Observable<Record[]>;
  private doc: AngularFirestoreDocument<Doc>;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.doc = this.db.doc<Doc>(`balance/${this.uid}`);
    this.records = this.doc.valueChanges().pipe(map(doc => doc.records));
  }

}



