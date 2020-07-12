import {DataSource} from '@angular/cdk/collections';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

let ELEMENT_DATA: any[] = [
];

@Component({
  selector: 'dynamic-data-table',
  styleUrls: ['dynamic-data-table.css'],
  templateUrl: 'dynamic-data-table.html',
})
export class DynamicDataTable {
  displayedColumns: string[] = ['Student'];
  dataSource = new ExampleDataSource();
  columnName='';
  rowName = '';
  @ViewChild('tableContainer', { read: ElementRef }) tableContainer: ElementRef;

  addRow() {
    let cols = this.displayedColumns.map((c) => { c: ''} );
    ELEMENT_DATA.push({Student: this.rowName, ...cols });
    this.dataSource = new ExampleDataSource();
     console.log('dsd', this.dataSource)
  }

  addColumn() {
    this.displayedColumns.push(this.columnName);
    ELEMENT_DATA.forEach((d) => d[this.columnName] = '');
  }

}

export class ExampleDataSource extends DataSource<any> {
  data = new BehaviorSubject<any[]>(ELEMENT_DATA);

  connect(): Observable<any[]> {
    return this.data;
  }

  disconnect() {}
}
