import {
  Component, ViewChild, Input, OnChanges
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { RecordsDataSource } from './records-datasource';
import { RecordsService } from '../records.service';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() familyID: String;

  dataSource: RecordsDataSource;

  constructor(private records: RecordsService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'amount', 'date', 'delete'];

  ngOnChanges() {
    this.dataSource = new RecordsDataSource(this.paginator, this.sort, this.records, this.familyID);
  }

  handleDeleteClick(row) {
    this.records.deleteRecord(row.id);
  }

  handleDateChange(date: Moment) {
    console.log(date);
  }
}
