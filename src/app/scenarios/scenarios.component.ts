import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ScenarioService } from "../abstraction/scenario.service";
import { catchError, forkJoin, map, Observable, of, switchMap } from "rxjs";
import {DialogImageComponent} from "./components/dialog-image/dialog-image.component";
import {MatDialog} from "@angular/material/dialog";
import {MarkdownComponent} from "ngx-markdown";

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
    MarkdownComponent,
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
  displayedColumns: string[] = ['name'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  dataSource = new MatTableDataSource<ScenarioData>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private scenarioService = inject(ScenarioService);
  readonly dialog = inject(MatDialog);
  expandedScenario: ScenarioData | null = null;

  @ViewChild(MatTable) table!: MatTable<ScenarioData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadScenarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: ScenarioData, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter.trim().toLowerCase());
    };

    this.dataSource.sort = this.sort;
  }

  isExpanded(scenario: ScenarioData) {
    return this.expandedScenario === scenario;
  }

  toggleExpand(scenario: ScenarioData) {
    this.expandedScenario = this.isExpanded(scenario) ? null : scenario;
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

  loadScenarios(): void {
    this.scenarioService.listScenarios()
      .pipe(
        switchMap(response => {
          const scenarioRequests: Observable<ScenarioData>[] = response.available_configurations.map(name =>
            forkJoin({
              description: (this.scenarioService.getScenario(name).pipe(
                map(scenario => scenario.description),
                catchError(() => of(null)))),
              imageUrl: this.scenarioService.getScenarioImage(name).pipe(catchError(() => of(null)))
            }).pipe(
              map(({description, imageUrl}) => ({name, description, imageUrl}))
            )
          );
          return scenarioRequests.length ? forkJoin(scenarioRequests) : of([]);
        })
      )
      .subscribe({
        next: (scenarios: ScenarioData[]) => this.dataSource.data = scenarios,
        error: err => console.error('Error loading scenarios:', err)
      });
  }

  openImageDialog(imageUrl: string, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogImageComponent, {
      data: { imageUrl },
      width: 'auto', // Let the width be determined by the image size
      height: 'auto', // Let the height be determined by the image size
      maxWidth: '90vw', // Set max width to 90% of the viewport
      maxHeight: '90vh', // Set max height to 90% of the viewport
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'image-dialog-auto-size' // Apply custom class for styling
    });
  }
}

interface ScenarioData {
  name: string;
  description: string | null;
  imageUrl: string | null;
}
