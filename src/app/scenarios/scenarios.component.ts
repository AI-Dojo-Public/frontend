import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: 'Lightest element.',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: 'Second lightest element.',
  },
];

@Component({
  selector: 'app-scenarios',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ScenariosComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource(ELEMENT_DATA); 
  expandedElement: PeriodicElement | null = null;
  private _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter.trim().toLowerCase());
    };

    this.dataSource.sort = this.sort;
  }

  toggleExpand(element: PeriodicElement) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  addData() {
    const newElement: PeriodicElement = {
      position: this.dataSource.data.length + 1,
      name: `Element ${this.dataSource.data.length + 1}`,
      weight: parseFloat((Math.random() * 10).toFixed(2)),
      symbol: `E${this.dataSource.data.length + 1}`,
      description: `Description for Element ${this.dataSource.data.length + 1}`,
    };
  
    const updatedData = [...this.dataSource.data, newElement];
    this.dataSource.data = updatedData; 
  }

  removeData() {
    const updatedData = this.dataSource.data.slice(0, -1); 
    this.dataSource.data = updatedData; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
