import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { RecordsService, Record } from '../records.service';
import { Moment } from 'moment';

export class RecordsDataSource extends DataSource<Record> {

  dataLength: Number;
  totalAmount: Number;
  constructor(private date: Moment, private records: RecordsService,
    private uid: String) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Record[]> {
    const recordsObserver = this.records.getRecords(this.uid, this.date);
    recordsObserver.subscribe(data => {
      this.dataLength = data.length;
      this.totalAmount = data.reduce((acc, cur) => acc + cur.amount, 0);
    });
    return recordsObserver;
  }
  disconnect() { }
}
