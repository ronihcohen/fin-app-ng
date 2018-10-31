import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { RecordsService, Record } from "../records.service";
import { Moment } from "moment";
import { Subscription } from "rxjs";
import { combineLatest } from "rxjs/operators";

export class RecordsDataSource extends DataSource<Record> {
  dataLength: Number;
  totalAmount: Number;
  recordsSubscription: Subscription;

  constructor(
    private date: Moment,
    private records: RecordsService,
    private familyID: String,
    private searchChanges$: Observable<Event>
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Record[]> {
    const recordsObserver = this.records.getRecords(this.familyID, this.date);
    this.recordsSubscription = recordsObserver.subscribe(
      data => {
        this.dataLength = data.length;
        this.totalAmount = data.reduce((acc, cur) => acc + cur.amount, 0);
      },
      err => {
        console.log("RecordsDataSource: ", this.familyID, this.date, err);
      }
    );

    return this.searchChanges$.pipe(
      combineLatest(recordsObserver, (searchValue, records) => {
        if (!searchValue) {
          return records;
        }
        return records.filter(record => record.title.includes(searchValue));
      })
    );
  }
  disconnect() {
    if (this.recordsSubscription) {
      this.recordsSubscription.unsubscribe();
    }
  }
}
