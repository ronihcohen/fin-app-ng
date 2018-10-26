import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { RecordsService, Record } from '../records.service';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

export class RecordsDataSource extends DataSource<Record> {


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
    return this.records.getRecords(this.uid, this.date);
  }
  disconnect() { }
}
