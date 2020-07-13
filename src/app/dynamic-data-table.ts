import {DataSource} from '@angular/cdk/collections';
import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

let ELEMENT_DATA: any[] = [
];

@Component({
  selector: 'dynamic-data-table',
  styleUrls: ['dynamic-data-table.css'],
  templateUrl: 'dynamic-data-table.html',
})
export class DynamicDataTable  implements OnInit{
  displayedColumns: string[] = ['Student', 'Social', 'Science', 'Maths', 'English', 'Physics'];
  dataSource = new ExampleDataSource();
  columnName='';
  rowName = '';
  rows = ['x', 'y', 'z', 'a'];
  @ViewChild('tableContainer', { read: ElementRef }) tableContainer: ElementRef;

  ngOnInit() {
         this.updateTable();
  }

  addRow() {
    this.rows.push(this.rowName);
     console.log('dsd', this.dataSource);
      let cols = this.displayedColumns.map((c) => { c: ''} );
     ELEMENT_DATA.push({ Student: this.rowName, ...cols });
      this.dataSource = new ExampleDataSource();
  }

  addColumn() {
    this.displayedColumns.push(this.columnName);
    ELEMENT_DATA.forEach((d) => d[this.columnName] = '');
    this.dataSource = new ExampleDataSource();
  }

  updateTable() {
    let cols = this.displayedColumns.map((c) => { c: ''} );
    this.rows.forEach((c) => {
       ELEMENT_DATA.push({ Student: c, ...cols });
    });
    this.dataSource = new ExampleDataSource();
  }

}

export class ExampleDataSource extends DataSource<any> {
  data = new BehaviorSubject<any[]>(ELEMENT_DATA);

  connect(): Observable<any[]> {
    return this.data;
  }

  disconnect() {}
}
