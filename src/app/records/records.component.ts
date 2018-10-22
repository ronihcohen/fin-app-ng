import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { RecordsDataSource } from './records-datasource';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() uid: String;
  @Input() familyID: String;

  dataSource: RecordsDataSource;

  constructor(private records: RecordsService) {

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'amount', 'date', 'delete'];

  ngOnInit() {
    this.dataSource = new RecordsDataSource(this.paginator, this.sort, this.records, this.uid);
  }

  handleDeleteClick(row) {
    this.records.deleteRecord(row.id);
  }
}
