import {
  Component, ViewChild, Input, OnChanges
} from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { RecordsDataSource } from './records-datasource';
import { RecordsService } from '../records.service';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

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
  currentDate: Date;

  constructor(private records: RecordsService, public dialog: MatDialog) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'amount', 'date', 'delete'];

  ngOnChanges() {
    this.currentDate = _moment().toDate();
    this.dataSource = new RecordsDataSource(_moment(), this.records, this.familyID);
  }

  handleDeleteClick(row) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(approved => {
      if (approved) {
        this.records.deleteRecord(row.id);
      }
    });
  }

  handleDateChange(date: Moment) {
    this.currentDate = date.toDate();
    this.dataSource = new RecordsDataSource(date, this.records, this.familyID);
  }
}
