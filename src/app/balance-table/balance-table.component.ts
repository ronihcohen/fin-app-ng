import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-balance-table',
  templateUrl: './balance-table.component.html',
  styleUrls: ['./balance-table.component.scss']
})
export class BalanceTableComponent implements OnInit {
  @Input() uid: String;
  items: Observable<any[]>;
  private itemDoc: AngularFirestoreDocument<any[]>;
  db: AngularFirestore;

  constructor(db: AngularFirestore) {
    this.db = db;
  }

  ngOnInit() {
    this.itemDoc = this.db.doc<any[]>(`balance/${this.uid}`);
    this.items = this.itemDoc.valueChanges();
  }

}



