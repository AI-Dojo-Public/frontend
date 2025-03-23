import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MaterialModule } from "../abstraction/material-module/material.module";
import { EnvironmentService, IEnvironmentOut } from "../abstraction/environment.service";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-environments',
  standalone: true,
    imports: [
      MatTableModule,
      MatIconModule,
      CommonModule,
      MatPaginatorModule,
      MatSortModule,
      MaterialModule,
    ],
  templateUrl: './environments.component.html',
  styleUrl: './environments.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EnvironmentsComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'state'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'actions', 'expand'];
  dataSource = new MatTableDataSource<IEnvironmentOut>();
  private _liveAnnouncer = inject(LiveAnnouncer);
  private environmentService = inject(EnvironmentService);
  expandedEnvironment: IEnvironmentOut | null = null;

  @ViewChild(MatTable) table!: MatTable<IEnvironmentOut>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadEnvironments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: IEnvironmentOut, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter.trim().toLowerCase());
    };

    this.dataSource.sort = this.sort;
  }

  /** Checks whether an environment is expanded. */
  isExpanded(environment: IEnvironmentOut) {
    return this.expandedEnvironment === environment;
  }

  toggleExpand(environment: IEnvironmentOut) {
    this.expandedEnvironment = this.isExpanded(environment) ? null : environment;
  }

  refresh() {
    this.loadEnvironments();
  }

  loadEnvironments() {
    this.environmentService.listEnvironments().pipe(
      map(environments => environments)
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  runEnvironment(id: string) {
    this.environmentService.runEnvironment(id).subscribe();
  }

  pauseEnvironment(id: string) {
    this.environmentService.pauseEnvironment(id).subscribe()
  }

  terminateEnvironment(id: string) {
    this.environmentService.terminateEnvironment(id).subscribe()
  }
}

